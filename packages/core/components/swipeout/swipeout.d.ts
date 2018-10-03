import { CSSSelector, Framework7Plugin } from '../app/app-class';

export namespace Swipeout {
  interface DomEvents {
    /** Event will be triggered while you move swipeout element. event.detail contains current opening progress percentage */
    'swipeout': (event: any) => void
    /** Event will be triggered when swipeout element starts its opening animation */
    'swipeout:open': (event: any) => void
    /** Event will be triggered after swipeout element completes its opening animation */
    'swipeout:opened': (event: any) => void
    /** Event will be triggered when swipeout element starts its closing animation */
    'swipeout:close': (event: any) => void
    /** Event will be triggered after swipeout element completes its closing animation */
    'swipeout:closed': (event: any) => void
    /** Event will be triggered after swipeout element starts its delete animation */
    'swipeout:delete': (event: any) => void
    /** Event will be triggered after swipeout element completes its delete animation right before it will be removed from DOM */
    'swipeout:deleted': (event: any) => void
  }
  interface AppMethods {
    swipeout: {
      /** Currently opened swipeout HTMLElement. Or undefined if there is no opened swipeout element */
      el: HTMLElement | CSSSelector | undefined
      /** reveal swipeout actions on specified element */
      open(el: HTMLElement | CSSSelector, side?: 'left' | 'right', callback?: Function): void
      /** close swipeout actions on specified element */
      close(el: HTMLElement | CSSSelector, callback?: Function): void
      /** delete specified swipeout element */
      delete(el: HTMLElement | CSSSelector, callback?: Function): void
    }
  }
  interface AppParams {
    swipeout?: {
      /** Fallback option for potentially better performance on old/slow devices. If you enable it, then swipeout item will not follow your finger during touch, it will be automatically opened/closed on swipe left/right. (default false) */
      noFollow?: boolean
      /** When disabled, then framework will not remove swipeout element from DOM on "swipeout-delete" click. Useful to enable if you use another library like Vue or React to manage (remove) swipeout items (default true) */
      removeElements?: boolean
      /** When enabled, then framework will remove swipeout element from DOM on "swipeout-delete" click after specified delay (default false) */
      removeElementsWithTimeout?: boolean
      /** Delay in ms to remove swipeout item if removeElementsWithTimeout is enabled */
      removeElementsTimeout?: number
    } | undefined
  }
  interface AppEvents {
    /** Event will be triggered while you move swipeout element */
    swipeout: (progress: number) => void
    /** Event will be triggered when swipeout element starts its opening animation */
    swipeoutOpen: (swipeoutEl: HTMLElement) => void
    /** Event will be triggered after swipeout element completes its opening animation */
    swipeoutOpened: (swipeoutEl: HTMLElement) => void
    /** Event will be triggered when swipeout element starts its closing animation */
    swipeoutClose: (swipeoutEl: HTMLElement) => void
    /** Event will be triggered after swipeout element completes its closing animation */
    swipeoutClosed: (swipeoutEl: HTMLElement) => void
    /** Event will be triggered after swipeout element starts its delete animation */
    swipeoutDelete: (swipeoutEl: HTMLElement) => void
    /** Event will be triggered after swipeout element completes its delete animation right before it will be removed from DOM */
    swipeoutDeleted: (swipeoutEl: HTMLElement) => void
  }
}

declare const SwipeoutComponent: Framework7Plugin;

export default SwipeoutComponent;
