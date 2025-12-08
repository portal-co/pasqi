export type CeremonyType = "webauthn.create" | "webauthn.get" | "prf.eval";
export interface AuthenticatorChallengeRaw {
    type: CeremonyType;
    challenge: Uint8Array;
    origin?: string;
}
export declare function toToSignArrayBuffer(params: AuthenticatorChallengeRaw): Uint8Array<BufferSource & ArrayBufferLike>;
