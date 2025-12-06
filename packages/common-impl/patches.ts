import { ChallengeFactory, defaultChallengeFactory, Snapshot } from "@portal-solutions/pasqi-snap";

Object.defineProperty(Snapshot.prototype, "performPrf", {
    value: async function (
        this: Snapshot,
        input: Uint8Array<BufferSource & ArrayBufferLike>, createChallenge: ChallengeFactory = defaultChallengeFactory): Promise<Uint8Array<BufferSource & ArrayBufferLike>> {
        const val = await this.get({
            publicKey: {
                timeout: 60000, challenge: (await createChallenge.createChallenge()).buffer, extensions: {
                    prf: { eval: { first: input.buffer } }
                }
            }
        });
        return new Uint8Array((val as any).getClientExtensionResults().prf!.results!.first!);
    }
});

declare module "@portal-solutions/pasqi-snap"{
    interface Snapshot{
        performPrf(this: Snapshot,input: Uint8Array<BufferSource & ArrayBufferLike>, createChallenge?: ChallengeFactory): Promise<Uint8Array<BufferSource & ArrayBufferLike>>;
    }
}