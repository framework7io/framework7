export interface Support {
  /** Touch events support (touchstart, touchmove, touchend) */
  touch: boolean
  /** CSS 3D Transforms support */
  transforms3d: boolean
  /** CSS Flexbox model support */
  flexbox: boolean
  /** Mutation Observers support */
  observer: boolean
  /** Passive event listener support */
  passiveListener: boolean
  /** Gestures event support (gesturestart, gesturechange, gestureend) */
  gestures: boolean
  /** CSS "position:sticky" support */
  positionSticky: boolean
}
declare const Support : Support;

export default Support;
