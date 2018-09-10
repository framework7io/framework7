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
      /** Fast clicks is a built-in library that removes 300ms delay from links and form elements in mobile browser while you click them. You can disable this built-in library if you want to use other third party fast clicks script.. (default true) */
      fastClicks? : boolean
      /** Distance threshold (in px) to prevent short taps. So if tap/move distance is larger than this value then "click" will not be triggered. (default 10) */
      fastClicksDistanceThreshold? : number
      /** Minimal allowed delay (in ms) between multiple clicks. (default 50) */
      fastClicksDelayBetweenClicks? : number
      /** This parameter allows to specify elements not handled by fast clicks by passing CSS selector of such elements. */
      fastClicksExclude? : string
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
      /** CSS selector of elements where enabled activeState will add appropriate active class. (default a, button, label, span, .actions-button) */
      activeStateElements? : string
      /** Enables Material theme specific touch ripple effect. (default true) */
      materialRipple? : boolean
      /** CSS selector of elements to apply touch ripple effect on click. (default .ripple, .link, .item-link, .links-list a, .button, button, .input-clear-button, .dialog-button, .tab-link, .item-radio, .item-checkbox, .actions-button, .searchbar-disable-button, .fab a, .checkbox, .radio, .data-table .sortable-cell, .notification-close-button) */
      materialRippleElements? : string
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