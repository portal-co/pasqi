export declare class UI {
    #private;
    constructor(success: (result: UIResult) => void, failure: (err: Error) => void, params: UIParams);
    get success(): (result: UIResult) => void;
    get failure(): (err: Error) => void;
    get params(): UIParams;
}
export interface UIResult {
}
export interface UIParams {
    user: PublicKeyCredentialUserEntity | {
        anonymousKey: BufferSource;
    };
    toSign: Uint8Array<BufferSource & ArrayBufferLike>;
    id: BufferSource;
}
