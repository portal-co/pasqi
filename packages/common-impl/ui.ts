import { AuthenticatorChallengeRaw } from "@portal-solutions/pasqi-passkey";
import { UIAlg, sign } from "./ui-sign.js";

export interface UIResult {
    signed: AuthenticatorAssertionResponse | AuthenticatorAttestationResponse;
}

export interface UIParams {
    user: PublicKeyCredentialUserEntity | { anonymousVerifyingKey: BufferSource };
    toSign: { challenge: AuthenticatorChallengeRaw & { type: "webauthn.get" } } | { create: AuthenticatorChallengeRaw & { type: "webauthn.create" } };
    id: BufferSource;
}

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
    readonly #sign: (alg: UIAlg) => Promise<UIResult> = async (alg) => {
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

