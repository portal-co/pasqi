import { _Uint8Array } from "@portal-solutions/pasqi-snap";
import { toToSignArrayBuffer } from "@portal-solutions/pasqi-passkey";
import { encode } from "cbor2";
import { p256 } from "@noble/curves/p256";
import { ed25519 } from "@noble/curves/ed25519";
import { UIParams, UIResult } from "./ui.js";

export interface UIAlg { 
    readonly rpIdHash: Uint8Array;
    readonly parentFlags: number;
    readonly verifyingKey: any;
    alg(input: Uint8Array): Uint8Array | Promise<Uint8Array>;
}

export function createNobleAlg(params: {
    curve: "p256" | "ed25519";
    privateKey: Uint8Array;
    rpIdHash: Uint8Array;
    parentFlags: number;
    verifyingKeyAlg?: number;
}): UIAlg {
    const { curve, privateKey, rpIdHash, parentFlags } = params;
    if (curve === "p256") {
        const publicKey = p256.getPublicKey(privateKey);
        const x = publicKey.slice(1, 33);
        const y = publicKey.slice(33, 65);
        return {
            rpIdHash,
            parentFlags,
            verifyingKey: new Map<number, any>([
                [1, 2], // kty: EC2
                [3, params.verifyingKeyAlg ?? -7], // alg: ES256
                [-1, 1], // crv: P-256
                [-2, x],
                [-3, y],
            ]),
            alg: (input) => {
                const signature = p256.sign(input, privateKey);
                return signature.toDER();
            }
        };
    } else if (curve === "ed25519") {
        const publicKey = ed25519.getPublicKey(privateKey);
        return {
            rpIdHash,
            parentFlags,
            verifyingKey: new Map<number, any>([
                [1, 1], // kty: OKP
                [3, params.verifyingKeyAlg ?? -8], // alg: EdDSA
                [-1, 6], // crv: Ed25519
                [-2, publicKey],
            ]),
            alg: (input) => ed25519.sign(input, privateKey),
        };
    }
    throw new Error(`Unsupported curve: ${curve}`);
}

export async function sign(params: UIParams, {rpIdHash,parentFlags,verifyingKey,alg}: UIAlg): Promise<UIResult> {
    const handle = (handle => 'buffer' in handle ? new Uint8Array(handle.buffer).slice().buffer : new Uint8Array(handle).buffer)(('anonymousVerifyingKey' in params.user ? (params.user.anonymousVerifyingKey) : params.user.id));
    const childFlags = 0x18 | (parentFlags & 5);
    if ('challenge' in params.toSign) {

        const toSign = toToSignArrayBuffer({...params.toSign.challenge});
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
    } else if ('create' in params.toSign) {
        const toSign = toToSignArrayBuffer({...params.toSign.create});
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
    } else {
        throw new Error("Unsupported toSign parameter");
    }
}
