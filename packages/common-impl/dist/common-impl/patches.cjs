"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pasqi_snap_1 = require("@portal-solutions/pasqi-snap");
Object.defineProperty(pasqi_snap_1.Snapshot.prototype, "performPrf", {
    value: async function (input, createChallenge = pasqi_snap_1.defaultChallengeFactory) {
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
