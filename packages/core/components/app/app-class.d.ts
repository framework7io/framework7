import { Dom7, Dom7Instance } from 'dom7'
import Template7 from 'template7'
import { Router } from '../../modules/router/router';
import { Device } from '../../utils/device';
import { Request } from '../../utils/request';
import { Support } from '../../utils/support';
import { Utils } from '../../utils/utils';

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
  root? : string
  /** App bundle id.. (default io.framework7.testapp) */
  id? : string | 'io.framework7.testapp'
  /** App name. Can be used by other components, e.g. as the default title for Dialog component.. (default Framework7) */
  name? : string
  /** App version. Can be used by other components.. (default 1.0.0) */
  version? : string
  /** App theme. Can be ios, md or auto. In case of auto it will use iOS theme for iOS devices and MD theme for all other devices.. (default auto) */
  theme? : string
  /** App language. Can be used by other components. By default equal to the current browser/webview language (i.e. navigator.language).. */
  language? : string
  /** Array with default routes to all views.. (default []) */
  routes? : Router.RouteParameters[]
  /** App root data. Must be a function that returns an object with root data.  Note, that this inside of this data function points to app Framework7 instance.. */
  data? : () => any
  /** App root methods. Object with methods.  Note, that this inside of each method points to app Framework7 instance.. (default {}) */
  methods? : { [name : string] : () => any }
  /** Lazy modules path */
  lazyModulesPath?: string
  /** By default Framework7 will be initialized automatically when you call new Framework7(). If you want to prevent this behavior you can disable it with this option and then initialize it manually with init() when you need it.. (default true) */
  init? : boolean
  /** If automatic initialization is enabled with init: true parameter and app is running under cordova environment then it will be initialized on deviceready event.. (default true) */
  initOnDeviceReady? : boolean
  /** Object with events handlers.. (default {}) */
  on?: {
    [event in keyof Framework7Events]? : Framework7Events[event]
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

export interface Framework7Events {
  /** Event will be fired on app initialization. Automatically after new Framework7() or after app.init() if you disabled auto init. */
  'init': () => void
}

interface Framework7 extends Framework7Class<Framework7Events> {
  /** App ID passed in parameters */
  id : string
  /** App name passed in parameters */
  name : string
  /** App version */
  version : string
  /** App routes */
  routes : Router.RouteParameters[]
  /** App language */
  language : string
  /** Dom7 instance with app root element */
  root : Dom7Instance
  /** Boolean property indicating app is in RTL layout or not */
  rtl : boolean
  /** Current app theme. Can be md or ios */
  theme : string
  /** Object with app root data passed on intialization */
  data : any
  /** Object with app root methods */
  methods : { [name : string] : () => any }
  /** Boolean property indicating app is initialized or not */
  initialized : boolean
  /** Dom7 alias */
  $ : Dom7
  /** Template7 alias */
  t7 : Template7
  /** App parameters */
  params : Framework7Params
  /** Initialize app. In case you disabled auto initialization with init: false parameter */
  init() : void
  /** Load module */
  loadModule(module: string | Function | Framework7Plugin) : Promise<any>
  /** Load modules */
  loadModules(modules: any[]) : Promise<any>
}

declare class Framework7 implements Framework7 {
  constructor(parameters?: Framework7Params);

  static use(plugin : Framework7Plugin) : void;
  static use(plugins : Framework7Plugin[]) : void;
  static device: Device;
  static request: Request;
  static support: Support;
  static utils: Utils;
}

export default Framework7;
