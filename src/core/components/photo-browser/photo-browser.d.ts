import { Dom7Array } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';
import { View } from '../view/view';

export namespace PhotoBrowser {
  interface Photo {
    /** image url */
    url?: string;
    /** caption text */
    caption?: string;
    /** photo object html */
    html?: string;
  }
  interface Parameters {
    /** Array with URLs of photos or array of objects with "url" (or "html") and "caption" properties. */
    photos?: Photo[] | string[];
    /** Enable disable exposition mode when clicking on Photo Browser. (default true) */
    exposition?: boolean;
    /** Set to true if you also want to hide captions in exposition mode (default false) */
    expositionHideCaptions?: boolean;
    /** You can close Photo Browser with swipe up/down when this parameter is enabled (default true) */
    swipeToClose?: boolean;
    /** Enables Photo Browser popup to push view/s behind on open (default false) */
    popupPush?: boolean;
    /** Will add opened photo browser to router history which gives ability to close photo browser by going back in router history and set current route to the photo browser modal (default false) */
    routableModals?: boolean;
    /** Photo browser modal URL that will be set as a current route (default "photos/") */
    url?: string;
    /** Link to initialized View instance if you want use "page" Photo Browser type or where to set routing when routableModals enabled. By default, if not specified, it will be opened in Main View */
    view?: View.View;
    /** Define how Photo Browser should be opened. Could be standalone (will be opened as an overlay with custom transition effect), popup (will be opened as popup), page (will be injected to View and loaded as a new page). */
    type?: 'popup' | 'page' | 'standalone';
    /** Photo Browser color theme, could be light or dark (deault "light") */
    theme?: 'light' | 'dark';
    /** Captions color theme, could be also light or dark. By default, equal to theme parameter */
    captionsTheme?: string;
    /** Set to false to remove Photo Browser's Navbar (default true) */
    navbar?: boolean;
    /** Set to false to remove Photo Browser's Toolbar (default true) */
    toolbar?: boolean;
    /** Text on back link in Photo Browser's navbar (default "Back") */
    pageBackLinkText?: string;
    /** Text on close link in Photo Browser's navbar when opened in Popup or as Standalone (default "Close") */
    popupCloseLinkText?: string;
    /** Text of "of" in photos counter: "3 of 5" (default "of") */
    navbarOfText?: string;
    /** Defines should it display "3 of 5" text in navbar title or not. If not specified (undefined) then it will show this text if there is more than 1 item  */
    navbarShowCount?: boolean | undefined;
    /** One of the default colors */
    iconsColor?: string;
    /** Swiper parameters */
    swiper?: object;

    /** Function to render navbar, must return navbar HTML string */
    renderNavbar?: () => string;
    /** Function to render toolbar, must return toolbar HTML string */
    renderToolbar?: () => string;
    /** Function to render single caption, must return caption HTML string */
    renderCaption?: (caption: string, index: number) => string;
    /** Function to render photo object, must return photo object HTML string */
    renderObject?: (photo: Photo | string, index: number) => string;
    /** Function to render lazy loaded photo slide, must return slide HTML string */
    renderLazyPhoto?: (photo: Photo | string, index: number) => string;
    /** Function to render photo as a swiper slide, must return slide HTML string */
    renderPhoto?: (photo: Photo | string, index: number) => string;
    /** Function to render photobrowser page, must return full page HTML layout string */
    renderPage?: () => string;
    /** Function to render photobrowser popup, must return full popup HTML layout string */
    renderPopup?: () => string;
    /** Function to render photobrowser standalone modal, must return full modal HTML layout string */
    renderStandalone?: () => string;
  }
  interface PhotoBrowser extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app: Framework7;
    /** Photo Browser HTML element */
    el: HTMLElement;
    /** Dom7 instance with Photo Browser HTML element */
    $el: Dom7Array;
    /** Index number of currently active photo slide */
    activeIndex: number;
    /** true if Photo Browser in exposition mode */
    exposed: boolean;
    /** true if Photo Browser is currently opened */
    opened: boolean;
    /** Photo Browser URL (that was passed in url parameter) */
    url: string;
    /** Photo Browser View (that was passed in view parameter) or found parent view */
    view: View.View;
    /** Contains initialized Swiper instance with all available Swiper methods and properties */
    swiper: object;
    /** Object with initialization parameters */
    params: Parameters;

    /** Open Photo Browser on photo with index number equal to "index" parameter. If "index" parameter is not specified, it will be opened on last closed photo */
    open(index?: number): PhotoBrowser;
    /** Close Photo Browser */
    close(): PhotoBrowser;
    /** Toggle exposition mode */
    expositionToggle(): PhotoBrowser;
    /** Enable exposition mode */
    expositionEnable(): PhotoBrowser;
    /** Disable exposition mode */
    expositionDisable(): PhotoBrowser;
    /** Destroy Photo Browser */
    destroy(): void;
  }
  interface Events {
    /** Event will be fired when user close photo browser with swipe up/down */
    swipeToClose: (photoBrowser: PhotoBrowser) => void;
    /** Event will be fired when user click/tap on Swiper. Receives 'touchend' event as an arguments */
    tap: (photoBrowser: PhotoBrowser, event: Event) => void;
    /** Event will be fired when user click/tap on Swiper. Receives 'touchend' event as an arguments */
    click: (photoBrowser: PhotoBrowser, event: Event) => void;
    /** Event will be fired when user double tap on Swiper's container. Receives 'touchend' event as an arguments */
    doubleTap: (photoBrowser: PhotoBrowser, event: Event) => void;
    /** Event will be fired when user double tap on Swiper's container. Receives 'touchend' event as an arguments */
    doubleClick: (photoBrowser: PhotoBrowser, event: Event) => void;
    /** Event will be fired when currently active slide is changed */
    slideChange: (photoBrowser: PhotoBrowser) => void;
    /** Event will be fired in the beginning of transition */
    transitionStart: (photoBrowser: PhotoBrowser) => void;
    /** Event will be fired after transition */
    transitionEnd: (photoBrowser: PhotoBrowser) => void;
    /** Event will be fired in the beginning of animation to other slide (next or previous) */
    slideChangeTransitionStart: (photoBrowser: PhotoBrowser) => void;
    /** Event will be fired after animation to other slide (next or previous) */
    slideChangeTransitionEnd: (photoBrowser: PhotoBrowser) => void;
    /** Event will be fired in the beginning of lazy loading of image */
    lazyImageLoad: (photoBrowser: PhotoBrowser) => void;
    /** Event will be fired when lazy loading image will be loaded */
    lazyImageReady: (photoBrowser: PhotoBrowser) => void;
    /** Event will be fired when user touch Swiper. Receives 'touchstart' event as an arguments */
    touchStart: (photoBrowser: PhotoBrowser) => void;
    /** Event will be fired when user touch and move finger over Swiper in direction opposite to direction parameter. Receives 'touchmove' event as an arguments */
    touchMoveOpposite: (photoBrowser: PhotoBrowser) => void;
    /** Event will be fired when user release Swiper. Receives 'touchend' event as an arguments */
    touchEnd: (photoBrowser: PhotoBrowser) => void;
    /** Event will be triggered when Photo Browser starts its opening animation. As an argument event handler receives Photo Browser instance */
    open: (photoBrowser: PhotoBrowser) => void;
    /** Event will be triggered when Photo Browser completes its opening animation. As an argument event handler receives Photo Browser instance */
    opened: (photoBrowser: PhotoBrowser) => void;
    /** Event will be triggered when Photo Browser starts its closing animation. As an argument event handler receives Photo Browser instance */
    close: (photoBrowser: PhotoBrowser) => void;
    /** Event will be triggered after Photo Browser completes its closing animation. As an argument event handler receives Photo Browser instance */
    closed: (photoBrowser: PhotoBrowser) => void;
    /** Event will be triggered right before Photo Browser instance will be destroyed */
    beforeDestroy: (photoBrowser: PhotoBrowser) => void;
  }
  interface DomEvents {
    /** Event will be triggered when Photo Browser starts its opening animation */
    'photobrowser:open': () => void;
    /** Event will be triggered after Photo Browser completes its opening animation */
    'photobrowser:opened': () => void;
    /** Event will be triggered when Photo Browser starts its closing animation */
    'photobrowser:close': () => void;
    /** Event will be triggered after Photo Browser completes its closing animation */
    'photobrowser:closed': () => void;
  }

  interface AppMethods {
    photoBrowser: {
      /** create Photo Browser instance */
      create(parameters: Parameters): PhotoBrowser;
      /** destroy Photo Browser instance */
      destroy(el: HTMLElement | CSSSelector | PhotoBrowser): void;
      /** get Photo Browser instance by HTML element */
      get(el: HTMLElement | CSSSelector): PhotoBrowser;
    };
  }
  interface AppParams {
    photoBrowser?: Parameters | undefined;
  }
  interface AppEvents {
    /** Event will be triggered when Photo Browser starts its opening animation. As an argument event handler receives Photo Browser instance */
    photoBrowserOpen: (photoBrowser: PhotoBrowser) => void;
    /** Event will be triggered when Photo Browser completes its opening animation. As an argument event handler receives Photo Browser instance */
    photoBrowserOpened: (photoBrowser: PhotoBrowser) => void;
    /** Event will be triggered when Photo Browser starts its closing animation. As an argument event handler receives Photo Browser instance */
    photoBrowserClose: (photoBrowser: PhotoBrowser) => void;
    /** Event will be triggered after Photo Browser completes its closing animation. As an argument event handler receives Photo Browser instance */
    photoBrowserClosed: (photoBrowser: PhotoBrowser) => void;
    /** Event will be triggered right before Photo Browser instance will be destroyed */
    photoBrowserBeforeDestroy: (photoBrowser: PhotoBrowser) => void;
  }
}

declare const PhotoBrowserComponent: Framework7Plugin;

export default PhotoBrowserComponent;
