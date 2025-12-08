export type CeremonyType = "webauthn.create" | "webauthn.get" | "prf.eval";
export interface AuthenticatorChallengeRaw {
    type: CeremonyType;
    challenge: Uint8Array;
    origin?: string;
}
export function toToSignArrayBuffer(params: AuthenticatorChallengeRaw): Uint8Array<BufferSource & ArrayBufferLike> {
    return new TextEncoder().encode(JSON.stringify({ 
        type: params.type, 
        challenge: (params.challenge as any).toBase64() as string, 
        origin: params.origin ?? location.origin 
    }));
}