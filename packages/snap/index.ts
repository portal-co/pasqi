/* @__NO_SIDE_EFFECTS__ */
export class Snapshot {
  readonly #create: typeof navigator.credentials.create;
  readonly #get: typeof navigator.credentials.get;
  /* @__NO_SIDE_EFFECTS__ */
  constructor({
    create = navigator.credentials.create.bind(navigator.credentials),
    get = navigator.credentials.get.bind(navigator.credentials),
  }: {
    create?: typeof navigator.credentials.create;
    get?: typeof navigator.credentials.get;
  } = {}) {
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
