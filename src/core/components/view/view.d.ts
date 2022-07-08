import { Dom7Array } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class.js';
import { Router } from '../../modules/router/router.js';

export namespace View {
  interface View extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app: Framework7;
    /** View HTML element */
    el: HTMLElement;
    /** Dom7 instance with view HTML element */
    $el: Dom7Array;
    /** View name that was passed name parameter */
    name: string;
    /** Boolean property indicating is it a main view or not */
    main: boolean;
    /** Array with available router's routes */
    routes: Router.RouteParameters[];
    /** Array with view history */
    history: string[];
    /** Object with view initialization parameters */
    params: Parameters;
    /** View's initialized router instance */
    router: Router.Router;
    /** Destroy view instance */
    destroy (): void;
  }
  interface Parameters {
    /** If enabled and View is tab, it won't initialize router and load initial page until View tab becomes visible */
    initRouterOnTabShow?: boolean;
    /**	View name. If view was created with name, then it may be accessed via app.views.[name] */
    name?: string;
    /**	Specify whether this is View is main or not. If not passed then will be determined based on whether its element has view-main class or not */
    main?: boolean;
    /**	Set to false to disable view router */
    router?: boolean;
    /**	Default (initial) View's url. If not specified, then it is equal to document url */
    url?: string;
    /**	If enabled then all previous pages in navigation chain will not be removed from DOM when you navigate deeper and deeper. It could be useful, for example, if you have some Form from 5 steps (5 pages) and when you are on last 5th page you need access to form that was on 1st page. */
    stackPages?: boolean;
    /**	CSS Selector of another view or object with initialized View instance. By default all links in initialized (only) view will load pages in this view. This tell links to load pages in other view. */
    linksView?: CSSSelector | View;
    /**	You may enable this parameter to allow loading of new pages that have same url as currently "active" page in View. */
    allowDuplicateUrls?: boolean;
    /**	Enables transitions between pages */
    animate?: boolean;
    /** Custom page transition effect name */
    transition?: string;
    /**	Enable/disable preloading of previous page when you go deep in navigation. Should be enabled for correct work of "swipe back page" feature. */
    preloadPreviousPage?: boolean;
    /**	When enabled, View will always reload currently active page without loading new one */
    reloadPages?: boolean;
    /** When enabled it will reload every detail page when navigating (by default false) */
    reloadDetail?: boolean;
    /** Minimum app width to enable Master Detail view for master routes (routes with master: true parameter) */
    masterDetailBreakpoint?: number;
    /** Enables resizable Master Detail */
    masterDetailResizable?: boolean;
    /**	When enabled it will restore page scroll top when you get back to this page */
    restoreScrollTopOnBack?: boolean;
    /**	Delay (in ms) after new page will be loaded and inserted to DOM and before it will be transitioned. Can be increased a bit to improve performance. Will have effect only under iOS theme */
    iosPageLoadDelay?: number;
    /**	Delay (in ms) after new page will be loaded and inserted to DOM and before it will be transitioned. Can be increased a bit to improve performance. Will have effect only under MD theme */
    mdPageLoadDelay?: number;
    /**	Delay (in ms) after new page will be loaded and inserted to DOM and before it will be transitioned. Can be increased a bit to improve performance. Will have effect only under Aurora theme */
    auroraPageLoadDelay?: number;
    /**	When enabled then router will pass route url query to request url query (for url, componentUrl route properties) */
    passRouteQueryToRequest?: boolean;
    /**	When enabled then router will pass current route parameters to request url query (for url, componentUrl route properties) */
    passRouteParamsToRequest?: boolean;
    /**	Array with current View routes. In case if specified then will overwrite global app routes and routes only specified here will be available for the current View */
    routes?: Router.RouteParameters[];
    /**	Array with additional routes that will extend global app routes. This additional routes will only be available for the current View */
    routesAdd?: Router.RouteParameters[];
    /**	Function (or array of functions) that will be executed before every route load/enter. To proceed route loading resolve must be called. In case of array then every function in array must be resolved to proceed. */
    routesBeforeEnter?(ctx: {
      to: Router.Route;
      from: Router.Route;
      resolve: Function;
      reject: Function;
      router: Router.Router;
      direction?: 'forward' | 'backward';
    }): void;
    /**	Function (or array of functions) that will be executed before every route unload/leave. To proceed navigation resolve must be called. In case of array then every function in array must be resolved to proceed. */
    routesBeforeLeave?(ctx: {
      to: Router.Route;
      from: Router.Route;
      resolve: Function;
      reject: Function;
      router: Router.Router;
      direction?: 'forward' | 'backward';
    }): void;
    /**	During page transitions Router may remove unused Page and Navbar elements from DOM. Useful to be disabled in case you want to handle elements removal manually or using other library, e.g. Vue or React */
    removeElements?: boolean;
    /**	When enabled then Router will remove elements after timeout */
    removeElementsWithTimeout?: boolean;
    /**	Timeout to remove elements (in case of removeElementsWithTimeout: true) */
    removeElementsTimeout?: number;
    /**	Unloads routable tab content (removes tab inner content) when tab becomes visible. Only for routable tabs */
    unloadTabContent?: boolean;
    /**	As Router can use Ajax to load HTML content for pages it is good to use caching, especially if your content in those pages updates not very often. */
    xhrCache?: boolean;
    /**	Array of URLs (string) that should not be cached */
    xhrCacheIgnore?: string[];
    /**	If "true" then URLs like "about.html?id=2" and "about.html?id=3" will be treated and cached like single "about.html" page */
    xhrCacheIgnoreGetParameters?: boolean;
    /**	Duration in ms (milliseconds) while app will use cache instead of loading page with another Ajax request. By default it takes 10 minutes. */
    xhrCacheDuration?: number;
    /** When enabled, Router will cache components specified via `componentUrl` (default true) */
    componentCache?: boolean;
    /** When enabled, and there is no children pages inside of the View. It will load initial page that matches to initial URL (default true) */
    loadInitialPage?: boolean;
    /**	Enables dynamic navbar for iOS theme */
    iosDynamicNavbar?: boolean;
    /**	This option (when enabled) gives more native look for dynamic navbar left back-link icon animation. Useful only when you use dynamic navbar with default back-link icon on left side set as "sliding". */
    iosAnimateNavbarBackIcon?: boolean;
    /**	Enable/disable ability to swipe back from left edge of screen to get to the previous page. For iOS theme */
    iosSwipeBack?: boolean;
    /**	Value in px. Swipe back action will start if "touch distance" will be more than this value. For iOS theme */
    iosSwipeBackThreshold?: number;
    /**	Value in px. Width of invisible left edge of the screen that triggers swipe back action. For iOS theme */
    iosSwipeBackActiveArea?: number;
    /**	Enable/disable box-shadow animation during swipe back action. You can disable it to improve performance. For iOS theme */
    iosSwipeBackAnimateShadow?: boolean;
    /**	Enable/disable opacity animation during swipe back action. You can disable it to improve performance. For iOS theme */
    iosSwipeBackAnimateOpacity?: boolean;
    /**	Enable/disable ability to swipe back from left edge of screen to get to the previous page. For MD theme */
    mdSwipeBack?: boolean;
    /**	Value in px. Swipe back action will start if "touch distance" will be more than this value. For MD theme */
    mdSwipeBackThreshold?: number;
    /**	Value in px. Width of invisible left edge of the screen that triggers swipe back action. For MD theme */
    mdSwipeBackActiveArea?: number;
    /**	Enable/disable box-shadow animation during swipe back action. You can disable it to improve performance. For MD theme */
    mdSwipeBackAnimateShadow?: boolean;
    /**	Enable/disable opacity animation during swipe back action. You can disable it to improve performance. For MD theme */
    mdSwipeBackAnimateOpacity?: boolean;
    /**	Enable/disable ability to swipe back from left edge of screen to get to the previous page. For Aurora theme */
    auroraSwipeBack?: boolean;
    /**	Value in px. Swipe back action will start if "touch distance" will be more than this value. For Aurora theme */
    auroraSwipeBackThreshold?: number;
    /**	Value in px. Width of invisible left edge of the screen that triggers swipe back action. For Aurora theme */
    auroraSwipeBackActiveArea?: number;
    /**	Enable/disable box-shadow animation during swipe back action. You can disable it to improve performance. For Aurora theme */
    auroraSwipeBackAnimateShadow?: boolean;
    /**	Enable/disable opacity animation during swipe back action. You can disable it to improve performance. For Aurora theme */
    auroraSwipeBackAnimateOpacity?: boolean;
    /**	If you develop web app (not Cordova/Capacitor or Home Screen web app) it is useful to enable hash navigation (browser url will look like "http://my-webapp.com/#!/about.html"). User as well will be able to navigate through app's history by using browser's default back and forward buttons. */
    browserHistory?: boolean;
    /**	Browser history root URL, for example "http://my-app.com/". It is useful only in case when you use empty ("") browserHistorySeparator */
    browserHistoryRoot?: string;
    /**	Enable/disable page transitions on history change */
    browserHistoryAnimate?: boolean;
    /**	Enable/disable page transition on app load */
    browserHistoryAnimateOnLoad?: boolean;
    /**	Browser history URL separator, can be changed for something like '#page/' and then your URLs will look like "http://myapp.com/#page/about.html" */
    browserHistorySeparator?: string;
    /**	Disable to ignore parsing browser history URL and loading page on app load */
    browserHistoryOnLoad?: boolean;
    /**	Set to true when your server cofigured to respond with content that matches to requested URL (e.g. using with server-side rendering frameworks like Nuxt.js, Next.js, and others). Also must be enabled when used in Framework7-React/Vue/Svelte. By default disabled */
    browserHistoryInitialMatch?: boolean;
    /**	When enabled (by default), it will store router history in localStorage and try to restore it on next web app visit */
    browserHistoryStoreHistory?: boolean;
    /** When "replace" (by default), it will replace state on routable tabs change, otherwise (if "push"), it will add to history every routable tab change, so it will be possible to switch back between tabs with browser back button */
    browserHistoryTabs?: 'replace' | 'push';
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]?: Events[event];
    };
  }
  interface View extends Router.AppMethods { }
  interface Events extends Router.Events {
    /** Event will be fired on View init */
    init: (view: View) => void;
    /** Event will be triggered right when resizable Master Detail resized */
    resize: (view: View, masterWidth: number) => void;
  }
  interface DomEvents extends Router.DomEvents {
    /** Event will be fired on View init */
    'view:init': () => void;
    /** Event will be triggered right when resizable Master Detail resized */
    'view:resize': () => void;
  }
  interface AppMethods extends Router.AppEvents {
    view: {
      current: View;
      main: View;
      create (viewEl: HTMLElement | CSSSelector, parameters?: Parameters): View;
      get (viewEl: HTMLElement | CSSSelector): View;
    };
    views: {
      current: View;
      main: View;
      create (viewEl: HTMLElement | CSSSelector, parameters?: Parameters): View;
      get (viewEl: HTMLElement | CSSSelector): View;
    };
  }
  interface AppParams {
    view?: Parameters | undefined;
  }
  interface AppEvents extends Router.Events {
    /** Event will be fired on View init */
    viewInit: (view: View) => void;
    /** Event will be triggered right when resizable Master Detail resized */
    viewResize: (view: View, masterWidth: number) => void;
  }
}

declare const ViewComponent: Framework7Plugin;
export default ViewComponent;
