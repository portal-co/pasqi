import { _Uint8Array, grv } from "./core.js";
/* @__NO_SIDE_EFFECTS__ */
export class Snapshot {
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
export const defaultSnapshot = /*@__PURE__*/ new Snapshot();
/* @__NO_SIDE_EFFECTS__ */
export class ChallengeFactory {
    #createChallenge;
    /* @__NO_SIDE_EFFECTS__ */
    constructor({ createChallenge = () => {
        const array = new _Uint8Array(32);
        grv(array);
        return array;
    }, } = {}) {
        this.#createChallenge = createChallenge;
    }
    get createChallenge() {
        return this.#createChallenge;
    }
}
export const defaultChallengeFactory = /*@__PURE__*/ new ChallengeFactory();
