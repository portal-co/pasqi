"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultChallengeFactory = exports.ChallengeFactory = exports.defaultSnapshot = exports.Snapshot = void 0;
const core_1 = require("./core.cjs");
/* @__NO_SIDE_EFFECTS__ */
class Snapshot {
    #create;
    #get;
    /* @__NO_SIDE_EFFECTS__ */
    constructor({ create = navigator.credentials.create.bind(navigator.credentials), get = navigator.credentials.get.bind(navigator.credentials), } = {}) {
        this.#create = create;
        this.#get = get;
    }
    get create() {
        return this.#create;
    }
    get get() {
        return this.#get;
    }
}
exports.Snapshot = Snapshot;
exports.defaultSnapshot = new Snapshot();
/* @__NO_SIDE_EFFECTS__ */
class ChallengeFactory {
    #createChallenge;
    /* @__NO_SIDE_EFFECTS__ */
    constructor({ createChallenge = () => {
        const array = new core_1._Uint8Array(32);
        (0, core_1.grv)(array);
        return array;
    }, } = {}) {
        this.#createChallenge = createChallenge;
    }
    get createChallenge() {
        return this.#createChallenge;
    }
}
exports.ChallengeFactory = ChallengeFactory;
exports.defaultChallengeFactory = new ChallengeFactory();
