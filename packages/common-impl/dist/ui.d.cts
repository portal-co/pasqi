import { AuthenticatorChallengeRaw } from "@portal-solutions/pasqi-passkey";
export declare class UI {
    #private;
    constructor(success: (result: UIResult) => void, failure: (err: Error) => void, params: UIParams);
    get success(): (result: UIResult) => void;
    get failure(): (err: Error) => void;
    get params(): UIParams;
    get sign(): (alg: UIAlg) => Promise<UIResult>;
}
export interface UIResult {
    signed: AuthenticatorAssertionResponse | AuthenticatorAttestationResponse;
}
export interface UIParams {
    user: PublicKeyCredentialUserEntity | {
        anonymousVerifyingKey: BufferSource;
    };
    toSign: {
        challenge: AuthenticatorChallengeRaw & {
            type: "webauthn.get";
        };
    } | {
        create: AuthenticatorChallengeRaw & {
            type: "webauthn.create";
        };
    };
    id: BufferSource;
}
export interface UIAlg {
    readonly rpIdHash: Uint8Array;
    readonly parentFlags: number;
    readonly verifyingKey: any;
    alg(input: Uint8Array): Uint8Array | Promise<Uint8Array>;
}
export declare function sign(params: UIParams, { rpIdHash, parentFlags, verifyingKey, alg }: UIAlg): Promise<UIResult>;
