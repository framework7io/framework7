export interface Support {
  /** Touch events support (touchstart, touchmove, touchend) */
  touch: boolean;
  /** Pointer events support */
  pointerEvents: boolean;
  /** Passive event listener support */
  passiveListener: boolean;
  /** Intersection Observer support */
  intersectionObserver: boolean;
}

export const getSupport: () => Support;
