import { defaultChallengeFactory, Snapshot } from "@portal-solutions/pasqi-snap";
Object.defineProperty(Snapshot.prototype, "performPrf", {
    value: async function (input, createChallenge = defaultChallengeFactory) {
        const val = await this.get({
            publicKey: {
                timeout: 60000, challenge: (await createChallenge.createChallenge()).buffer, extensions: {
                    prf: { eval: { first: input.buffer } }
                }
            }
        });
        return new Uint8Array(val.getClientExtensionResults().prf.results.first);
    }
});
