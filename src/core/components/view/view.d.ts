import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';
import { Router } from '../../modules/router/router';

export namespace View {
  interface View extends Framework7EventsClass<Events>  {
    /** Link to global app instance */
    app: Framework7
    /** View HTML element */
    el: HTMLElement
    /** Dom7 instance with view HTML element */
    $el: Dom7Instance
    /** View name that was passed name parameter */
    name: string
    /** Boolean property indicating is it a main view or not */
    main: boolean
    /** Array with available router's routes */
    routes: Router.RouteParameters[]
    /** Array with view history */
    history: string[]
    /** Object with view initialization parameters */
    params: Parameters
    /** View's initialized router instance */
    router: Router.Router
    /** Destroy view instance */
    destroy(): void

  }
  interface Parameters {
    /**	View name. If view was created with name, then it may be accessed via app.views.[name] */
    name?: string
    /**	Specify whether this is View is main or not. If not passed then will be determined based on whether its element has view-main class or not */
    main?: boolean
    /**	Set to false to disable view router */
    router?: boolean
    /**	Default (initial) View's url. If not specified, then it is equal to document url */
    url?: string
    /**	If enabled then all previous pages in navigation chain will not be removed from DOM when you navigate deeper and deeper. It could be useful, for example, if you have some Form from 5 steps (5 pages) and when you are on last 5th page you need access to form that was on 1st page. */
    stackPages?: boolean
    /**	CSS Selector of another view or object with initialized View instance. By defaul all links in initialized (only) view will load pages in this view. This tell links to load pages in other view. */
    linksView?: CSSSelector | View
    /**	You may enable this parameter to allow loading of new pages that have same url as currently "active" page in View. */
    allowDuplicateUrls?: boolean
    /**	Enables transitions between pages */
    animate?: boolean
    /** Custom page transition effect name */
    transition?: string
    /**	Enable/disable preloading of previous page when you go deep in navigation. Should be enabled for correct work of "swipe back page" feature. */
    preloadPreviousPage?: boolean
    /**	When enabled, View will always reload currently active page without loading new one */
    reloadPages?: boolean
    /** When enabled it will reload every detail page when navigating (by default false) */
    reloadDetail?: boolean
    /** Minimum app width to enable Master Detail view for master routes (routes with master: true parameter) */
    masterDetailBreakpoint?: number
    /** Enables resizable Master Detail */
    masterDetailResizable?: boolean
    /**	When enabled it will restore page scroll top when you get back to this page */
    restoreScrollTopOnBack?: boolean
    /**	Delay (in ms) after new page will be loaded and inserted to DOM and before it will be transitioned. Can be increased a bit to improve performance. Will have effect only under iOS theme */
    iosPageLoadDelay?: number
    /**	Delay (in ms) after new page will be loaded and inserted to DOM and before it will be transitioned. Can be increased a bit to improve performance. Will have effect only under MD theme */
    mdPageLoadDelay?: number
    /**	Delay (in ms) after new page will be loaded and inserted to DOM and before it will be transitioned. Can be increased a bit to improve performance. Will have effect only under Aurora theme */
    auroraPageLoadDelay?: number
    /**	When enabled then router will pass route url query to request url query (for url, templateUrl and componentUrl route properties) */
    passRouteQueryToRequest?: boolean
    /**	When enabled then router will pass current route parameters to request url query (for url, templateUrl and componentUrl route properties) */
    passRouteParamsToRequest?: boolean
    /**	Array with current View routes. In case if specified then will overwrite global app routes and routes only specified here will be available for the current View */
    routes?: Router.RouteParameters[]
    /**	Array with additional routes that will extend global app routes. This additional routes will only be available for the current View */
    routesAdd?: Router.RouteParameters[]
    /**	Function (or array of functions) that will be executed before every route load/enter. To proceed route loading resolve must be called. In case of array then every function in array must be resolved to proceed. */
    routesBeforeEnter?(to: Router.Route, from: Router.Route, resolve: Function, reject: Function): void
    /**	Function (or array of functions) that will be executed before every route unload/leave. To proceed navigation resolve must be called. In case of array then every function in array must be resolved to proceed. */
    routesBeforeLeave?(to: Router.Route, from: Router.Route, resolve: Function, reject: Function): void
    /**	During page transitions Router may remove unused Page and Navbar elements from DOM. Useful to be disabled in case you want to handle elements removal manually or using other library, e.g. Vue or React */
    removeElements?: boolean
    /**	When enabled then Router will remove elements after timeout */
    removeElementsWithTimeout?: boolean
    /**	Timeout to remove elements (in case of removeElementsWithTimeout: true) */
    removeElementsTimeout?: number
    /**	Unloads routable tab content (removes tab inner content) when tab becomes visible. Only for routable tabs */
    unloadTabContent?: boolean
    /**	As Router can use Ajax to load HTML content for pages it is good to use caching, especially if your content in those pages updates not very often. */
    xhrCache?: boolean
    /**	Array of URLs (string) that should not be cached */
    xhrCacheIgnore?: string[]
    /**	If "true" then URLs like "about.html?id=2" and "about.html?id=3" will be treated and cached like single "about.html" page */
    xhrCacheIgnoreGetParameters?: boolean
    /**	Duration in ms (milliseconds) while app will use cache instead of loading page with another Ajax request. By default it takes 10 minutes. */
    xhrCacheDuration?: number
    /** When enabled, Router will cache components specified via `componentUrl` (default true) */
    componentCache?: boolean
    /** When enabled, and there is no children pages inside of the View. It will load initial page that matches to initial URL (default true) */
    loadInitialPage?: boolean
    /**	Enables dynamic navbar for iOS theme */
    iosDynamicNavbar?: boolean
    /**	This option (when enabled) gives more native look for dynamic navbar left back-link icon animation. Useful only when you use dynamic navbar with default back-link icon on left side set as "sliding". */
    iosAnimateNavbarBackIcon?: boolean
    /**	Enable/disable ability to swipe back from left edge of screen to get to the previous page. For iOS theme */
    iosSwipeBack?: boolean
    /**	Value in px. Swipe back action will start if "touch distance" will be more than this value. For iOS theme */
    iosSwipeBackThreshold?: number
    /**	Value in px. Width of invisible left edge of the screen that triggers swipe back action. For iOS theme */
    iosSwipeBackActiveArea?: number
    /**	Enable/disable box-shadow animation during swipe back action. You can disable it to improve performance. For iOS theme */
    iosSwipeBackAnimateShadow?: boolean
    /**	Enable/disable opacity animation during swipe back action. You can disable it to improve performance. For iOS theme */
    iosSwipeBackAnimateOpacity?: boolean
    /**	Enable/disable ability to swipe back from left edge of screen to get to the previous page. For MD theme */
    mdSwipeBack?: boolean
    /**	Value in px. Swipe back action will start if "touch distance" will be more than this value. For MD theme */
    mdSwipeBackThreshold?: number
    /**	Value in px. Width of invisible left edge of the screen that triggers swipe back action. For MD theme */
    mdSwipeBackActiveArea?: number
    /**	Enable/disable box-shadow animation during swipe back action. You can disable it to improve performance. For MD theme */
    mdSwipeBackAnimateShadow?: boolean
    /**	Enable/disable opacity animation during swipe back action. You can disable it to improve performance. For MD theme */
    mdSwipeBackAnimateOpacity?: boolean
    /**	Enable/disable ability to swipe back from left edge of screen to get to the previous page. For Aurora theme */
    auroraSwipeBack?: boolean
    /**	Value in px. Swipe back action will start if "touch distance" will be more than this value. For Aurora theme */
    auroraSwipeBackThreshold?: number
    /**	Value in px. Width of invisible left edge of the screen that triggers swipe back action. For Aurora theme */
    auroraSwipeBackActiveArea?: number
    /**	Enable/disable box-shadow animation during swipe back action. You can disable it to improve performance. For Aurora theme */
    auroraSwipeBackAnimateShadow?: boolean
    /**	Enable/disable opacity animation during swipe back action. You can disable it to improve performance. For Aurora theme */
    auroraSwipeBackAnimateOpacity?: boolean
    /**	If you develop web app (not PhoneGap or Home Screen web app) it is useful to enable hash navigation (browser url will look like "http://my-webapp.com/#!/about.html"). User as well will be able to navigate through app's history by using browser's default back and forward buttons. */
    pushState?: boolean
    /**	Push state root URL separator, for example "http://my-app.com/". It is useful only in case when you use empty ("") pushStateSeparator */
    pushStateRoot?: string
    /**	Enable/disable page transitions on push state change */
    pushStateAnimate?: boolean
    /**	Enable/disable push state page transition on app load */
    pushStateAnimateOnLoad?: boolean
    /**	Push state URL separator, can be changed for something like '#page/' and then your push state urls will look like "http://myapp.com/#page/about.html" */
    pushStateSeparator?: string
    /**	Disable to ignore parsing push state URL and loading page on app load */
    pushStateOnLoad?: boolean
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]? : Events[event]
    }
  }
  interface View extends Router.AppMethods{}
  interface Events extends Router.Events{
    /** Event will be fired on View init */
    init: (view: View) => void
    /** Event will be triggered right when resizable Master Detail resized */
    resize: (view : View, masterWidth: number) => void
  }
  interface DomEvents extends Router.DomEvents {
    /** Event will be fired on View init */
    'view:init': () => void
    /** Event will be triggered right when resizable Master Detail resized */
    'view:resize': () => void
  }
  interface AppMethods extends Router.AppEvents{
    view: {
      current: View
      main: View
      create(viewEl: HTMLElement | CSSSelector, parameters?: Parameters): View
      get(viewEl: HTMLElement | CSSSelector): View
    },
    views: {
      current: View
      main: View
      create(viewEl: HTMLElement | CSSSelector, parameters?: Parameters): View
      get(viewEl: HTMLElement | CSSSelector): View
    }
  }
  interface AppParams {
    view?: Parameters | undefined
  }
  interface AppEvents extends Router.Events{
    /** Event will be fired on View init */
    viewInit: (view: View) => void
    /** Event will be triggered right when resizable Master Detail resized */
    viewResize: (view : View, masterWidth: number) => void
  }
}

declare const ViewComponent: Framework7Plugin;
export default ViewComponent;
