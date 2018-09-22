export interface Utils {
  /** Parse url query GET parameters */
  parseUrlQuery: (url: string) => object
  /** Create a serialized representation of a plain object suitable for use in a URL query string */
  serializeObject: (obj: object) => string
  /** Cross-browser implementation on requestAnimationFrame */
  requestAnimationFrame: (callback: Function) => number
  /** Cancels an animation frame request */
  cancelAnimationFrame: (requestID: number) => void
  /** Replace diacritics in specified text string with standard latin characters */
  removeDiacritics: (text: string) => string
  /** Executes code on next available animation frame */
  nextFrame: (callback: Function) => number
  /** executes code after required delay. Basically alias for setTimeout */
  nextTick: (callback: Function, timeout: number) => number
  /** Returns current timestamp in ms */
  now: () => number
  /** Extends target object with properties and methods from from objects */
  extend: (target: object, ...from: object[]) => object
  /** Extends target object with properties and methods from from objects */
  merge: (target: object, ...from: object[]) => object
  /** Returns unique number, increased by 1 with every call */
  uniqueNumber: () => number
  /** Generates random ID-like string */
  id: (mask: string, map: string) => string
  /** Deletes object properties */
  deleteProps: (obj: object) => void
}

declare const Utils : Utils;

export default Utils;
