"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UI = void 0;
exports.sign = sign;
const pasqi_snap_1 = require("@portal-solutions/pasqi-snap");
const pasqi_passkey_1 = require("@portal-solutions/pasqi-passkey");
const cbor2_1 = require("cbor2");
class UI {
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
exports.UI = UI;
async function sign(params, { rpIdHash, parentFlags, verifyingKey, alg }) {
    const handle = (handle => 'buffer' in handle ? new Uint8Array(handle.buffer).slice().buffer : new Uint8Array(handle).buffer)(('anonymousVerifyingKey' in params.user ? (params.user.anonymousVerifyingKey) : params.user.id));
    const childFlags = 0x18 | (parentFlags & 5);
    if ('challenge' in params.toSign) {
        const toSign = (0, pasqi_passkey_1.toToSignArrayBuffer)({ ...params.toSign.challenge });
        const signature = await alg(toSign);
        const authdata = new pasqi_snap_1._Uint8Array([...rpIdHash, childFlags, 0, 0, 0, 0]);
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
        const toSign = (0, pasqi_passkey_1.toToSignArrayBuffer)({ ...params.toSign.create });
        const signature = await alg(toSign);
        const authdata = new pasqi_snap_1._Uint8Array([...rpIdHash, 0x40 | childFlags, 0, 0, 0, 0, ...(0, cbor2_1.encode)(verifyingKey)]);
        return {
            signed: {
                clientDataJSON: new Uint8Array(toSign).buffer,
                attestationObject: (0, cbor2_1.encode)({
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
