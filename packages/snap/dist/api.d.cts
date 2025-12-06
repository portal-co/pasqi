export declare class Snapshot {
    #private;
    constructor({ create, get, }?: {
        create?: typeof navigator.credentials.create;
        get?: typeof navigator.credentials.get;
    });
    get create(): (options?: CredentialCreationOptions) => Promise<Credential | null>;
    get get(): (options?: CredentialRequestOptions) => Promise<Credential | null>;
}
export declare const defaultSnapshot: Snapshot;
export declare class ChallengeFactory {
    #private;
    constructor({ createChallenge, }?: {
        createChallenge?: () => Promise<Uint8Array<BufferSource & ArrayBufferLike>> | Uint8Array<BufferSource & ArrayBufferLike>;
    });
    get createChallenge(): () => Promise<Uint8Array<BufferSource & ArrayBufferLike>> | Uint8Array<BufferSource & ArrayBufferLike>;
}
export declare const defaultChallengeFactory: ChallengeFactory;
