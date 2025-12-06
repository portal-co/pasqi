import { ChallengeFactory } from "@portal-solutions/pasqi-snap";
import { _Uint8Array } from "@portal-solutions/pasqi-snap";
import { AuthenticatorChallengeRaw, toToSignArrayBuffer } from "@portal-solutions/pasqi-passkey";

export class UI {
    readonly #success: (result: UIResult) => void;
    readonly #failure: (err: Error) => void;
    readonly #params: UIParams;
    constructor(success: (result: UIResult) => void, failure: (err: Error) => void, params: UIParams) {
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
    readonly #sign: (alg: (input: Uint8Array) => Uint8Array | Promise<Uint8Array>) => Promise<UIResult> = async (alg) => {
        try {
            const result = await sign(this.#params, alg);
            this.#success(result);
            return result;
        } catch (err) {
            this.#failure(err as Error);
            throw err;
        }
    }
    get sign() {
        return this.#sign;
    }
}
export interface UIResult {
    signed: AuthenticatorAssertionResponse | AuthenticatorAttestationResponse;
}
export interface UIParams {
    user: PublicKeyCredentialUserEntity | { anonymousVerifyingKey: BufferSource };
    toSign: {challenge: AuthenticatorChallengeRaw};
    id: BufferSource;
}
export async function sign(params: UIParams, alg: (input: Uint8Array) => Uint8Array | Promise<Uint8Array>): Promise<UIResult> {
    const toSign = 'challenge' in params.toSign ? toToSignArrayBuffer(params.toSign.challenge) : toToSignArrayBuffer(params.toSign);
    const signature = await alg(toSign);
    const handle = ('anonymousVerifyingKey' in params.user ? (params.user.anonymousVerifyingKey) : params.user.id);
    return {
        signed: {
            clientDataJSON: new Uint8Array(toSign).buffer,
            authenticatorData: new Uint8Array().buffer, // Empty for passkey signatures
            signature: signature.slice().buffer,
            userHandle: 'buffer' in handle ? new Uint8Array(handle.buffer).slice().buffer : new Uint8Array(handle).buffer
        }
    };
}