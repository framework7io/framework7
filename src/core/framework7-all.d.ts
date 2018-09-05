export namespace Page {
  export interface Page {
    /** Initialized app instance */
    app : Framework7
    /** View instance that contains this page (if this View was initialized) */
    view : View.View
    /** Router instance that contains this page (if this View was initialized). Same as page.view.router */
    router : Router.Router
    /** Value of page's data-name attribute */
    name : string
    /** Page element */
    el : HTMLElement
    /** Dom7 instance with Page element */
    $el : Dom7
    /** Related navbar element for this page. Available only in iOS theme with dynamic navbar enabled. */
    navbarEl : HTMLElement
    /** Dom7 instance with related navbar element for this page. Available only in iOS theme with dynamic navbar enabled. */
    $navbarEl : Dom7
    /** Page position before transition or direction of where this Page comes from. It will be next if you load new page, previous - if you go back to this page, or current if this page replaces the currently active one. */
    from : string
    /** New page position or where this page goes to. Can be same next, previous or current */
    to : string
    /** Alias for page.from */
    position : string
    /** Direction of page transition (if applicable). Can be forward or backward */
    direction : string
    /** Route associated with this page, object with current route data that was used to load this page. It has the following properties */
    route : Route
    /** Page data of the page that was currently active before this new page. */
    pageFrom : Page
    /** Template7 context that was passed for this page when using Template7 pages */
    context : Template7
  }

  export interface DomEvents {
    /** Event will be triggered when new page just inserted to DOM */
    'page:mounted': () => void
    /** Event will be triggered after Framework7 initialize required page's components and navbar */
    'page:init': () => void
    /** This event will be triggered in case of navigating to the page that was already initialized. */
    'page:reinit': () => void
    /** Event will be triggered when everything initialized and page is ready to be transitioned into view (into active/current position) */
    'page:beforein': () => void
    /** Event will be triggered after page transitioned into view */
    'page:afterin': () => void
    /** Event will be triggered right before page is going to be transitioned out of view */
    'page:beforeout': () => void
    /** Event will be triggered after page transitioned out of view */
    'page:afterout': () => void
    /** Event will be triggered right before Page will be removed from DOM. This event could be very useful if you need to detach some events / destroy some plugins to free memory */
    'page:beforeremove': () => void
  }
}


export namespace PhotoBrowser {
  export interface PhotoBrowser {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // PhotoBrowser: PhotoBrowser.AppMethods
}

export namespace Popover {
  export interface Popover {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // Popover: Popover.AppMethods
}
//export interface Framework7AppEvents extends Popover.AppEvents {}

export namespace Preloader {
  export interface Preloader {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // Preloader: Preloader.AppMethods
}

export namespace PullToRefresh {
  export interface PullToRefresh {
    /** Link to global app instance */
    app : Framework7
    /** PTR HTML element (ptr-content) */
    el : HTMLElement
    /** Dom7 instance with PTR HTML element (ptr-content) */
    $el : Dom7

    /** Reset PTR state */
    done() : void
    /** Trigger PTR */
    refresh() : void
    /** Destroy PTR instance and remove PTR event listeners from the specified HTML element */
    destroy() : void
  }

  export interface Events {
    /** Event will be triggered when you start to move pull to refresh content. As an argument event handler receives ptr element */
    pullStart(el : PullToRefresh) : void
    /**  */
    pullMove(el : PullToRefresh, data : Data): void
    /**  */
    pullEnd(el : PullToRefresh, data : Data): void
    /**  */
    refresh(el : PullToRefresh, done : () => void): void
    /**  */
    done(el : PullToRefresh): void
    /**  */
    beforeDestroy(ptr: PullToRefresh): void
  }

  export interface DomEvents {
    /** Event will be triggered when you start to move pull to refresh content */
    'ptr:pullstart' : () => void
    /** Event will be triggered during you move pull to refresh content */
    'ptr:pullmove' : () => void
    /** Event will be triggered when you release pull to refresh content */
    'ptr:pullend' : () => void
    /** Event will be triggered when pull to refresh enters in "refreshing" state. event.detail contain ptr.done method to reset its state after loading completed */
    'ptr:refresh' : () => void
    /** Event will be triggered after pull to refresh is done and it is back to initial state (after calling ptr.done method) */
    'ptr:done' : () => void
    /** Event will be triggered right before PTR instance will be destroyed */
    'ptr:beforedestroy' : () => void
  }

  export interface AppMethods {
    /** initialise PTR on specified HTML element container */
    create(el : HTMLElement | CSSSelector) : PullToRefresh

    /** remove PTR event listeners from the specified HTML element */
    destroy(el : HTMLElement | CSSSelector | PullToRefresh) : void

    /** get PTR instance by HTML element */
    get(el : HTMLElement | CSSSelector) : PullToRefresh

    /** reset PTR state on specified PTR content element */
    done(el : HTMLElement | CSSSelector) : PullToRefresh

    /** trigger PTR on specified PTR content element */
    refresh(el : HTMLElement | CSSSelector) : PullToRefresh
  }

  export interface Data {
    /** touchmove event */
    event: Event
    /** current scroll top position */
    scrollTop : number
    /** current translateY offset */
    translate: number
    /** touches difference (in px) */
    touchesDiff: number
  }

  export interface AppEvents {
    /** Event will be triggered when you start to move pull to refresh content. As an argument event handler receives ptr element */
    ptrPullStart(el : PullToRefresh) : void
    /**  */
    ptrPullMove(el : PullToRefresh, data : Data): void
    /**  */
    ptrPullEnd(el : PullToRefresh, data : Data): void
    /**  */
    ptrRefresh(el : PullToRefresh, done : () => void): void
    /**  */
    ptrDone(el : PullToRefresh): void
    /**  */
    ptrBeforeDestroy(ptr: PullToRefresh): void
  }
}
interface Framework7 {
  ptr: PullToRefresh.AppMethods
}
export interface Framework7AppEvents extends PullToRefresh.AppEvents {}

export namespace RangeSlider {
  export interface RangeSlider {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // RangeSlider: RangeSlider.AppMethods
}
//export interface Framework7AppEvents extends RangeSlider.AppEvents {}

export namespace Searchbar {
  export interface Searchbar {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // Searchbar: Searchbar.AppMethods
}
//export interface Framework7AppEvents extends Searchbar.AppEvents {}

export namespace SheetModal {
  export interface SheetModal {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // SheetModal: SheetModal.AppMethods
}
//export interface Framework7AppEvents extends SheetModal.AppEvents {}

export namespace SmartSelect {
  export interface SmartSelect {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // SmartSelect: SmartSelect.AppMethods
}
//export interface Framework7AppEvents extends SmartSelect.AppEvents {}

export namespace SortableList {
  export interface SortableList {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // SortableList: SortableList.AppMethods
}
//export interface Framework7AppEvents extends SortableList.AppEvents {}


export namespace Statusbar {
  export interface AppParameters{
    /** Enables statusbar handling by Framework7. Disable it if you
    * don't want Framework7 to handle statusbar behavior */
    enabled:boolean
    /** Can be true, false, auto. Defines whether the statusbar overlay
    * should be visible or not. In case of autoFramework7 will detect
    * it automatically depending whether the app is in fullscreen mode
    * or not */
    overlay: string | boolean
    /** Hex string (#RRGGBB) with background color when iOS theme is
    * active. If passed then it will override CSS value */
    iosBackgroundColor:string
    /** Hex string (#RRGGBB) with background color when MD theme is
    * active. If passed then it will override CSS value */
    materialBackgroundColor:string
    /** If enabled, then click on statusbar overlay will scroll top page
    * content to the top.This functionality is only available when app
    * is running under cordova/phonegap environment with installed
    * cordova-plugin-statusbar */
    scrollTopOnClick:boolean
    /** "Makes the statusbar overlay or not overlay the WebView. iOS-only feature.
    This functionality is only available when app is running under cordova/phonegap
    environment with installed cordova-plugin-statusbar"
    */
    iosOverlaysWebView:boolean
    /** "Statusbar text color. Can be white or black iOS-only feature. This
    functionality is only available when app is running under cordova/phonegap
    environment with installed cordova-plugin-statusbar" */
    iosTextColor:string
  }

  export interface AppMethods {
    /** Hide statusbar. In webapp it just hides statusbar overlay, but
    * in cordova app it will hide statusbar at all.Hiding device
    * statusbar is available when app is running under cordova/phonegap
    * environment with installed cordova-plugin-statusbar */
    hide() : void
    /** Show statusbar */
    show() : void
    /** Makes the statusbar overlay or not overlay the WebView.  overlays -
    * boolean - does it overlay or notThis functionality is only
    * available when app is running under cordova/phonegap environment
    * with installed cordova-plugin-statusbar */
    iosOverlaysWebView(overlays : boolean) : void
    /** "Set/change statusbar text color.color - string - text color,
    can be white or blackiOS-only feature This functionality is only
    available when app is running under cordova/phonegap environment
    with installed cordova-plugin-statusbar" */
    setIosTextColor(color : string) : void
    /** Set/change statusbar background colorhex - string - Hex string
    * (#RRGGBB) with background color */
    setBackgroundColor(hex : string) : void
    /** Returns true if system statusbar is visible and false when it is
    * not visibleThis functionality is only available when app is
    * running under cordova/phonegap environment with installed
    * cordova-plugin-statusbar */
    isVisible() : boolean
  }
}
interface Framework7 {
  statusbar: Statusbar.AppParameters & Statusbar.AppMethods
}

export namespace Stepper {
  export interface Stepper {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // Stepper: Stepper.AppMethods
}
//export interface Framework7AppEvents extends Stepper.AppEvents {}

export namespace Subnavbar {
  export interface Subnavbar {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // Subnavbar: Subnavbar.AppMethods
}
//export interface Framework7AppEvents extends Subnavbar.AppEvents {}

export namespace Swiper {
  export interface Swiper {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // Swiper: Swiper.AppMethods
}
//export interface Framework7AppEvents extends Swiper.AppEvents {}

export namespace Swipeout {
  export interface Swipeout {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // Swipeout: Swipeout.AppMethods
}
//export interface Framework7AppEvents extends Swipeout.AppEvents {}

export namespace Tabs {
  export interface Tabs {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // Tabs: Tabs.AppMethods
}
//export interface Framework7AppEvents extends Tabs.AppEvents {}

export namespace Timeline {
  export interface Timeline {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // Timeline: Timeline.AppMethods
}
//export interface Framework7AppEvents extends Timeline.AppEvents {}

export namespace Toast {
  export interface Toast {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // Toast: Toast.AppMethods
}
//export interface Framework7AppEvents extends Toast.AppEvents {}

export namespace Toggle {
  export interface Toggle {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // Toggle: Toggle.AppMethods
}
//export interface Framework7AppEvents extends Toggle.AppEvents {}

export namespace Toolbar {
  export interface Toolbar {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // Toolbar: Toolbar.AppMethods
}
//export interface Framework7AppEvents extends Toolbar.AppEvents {}

export namespace Tabbar {
  export interface Tabbar {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // Tabbar: Tabbar.AppMethods
}
//export interface Framework7AppEvents extends Tabbar.AppEvents {}

export namespace Tooltip {
  export interface Tooltip {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // Tooltip: Tooltip.AppMethods
}
//export interface Framework7AppEvents extends Tooltip.AppEvents {}

export namespace VideoIntelligence {
  export interface VideoIntelligence {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // VideoIntelligence: VideoIntelligence.AppMethods
}
//export interface Framework7AppEvents extends VideoIntelligence.AppEvents {}

export namespace View {
  export interface View {
    // TODO: fill in?
  }

  export interface Parameters {
    name:string
    main:boolean
    router:boolean
    url:string
    stackPages:boolean
    linksView:string | object
    uniqueHistory:boolean
    uniqueHistoryIgnoreGetParameters:boolean
    allowDuplicateUrls:boolean
    animate:boolean
    preloadPreviousPage:boolean
    reloadPages:boolean
    restoreScrollTopOnBack:boolean
    iosPageLoadDelay:number
    materialPageLoadDelay:number
    passRouteQueryToRequest:boolean
    passRouteParamsToRequest:boolean
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // View: View.AppMethods
}
//export interface Framework7AppEvents extends View.AppEvents {}

export namespace VirtualList {
  export interface VirtualList {
    // TODO: fill in?
  }

  export interface Parameters {
    // TODO: fill in?
  }

  export interface Events {
    // TODO: fill in?
  }

  export interface DomEvents {
    // TODO: fill in?
  }

  export interface AppMethods {
    // TODO: fill in?
  }

  export interface AppEvents {
    // TODO: fill in?
  }
}
export interface Framework7Params {
  // TODO: fill in?
}
interface Framework7 {
  // TODO: fill in?
  // VirtualList: VirtualList.AppMethods
}
//export interface Framework7AppEvents extends VirtualList.AppEvents {}

export namespace Router {
  export interface Router {
    /** Template7 template string. Will be compiled as Template7 template */
    template : string
    /** Render function to render component. Must return full html string or HTMLElement */
    render : () => string | HTMLElement
    /** Component data, function must return component context data */
    data : () => any
    /** Component CSS styles. Styles will be added to the document after component will be mounted (added to DOM), and removed after component will be destroyed (removed from the DOM) */
    style : string
    /** Object with additional component methods which extend component context */
    methods : { [name : string] : () => any }
    /** Object with page events handlers */
    on : { [event : string] : () => void }

    /** Called synchronously immediately after the component has been initialized, before data and event/watcher setup. */
    beforeCreate : () => void
    /** Called synchronously after the component is created, context data and methods are available and component element $el is also created and available */
    created : () => void
    /** Called right before component will be added to DOM */
    beforeMount : () => void
    /** Called right after component was be added to DOM */
    mounted : () => void
    /** Called right after component VDOM has been patched */
    updated : () => void
    /** Called right before component will be destoyed */
    beforeDestroy : () => void
    /** Called when component destroyed */
    destroyed : () => void
  }
}

export interface Framework7Params {
  /** App root element. If you main app layout is not a direct child of the <body> then it is required to specify root element here. (default body) */
  root : string
  /** App bundle id.. (default io.framework7.testapp) */
  id : string
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

interface Framework7 {
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
  /** Object with properties about supported features. Check the Support utilities section */
  support : Support
  /** Object with properties about device. Check the Device utilities section */
  device : Device
  /** Object with some useful utilities. Check the Utils section */
  utils : Utils
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

interface Framework7AppEvents {
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

export interface Route {
  /** route URL */
  url : string
  /** route path */
  path : string
  /** object with route query. If the url is `/page/?id=5&foo=bar` then it will contain the following object `{id: '5', foo: 'bar'}` */
  query : { [ queryParameter : string ] : number | string | undefined }
  /** route params. If we have matching route with `/page/user/:userId/post/:postId/` path and url of the page is `/page/user/55/post/12/` then it will be the following object `{userId: '55', postId: '12'}` */
  params : { [ routeParameter : string ] : number | string | undefined }
  /** route name */
  name : string
  /** route URL hash */
  hash : string
  /** object with matching route from available routes */
  route : Route
  /** context that was passed to the route */
  context : any
}

export interface RouterOptions {
  url?: string;
  content?: string | HTMLElement | Dom7 | HTMLElement[];
  pageName?: string;
  template?: (template: any) => void;
  context?: any;
  contextName?: string;
  query?: any;
  force?: boolean;
  ignoreCache?: boolean;
  animatePages?: boolean;
  reload?: boolean;
  reloadPrevious?: boolean;
  pushState?: boolean;
}

export interface Device {
  ios: boolean,
  android: boolean,
  androidChrome: boolean,
  desktop: boolean,
  windowsPhone: boolean,
  iphone: boolean,
  iphoneX: boolean,
  ipod: boolean,
  ipad: boolean,
  edge: boolean,
  ie: boolean,
  firefox: boolean,
  macos: boolean,
  windows: boolean,
  cordova: boolean,
  phonegap: boolean,
  os: string,
  osVersion: string,
  webview: boolean,
  minimalUi?: boolean,
  statusbar: boolean,
  pixelRatio: number,
  needsStatusbarOverlay: () => boolean
}

export const Device: Device;

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

declare class Framework7 implements Framework7 {
  constructor(parameters?: Framework7Params);

  static use(plugin : Framework7Plugin) : void;
}

// TODO

export type Request = any
export const Request: Request;

export type Utils = any
export const Utils: Utils;

export type Support = any
export const Support: Support;

export default Framework7;
