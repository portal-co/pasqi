import { _Uint8Array } from "@portal-solutions/pasqi-snap";
import { toToSignArrayBuffer } from "@portal-solutions/pasqi-passkey";
import { encode } from "cbor2";
export class UI {
    #success;
    #failure;
    #params;
    constructor(success, failure, params) {
        this.#success = success;
        this.#failure = failure;
        this.#params = params;
    }
    get success() {
        return this.#success;
    }
    get failure() {
        return this.#failure;
    }
    get params() {
        return this.#params;
    }
    #sign = async (alg) => {
        try {
            const result = await sign(this.#params, alg);
            this.#success(result);
            return result;
        }
        catch (err) {
            this.#failure(err);
            throw err;
        }
    };
    get sign() {
        return this.#sign;
    }
}
export async function sign(params, { rpIdHash, parentFlags, verifyingKey, alg }) {
    const handle = (handle => 'buffer' in handle ? new Uint8Array(handle.buffer).slice().buffer : new Uint8Array(handle).buffer)(('anonymousVerifyingKey' in params.user ? (params.user.anonymousVerifyingKey) : params.user.id));
    const childFlags = 0x18 | (parentFlags & 5);
    if ('challenge' in params.toSign) {
        const toSign = toToSignArrayBuffer({ ...params.toSign.challenge });
        const signature = await alg(toSign);
        const authdata = new _Uint8Array([...rpIdHash, childFlags, 0, 0, 0, 0]);
        return {
            signed: {
                clientDataJSON: new Uint8Array(toSign).buffer,
                authenticatorData: new Uint8Array(authdata).buffer, // Empty for passkey signatures
                signature: signature.slice().buffer,
                userHandle: handle,
            }
        };
    }
    else if ('create' in params.toSign) {
        const toSign = toToSignArrayBuffer({ ...params.toSign.create });
        const signature = await alg(toSign);
        const authdata = new _Uint8Array([...rpIdHash, 0x40 | childFlags, 0, 0, 0, 0, ...encode(verifyingKey)]);
        return {
            signed: {
                clientDataJSON: new Uint8Array(toSign).buffer,
                attestationObject: encode({
                    fmt: "none",
                    authData: authdata,
                    attStmt: {}
                }).slice().buffer,
                getPublicKey() {
                    return null; //TODO: parse CBOR to get public key
                },
                getAuthenticatorData() {
                    return authdata.slice().buffer;
                },
                getPublicKeyAlgorithm() {
                    return null; //TODO: parse CBOR to get algorithm
                },
                getTransports() {
                    return [];
                },
            }
        };
    }
    else {
        throw new Error("Unsupported toSign parameter");
    }
}
