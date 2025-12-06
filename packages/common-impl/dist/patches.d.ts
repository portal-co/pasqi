import { ChallengeFactory } from "@portal-solutions/pasqi-snap";
declare module "@portal-solutions/pasqi-snap" {
    interface Snapshot {
        performPrf(this: Snapshot, input: Uint8Array<BufferSource & ArrayBufferLike>, createChallenge?: ChallengeFactory): Promise<Uint8Array<BufferSource & ArrayBufferLike>>;
    }
}
