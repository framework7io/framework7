import Dom7, { Dom7Static } from 'Dom7'
import Template7 from 'Template7'

// Css Selector string is an option on many F7 methods
// Giving this alias makes the typename show in the intellisense
// instead of just `string`.
export interface CSSSelector extends String {}

export interface Framework7Class<Events> {
  /** Add event handler */
  on<E extends keyof Events>(event : E, handler : Events[E]) : void
  /** Add event handler that will be removed after it was fired */
  once<E extends keyof Events>(event : E, handler : Events[E]) : void
  /** Remove event handler */
  off<E extends keyof Events>(event : E, handler : Events[E]) : void
  /** Remove all handlers for specified event */
  off<E extends keyof Events>(event : E) : void
  /** Fire event on instance */
  emit<E extends keyof Events>(event : E, ...args : any[]) : void
}

export interface Framework7EventsClass<Events> {
  /** Add event handler */
  on<E extends keyof Events>(event : E, handler : Events[E]) : void
  /** Add event handler that will be removed after it was fired */
  once<E extends keyof Events>(event : E, handler : Events[E]) : void
  /** Remove event handler */
  off<E extends keyof Events>(event : E, handler : Events[E]) : void
  /** Remove all handlers for specified event */
  off<E extends keyof Events>(event : E) : void
  /** Fire event on instance */
  emit<E extends keyof Events>(event : E, ...args : any[]) : void
}

export interface Framework7Params {
  /** App root element. If you main app layout is not a direct child of the <body> then it is required to specify root element here. (default body) */
  root : string
  /** App bundle id.. (default io.framework7.testapp) */
  id : string | 'io.framework7.testapp'
  /** App name. Can be used by other components, e.g. as the default title for Dialog component.. (default Framework7) */
  name : string
  /** App version. Can be used by other components.. (default 1.0.0) */
  version : string
  /** App theme. Can be ios, md or auto. In case of auto it will use iOS theme for iOS devices and MD theme for all other devices.. (default auto) */
  theme : string
  /** App language. Can be used by other components. By default equal to the current browser/webview language (i.e. navigator.language).. */
  language : string
  /** Array with default routes to all views.. (default []) */
  routes : Route[]
  /** App root data. Must be a function that returns an object with root data.  Note, that this inside of this data function points to app Framework7 instance.. */
  data : () => any
  /** App root methods. Object with methods.  Note, that this inside of each method points to app Framework7 instance.. (default {}) */
  methods : { [name : string] : () => any }
  /** Object with events handlers.. (default {}) */
  on : { [event : string] : () => void }
  /** By default Framework7 will be initialized automatically when you call new Framework7(). If you want to prevent this behavior you can disable it with this option and then initialize it manually with init() when you need it.. (default true) */
  init : boolean
  /** If automatic initialization is enabled with init: true parameter and app is running under cordova environment then it will be initialized on deviceready event.. (default true) */
  initOnDeviceReady : boolean
  /** Object with clicks-module related parameters */
  clicks: {
    /** CSS selector for links that should be treated as external and shouldn't be handled by Framework7. For example such '.external' value will match to links like <a href="somepage.html" class="external"> (with class "external") (default '.external') */
    externalLinks : string
  }
  /** Object with touch-module related parameters */
  touch: {
    /** Fast clicks is a built-in library that removes 300ms delay from links and form elements in mobile browser while you click them. You can disable this built-in library if you want to use other third party fast clicks script.. (default true) */
    fastClicks : boolean
    /** Distance threshold (in px) to prevent short taps. So if tap/move distance is larger than this value then "click" will not be triggered. (default 10) */
    fastClicksDistanceThreshold : number
    /** Minimal allowed delay (in ms) between multiple clicks. (default 50) */
    fastClicksDelayBetweenClicks : number
    /** This parameter allows to specify elements not handled by fast clicks by passing CSS selector of such elements. */
    fastClicksExclude : string
    /** . (default true) */
    disableContextMenu : boolean
    /** Enables tap hold. (default false) */
    tapHold : boolean
    /** Determines how long (in ms) the user must hold their tap before the taphold event is fired on the target element. (default 750) */
    tapHoldDelay : number
    /** When enabled (by default), then click event will not be fired after tap hold event. (default true) */
    tapHoldPreventClicks : boolean
    /** When enabled, app will add "active-state" class to currently touched (:active) element.. (default true) */
    activeState : boolean
    /** CSS selector of elements where enabled activeState will add appropriate active class. (default a, button, label, span, .actions-button) */
    activeStateElements : string
    /** Enables Material theme specific touch ripple effect. (default true) */
    materialRipple : boolean
    /** CSS selector of elements to apply touch ripple effect on click. (default .ripple, .link, .item-link, .links-list a, .button, button, .input-clear-button, .dialog-button, .tab-link, .item-radio, .item-checkbox, .actions-button, .searchbar-disable-button, .fab a, .checkbox, .radio, .data-table .sortable-cell, .notification-close-button) */
    materialRippleElements : string
  }
}

export interface Framework7Plugin {
  /** Module Name */
  name: string,
  /** Install callback
  It will be executed right after component is installed
  Context of this callback points to Class where it was installed */
  install: () => void,
  /** Create callback
  It will be executed in the very beginning of class initilization (when we create new instance of the class) */
  create(instance: Framework7): () => void,
  /** Object with default class/plugin parameters */
  params?: {
    [plugin_name: string]: {
      [param: string]: any
    }
  },
  /** proto object extends Class prototype */
  proto?: {
    [name: string]: any
  },
  /** Extend Class with static props and methods, e.g. Class.myMethod */
  static?: {
    [name: string]: any
  },
  /** Initialized instance Props & Methods */
  instance?: {
    [name: string]: any
  },
  /** Event handlers */
  on?: {
    [event: string]: (...params: any[]) => void
  },
  /** Handle clicks - prop name means CSS selector of element to add click handler */
  clicks?: {
    [selector: string]: ($clickedEl: HTMLElement, data: any) => void
  }
}

export interface Framework7AppEvents {
  /** Event will be fired on app initialization. Automatically after new Framework7() or after app.init() if you disabled auto init. */
  'init': () => void
  /** Event will be fired on app resize (window resize). */
  'resize': () => void
  /** Event will be fired on app orientation change (window orientantion change). */
  'orientationchange': () => void
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

interface Framework7 extends Framework7Class<Events> {
  /** App ID passed in parameters */
  id : string
  /** App name passed in parameters */
  name : string
  /** App version */
  version : string
  /** App routes */
  routes : Route[]
  /** App language */
  language : string
  /** Dom7 instance with app root element */
  root : Dom7
  /** Boolean property indicating app is in RTL layout or not */
  rtl : boolean
  /** Current app theme. Can be md or ios */
  theme : string
  /** Object with app root data passed on intialization */
  data : any
  /** Object with app root methods */
  methods : { [name : string] : () => any }
  /** App width in px */
  width : number
  /** App height in px */
  height : number
  /** App left offset in px */
  left : number
  /** App top offset in px */
  top : number
  /** Boolean property indicating app is initialized or not */
  initialized : boolean
  /** Dom7 alias */
  $ : Dom7Static
  /** Template7 alias */
  t7 : Template7
  /** App parameters */
  params : Framework7Params
  /** Contains methods to work with XHR requests. Check the Request utilities section */
  request : Request

  /** Add event handler */
  on(event : keyof Framework7AppEvents, handler : () => void) : void
  /** Add event handler that will be removed after it was fired */
  once(event : keyof Framework7AppEvents, handler : () => void) : void
  /** Remove event handler */
  off(event : keyof Framework7AppEvents, handler : () => void) : void
  /** Remove all handlers for specified event */
  off(event : keyof Framework7AppEvents) : void
  /** Fire event on instance */
  emit(event : keyof Framework7AppEvents, ... args : any[]) : void
  /** Initialize app. In case you disabled auto initialization with init: false parameter */
  init() : void
}

declare class Framework7 implements Framework7 {
  constructor(parameters?: Framework7Params);

  static use(plugin : Framework7Plugin) : void;
}

export default Framework7;