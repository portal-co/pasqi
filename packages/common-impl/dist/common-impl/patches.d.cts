declare module "@portal-solutions/pasqi-snap" {
    interface Snapshot {
        performPrf(this: Snapshot, input: Uint8Array<BufferSource & ArrayBufferLike>, createChallenge?: ChallengeFactory): Promise<Uint8Array<BufferSource & ArrayBufferLike>>;
    }
    interface ChallengeFactory {
    }
}
export {};
