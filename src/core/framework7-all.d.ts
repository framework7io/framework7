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


export default Framework7;
