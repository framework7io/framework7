import Framework7, { Framework7Plugin } from '../../components/app/app-class';

export namespace Touch {
  interface AppMethods {
    touchEvents: {
      start: string
      move: string
      end: string
    }
  }
  interface AppParams {
    /** Object with touch-module related parameters */
    touch?: {
      /** Distance threshold (in px) to prevent short swipes. So if tap/move distance is larger than this value then "click" will not be triggered. (default 5) */
      touchClicksDistanceThreshold? : number
      /** . (default true) */
      disableContextMenu? : boolean
      /** Enables tap hold. (default false) */
      tapHold? : boolean
      /** Determines how long (in ms) the user must hold their tap before the taphold event is fired on the target element. (default 750) */
      tapHoldDelay? : number
      /** When enabled (by default), then click event will not be fired after tap hold event. (default true) */
      tapHoldPreventClicks? : boolean
      /** When enabled, app will add "active-state" class to currently touched (:active) element.. (default true) */
      activeState? : boolean
      /** CSS selector of elements where enabled activeState will add appropriate active class. (default a, button, label, span, .actions-button, .stepper-button, .stepper-button-plus, .stepper-button-minus, .card-expandable, .menu-item, .link, .item-link) */
      activeStateElements? : string
      /** Enables MD-theme specific touch ripple effect. (default true) */
      mdTouchRipple? : boolean
      /** Enables iOS-theme specific touch ripple effect. (default false) */
      iosTouchRipple? : boolean
      /** Enables Aurora-theme specific touch ripple effect. (default false) */
      auroraTouchRipple? : boolean
      /** CSS selector of elements to apply touch ripple effect on click. (default .ripple, .link, .item-link, .list-button, .links-list a, .button, button, .input-clear-button, .dialog-button, .tab-link, .item-radio, .item-checkbox, .actions-button, .searchbar-disable-button, .fab a, .checkbox, .radio, .data-table .sortable-cell:not(.input-cell), .notification-close-button, .stepper-button, .stepper-button-minus, .stepper-button-plus, .menu-item-content) */
      touchRippleElements? : string
    } | undefined
  }
  interface AppEvents {
    /** Event will be fired on app click */
    'click': (event : Event) => void
    /** Event will be fired on touch start (mousedown) event added as active listener (possible to prevent default) */
    'touchstart:active': (event : Event) => void
    /** Event will be fired on touch move (mousemove) event added as active listener (possible to prevent default) */
    'touchmove:active': (event : Event) => void
    /** Event will be fired on touch end (mouseup) event added as active listener (possible to prevent default) */
    'touchend:active': (event : Event) => void
    /** Event will be fired on touch start (mousedown) event added as passive listener (impossible to prevent default) */
    'touchstart:passive': (event : Event) => void
    /** Event will be fired on touch move (mousemove) event added as passive listener (impossible to prevent default) */
    'touchmove:passive': (event : Event) => void
    /** Event will be fired on touch end (mouseup) event added as passive listener (impossible to prevent default) */
    'touchend:passive': (event : Event) => void
  }
}

declare const TouchModule: Framework7Plugin;

export default TouchModule;
