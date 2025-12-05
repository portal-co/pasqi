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
