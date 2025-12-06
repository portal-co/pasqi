import { ChallengeFactory } from "../snap/api";

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
}
export interface UIResult {

}
export interface UIParams {
    user: PublicKeyCredentialUserEntity | { anonymousKey: BufferSource };
    toSign: Uint8Array<BufferSource & ArrayBufferLike>;
    id: BufferSource;
}
