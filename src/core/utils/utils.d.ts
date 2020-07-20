/** Parse url query GET parameters */
export const parseUrlQuery: (url: string) => object;
/** Create a serialized representation of a plain object suitable for use in a URL query string */
export const serializeObject: (obj: object) => string;
/** Cross-browser implementation on requestAnimationFrame */
export const requestAnimationFrame: (callback: Function) => number;
/** Cancels an animation frame request */
export const cancelAnimationFrame: (requestID: number) => void;
/** Executes code on next available animation frame */
export const nextFrame: (callback: Function) => number;
/** executes code after required delay. Basically alias for setTimeout */
export const nextTick: (callback: Function, timeout: number) => number;
/** Returns current timestamp in ms */
export const now: () => number;
/** Extends target object with properties and methods from from objects */
export const extend: (target: object, ...from: object[]) => object;
/** Extends target object with properties and methods from from objects */
export const merge: (target: object, ...from: object[]) => object;
/** Returns unique number, increased by 1 with every call */
export const uniqueNumber: () => number;
/** Generates random ID-like string */
export const id: (mask: string, map: string) => string;
/** Returns preloader inner content for MD theme */
export const mdPreloaderContent: () => string;
/** Returns preloader inner content for iOS theme */
export const iosPreloaderContent: () => string;
/** Returns preloader inner content for Aurora theme */
export const auroraPreloaderContent: () => string;
/** Deletes object properties */
export const deleteProps: (obj: object) => void;
/**  */
export const colorHexToRgb: (hex: string) => number[];
/**  */
export const colorRgbToHex: (r: number, g: number, b: number) => string;
/**  */
export const colorRgbToHsl: (r: number, g: number, b: number) => number[];
/**  */
export const colorHslToRgb: (h: number, s: number, l: number) => number[];
/**  */
export const colorHsbToHsl: (h: number, s: number, b: number) => number[];
/**  */
export const colorHslToHsb: (h: number, s: number, l: number) => number[];

/**  */
export const bindMethods: (target: any, obj: any) => any;

export interface Utils {
  /** Parse url query GET parameters */
  parseUrlQuery: (url: string) => object;
  /** Create a serialized representation of a plain object suitable for use in a URL query string */
  serializeObject: (obj: object) => string;
  /** Cross-browser implementation on requestAnimationFrame */
  requestAnimationFrame: (callback: Function) => number;
  /** Cancels an animation frame request */
  cancelAnimationFrame: (requestID: number) => void;
  /** Executes code on next available animation frame */
  nextFrame: (callback: Function) => number;
  /** executes code after required delay. Basically alias for setTimeout */
  nextTick: (callback: Function, timeout: number) => number;
  /** Returns current timestamp in ms */
  now: () => number;
  /** Extends target object with properties and methods from from objects */
  extend: (target: object, ...from: object[]) => object;
  /** Extends target object with properties and methods from from objects */
  merge: (target: object, ...from: object[]) => object;
  /** Returns unique number, increased by 1 with every call */
  uniqueNumber: () => number;
  /** Generates random ID-like string */
  id: (mask: string, map: string) => string;
  /** Returns preloader inner content for MD theme */
  mdPreloaderContent: () => string;
  /** Returns preloader inner content for iOS theme */
  iosPreloaderContent: () => string;
  /** Returns preloader inner content for Aurora theme */
  auroraPreloaderContent: () => string;
  /** Deletes object properties */
  deleteProps: (obj: object) => void;
  /**  */
  colorHexToRgb: (hex: string) => number[];
  /**  */
  colorRgbToHex: (r: number, g: number, b: number) => string;
  /**  */
  colorRgbToHsl: (r: number, g: number, b: number) => number[];
  /**  */
  colorHslToRgb: (h: number, s: number, l: number) => number[];
  /**  */
  colorHsbToHsl: (h: number, s: number, b: number) => number[];
  /**  */
  colorHslToHsb: (h: number, s: number, l: number) => number[];
  /**  */
  bindMethods: (target: any, obj: any) => any;
}
