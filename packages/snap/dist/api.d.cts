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
        createChallenge?: () => Promise<Uint8Array> | Uint8Array;
    });
    get createChallenge(): () => Promise<Uint8Array> | Uint8Array;
}
export declare const defaultChallengeFactory: ChallengeFactory;
