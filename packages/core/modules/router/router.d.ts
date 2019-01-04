import Framework7, { Framework7EventsClass, Framework7Plugin, CSSSelector } from '../../components/app/app-class';
import { Dom7Instance } from 'dom7';
import { View } from '../../components/view/view';

export namespace Router {
  interface Component {
    /** Template7 template string. Will be compiled as Template7 template */
    template? : string
    /** Render function to render component. Must return full html string or HTMLElement */
    render? : () => string | HTMLElement
    /** Component data, function must return component context data */
    data? : () => any
    /** Component CSS styles. Styles will be added to the document after component will be mounted (added to DOM), and removed after component will be destroyed (removed from the DOM) */
    style? : string
    /** Object with additional component methods which extend component context */
    methods? : { [name : string] : (...args) => any }
    /** Object with page events handlers */
    on? : { [event : string] : (e: Event, page: any) => void }

    /** Called synchronously immediately after the component has been initialized, before data and event/watcher setup. */
    beforeCreate? : () => void
    /** Called synchronously after the component is created, context data and methods are available and component element $el is also created and available */
    created? : () => void
    /** Called right before component will be added to DOM */
    beforeMount? : () => void
    /** Called right after component was be added to DOM */
    mounted? : () => void
    /** Called right after component VDOM has been patched */
    updated? : () => void
    /** Called right before component will be destoyed */
    beforeDestroy? : () => void
    /** Called when component destroyed */
    destroyed? : () => void
  }
  interface RouteParameters {
    /** Route name, e.g. home */
    name?: string
    /** Route path. Means this route will be loaded when we click link that match to this path, or can be loaded by this path using API */
    path: string
    /** Object with additional route options (optional) */
    options?: RouteOptions
    /** Array with nested routes */
    routes?: RouteParameters[]
    /** Modules to load */
    modules?: any[]
    /** Load page from DOM by passed HTMLElement */
    el?: HTMLElement | CSSSelector
    /** Load page from DOM that has same data-name attribute */
    pageName?: string;
    /** Creates dynamic page from specified content string */
    content?: string | HTMLElement | Dom7Instance | HTMLElement[];
    /** Load page content via Ajax. */
    url?: string;
    /** Load page content from passed Template7 template string or function */
    template?: string | Function
    /** Load page content from url via Ajax, and compile it using Template7 */
    templateUrl?: string
    /** Load page from passed Framework7 Router Component */
    component?: Component
    /** load pages as a component via Ajax */
    componentUrl?: string
    /** Do required asynchronous manipulation and the return required route content and options */
    async?(routeTo: Route, routeFrom: Route, resolve: Function, reject: Function): void

    /** tab id */
    id?: string
    /** Array with tab routes */
    tabs?: RouteParameters[]
    /** Action Sheet route */
    actions?: RouteParameters
    /** Popup route */
    popup?: RouteParameters
    /** Login screen route */
    loginScreen?: RouteParameters
    /** Popover route */
    popover?: RouteParameters
    /** Sheet route */
    sheet?: RouteParameters
    /** Panel route */
    panel?: RouteParameters

    /** Route alias, or array with route aliases. We need to specify here alias path */
    alias?: string | any[]
    /** Route redirect. We need to specify here redirect url (not path) */
    redirect?: string | ((routeTo: Route, resolve: Function, reject: Function) => void)
    /** Function (or array of functions) that will be executed before route load/enter. To proceed route loading resolve must be called. In case of array then every function in array must be resolved to proceed */
    beforeEnter?: Function[] | ((routeTo: Route, routeFrom: Route, resolve: Function, reject: Function) => void)
    /** Function (or array of functions) that will be executed before route unload/leave. To proceed navigation resolve must be called. In case of array then every function in array must be resolved to proceed */
    beforeLeave?: Function[] | ((routeTo: Route, routeFrom: Route, resolve: Function, reject: Function) => void)
  }
  interface RouteOptions {
    /** whether the page should be animated or not (overwrites default router settings) */
    animate?: boolean
    /** whether the page should be saved in router history */
    history?: boolean
    /** whether the page should be saved in browser state. In case you are using pushState, then you can pass here false to prevent route getting in browser history */
    pushState?: boolean
    /** replace the current page with the new one from route */
    reloadCurrent?: boolean
    /** replace the previous page in history with the new one from route */
    reloadPrevious?: boolean
    /** load new page and remove all previous pages from history and DOM */
    reloadAll?: boolean
    /** previous pages history will be cleared after reloading/navigate to the specified route */
    clearPreviousHistory?: boolean
    /** custom/extended context for Template7/Component page (when route loaded from template, templateUrl, component or componentUrl) */
    context?: object
    /** If set to `true` then it will ignore if such URL in cache and reload it using XHR again */
    ignoreCache?: boolean
    /** if set to `true` then it will ignore previous page in history and load specified one */
    force?: boolean
    /** pass React/Vue component props */
    props?: object
  }
  interface NavigateParameters {
    query?: { [ queryParameter : string ] : number | string | undefined }
    /** route params. If we have matching route with `/page/user/:userId/post/:postId/` path and url of the page is `/page/user/55/post/12/` then it will be the following object `{userId: '55', postId: '12'}` */
    params?: { [ routeParameter : string ] : number | string | undefined }
    /** route name */
    name : string
  }
  interface Route {
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
    route : RouteParameters
    /** context that was passed to the route */
    context : object
  }
  interface Page {
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
    $el : Dom7Instance
    /** Related navbar element for this page. Available only in iOS theme with dynamic navbar enabled. */
    navbarEl : HTMLElement
    /** Dom7 instance with related navbar element for this page. Available only in iOS theme with dynamic navbar enabled. */
    $navbarEl : Dom7Instance
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
    context : object
  }
  interface Router extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app: Framework7
    /** Link to related View instance */
    view: View.View
    /** Object with router initialization parameters */
    params: View.Parameters
    /** Router's view HTML element */
    el: HTMLElement
    /** Dom7 instance with router's view HTML element */
    $el: Dom7Instance
    /** Array with available router's routes */
    routes: RouteParameters[]
    /** Array with router's view history */
    history: string[]

    /** Object with current route data */
    currentRoute: Route
    /** Object with previously active route data */
    previousRoute: Route
    /** Boolean property indicating is it allowed to change page / navigate or not */
    allowPageChange: boolean

    /** Navigate to (load) new page */
    navigate(url: string, options?: RouteOptions): Router
    /** Navigate to (load) new page by parameters. This method allows to navigate to route by its name */
    navigate(parameters: NavigateParameters, options?: RouteOptions): Router
    /** Go back to previous page, going back in View history */
    back(url?: string, options?: RouteOptions): Router
    /** Refresh/reload current page */
    refreshPage(): Router
    /** Remove all previous pages from DOM */
    clearPreviousPages(): Router
    /** Clear router previous pages history and remove all previous pages from DOM */
    clearPreviousHistory(): Router
    /** Updates current route url, and updates `router.currentRoute` properties (query, params, hash, etc.) based on passed url. This method doesn't load or reload any content. It just changes current route url */
    updateCurrentUrl(url: string): Router
  }
  interface SwipeBackData {
    percentage: number
    currentPageEl: HTMLElement
    previousPageEl: HTMLElement
    currentNavbarEl: HTMLElement
    previousNavbarEl: HTMLElement
  }
  interface Events {
    /** Event will be fired on current route change */
    routeChange(newRoute: Route, previousRoute: Route, router: Router): void
    /** Event will be fired on current route change and after page transitions */
    routeChanged(newRoute: Route, previousRoute: Route, router: Router): void
    /** Event will be fired when router.updateCurrentUrl method called */
    routeUrlUpdate(newRoute: Route, router: Router): void

    /** Event will be fired after router XHR opened and before XHR send. Can be used to modify the XHR object before it is sent. Use this callback to set custom headers, etc. As an arguments receives XHR object and navigating options object */
    routerAjaxStart(xhr: XMLHttpRequest, options: RouteOptions): void
    /** Event will be fired when the request succeeds. As an arguments receives XHR object and navigating options object */
    routerAjaxSuccess(xhr: XMLHttpRequest, options: RouteOptions): void
    /** Event will be fired if the request fails. As an arguments receives XHR object and navigating options object */
    routerAjaxError(xhr: XMLHttpRequest, options: RouteOptions): void
    /** Event will be fired when the request finishes. As an arguments receives XHR object and navigating options object */
    routerAjaxComplete(xhr: XMLHttpRequest, options: RouteOptions): void

    /** Event will be triggered during swipe back move */
    swipebackMove(data: SwipeBackData): void
    /** Event will be triggered right before swipe back animation to previous page when you release it */
    swipebackBeforeChange(data: SwipeBackData): void
    /** Event will be triggered after swipe back animation to previous page when you release it */
    swipebackAfterChange(data: SwipeBackData): void
    /** Event will be triggered right before swipe back animation to current page when you release it */
    swipebackBeforeReset(data: SwipeBackData): void
    /** Event will be triggered after swipe back animation to current page when you release it */
    swipebackAfterReset(data: SwipeBackData): void

    /** Event will be triggered when new page just inserted to DOM. As an argument event receives Page Data */
    pageMounted(page: Page): void
    /** Event will be triggered after Router initialize required page's components and navbar. As an argument event receives Page Data */
    pageInit(page: Page): void
    /** This event will be triggered in case of navigating to the page that was already initialized. As an argument event receives Page Data */
    pageReinit(page: Page): void
    /** Event will be triggered when everything initialized and page is ready to be transitioned into view (into active/current position). As an argument event receives Page Data */
    pageBeforeIn(page: Page): void
    /** Event will be triggered after page transitioned into view. As an argument event receives Page Data */
    pageAfterIn(page: Page): void
    /** Event will be triggered right before page is going to be transitioned out of view. As an argument event receives Page Data */
    pageBeforeOut(page: Page): void
    /** Event will be triggered after page transitioned out of view. As an argument event receives Page Data */
    pageAfterOut(page: Page): void
    /** Event will be triggered right before Page will be removed from DOM. This event could be very useful if you need to detach some events / destroy some plugins to free memory. As an argument event receives Page Data */
    pageBeforeRemove(page: Page): void

    /** Event will be triggered right after routable Tab content will be loaded */
    tabInit(newTabEl: HTMLElement, tabRoute: Route): void
    /** Event will be triggered right after routable Tab content will be loaded */
    tabMounted(newTabEl: HTMLElement, tabRoute: Route): void
    /** Event will be triggered right after routable Tab content will be loaded */
    tabBeforeRemove(oldTabEl: HTMLElement, newTabEl: HTMLElement, tabRoute: Route): void

    /** Event will be triggered right after routable modal content will be loaded and added to DOM */
    modalInit(modalEl: HTMLElement, modalRoute: Route, modal: any): void
    /** Event will be triggered right after routable modal content will be loaded and added to DOM */
    modalMounted(modalEl: HTMLElement, modalRoute: Route, modal: any): void
    /** Event will be triggered right before routable modal will be removed from DOM and destroyed */
    modalBeforeRemove(modalEl: HTMLElement, modalRoute: Route, modal: any): void
  }
  interface DomEvents {
    /** Event will be triggered during swipe back move */
    'swipeback:move': () => void
    /** Event will be triggered right before swipe back animation to previous page when you release it */
    'swipeback:beforechange': () => void
    /** Event will be triggered after swipe back animation to previous page when you release it */
    'swipeback:afterchange': () => void
    /** Event will be triggered right before swipe back animation to current page when you release it */
    'swipeback:beforereset': () => void
    /** Event will be triggered after swipe back animation to current page when you release it */
    'swipeback:afterreset': () => void
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

  interface AppMethods {
    /** Object with router/view cache data */
    cache: {
      xhr: object[],
      templates: object[],
      components: object[],
    }
  }
  interface AppParams {

  }
  interface AppEvents {

  }
}

declare const RouterModule: Framework7Plugin;

export default RouterModule;
