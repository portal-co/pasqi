import { _Uint8Array, grv } from "./core";

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
/* @__NO_SIDE_EFFECTS__ */
export class ChallengeFactory {
  readonly #createChallenge: () => Promise<Uint8Array<BufferSource & ArrayBufferLike>>
    | Uint8Array<BufferSource & ArrayBufferLike>;
  /* @__NO_SIDE_EFFECTS__ */
  constructor({
    createChallenge = () => {
      const array = new _Uint8Array(32);
      grv(array);
      return array;
    },
  }: {
    createChallenge?: () => Promise<Uint8Array<BufferSource & ArrayBufferLike>> | Uint8Array<BufferSource & ArrayBufferLike>;
  } = {}) {
    this.#createChallenge = createChallenge;
  }
  get createChallenge() {
    return this.#createChallenge;
  }

}
export const defaultChallengeFactory = /*@__PURE__*/ new ChallengeFactory();