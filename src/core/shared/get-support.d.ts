export interface Support {
  /** Touch events support (touchstart, touchmove, touchend) */
  touch: boolean;
}

export const getSupport: () => Support;
