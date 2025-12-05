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
