import Framework7, {
  CSSSelector,
  Framework7EventsClass,
  Framework7Plugin,
} from '../app/app-class.js';

export namespace Navbar {
  interface AppMethods {
    navbar: {
      /** Hide navbar */
      hide(navbarEl: HTMLElement | CSSSelector, animate?: boolean, hideStatusbar?: boolean): void;
      /** Show navbar */
      show(navbarEl: HTMLElement | CSSSelector, animate?: boolean): void;
      /** Recalculate positional styles for Navbar elements. It could be useful after you change some of Navbar elements dynamically. This will have effect only in iOS theme */
      size(navbarEl: HTMLElement | CSSSelector): void;
      /** Get navbar HTML element by specified page element. Useful only when dynamic navbar is enabled. In this case it is out of the page container. This will have effect only in iOS theme */
      getElByPage(pageEl: HTMLElement | CSSSelector): HTMLElement;
      /** Get page HTML element by specified Navbar element. Useful only when dynamic navbar is enabled. In this case it is out of the page container. This will have effect only in iOS theme */
      getPageByEl(navbarEl: HTMLElement | CSSSelector): HTMLElement;
      /** Collapse large navbar title */
      collapseLargeTitle(navbarEl: HTMLElement | CSSSelector): void;
      /** Expand large navbar title */
      expandLargeTitle(navbarEl: HTMLElement | CSSSelector): void;
      /** Toggle large navbar title */
      toggleLargeTitle(navbarEl: HTMLElement | CSSSelector): void;
    };
  }
  interface AppParams {
    navbar?:
      | {
          /** Will hide Navbars on page scroll. (default false) */
          hideOnPageScroll?: boolean;
          /** Set to true to show hidden Navbar when scrolling reaches end of the page. (default true) */
          showOnPageScrollEnd?: boolean;
          /** Set to false and hidden Navbar will not become visible when you scroll page to top everytime. They will become visible only at the most top scroll position, in the beginning of the page. (default true) */
          showOnPageScrollTop?: boolean;
          /** When enabled then every click on navbar's title element will scroll related page to the top. (default true) */
          scrollTopOnTitleClick?: boolean;
          /** When enabled then it will position title at the center in iOS theme. This will have effect only in iOS theme. (default true) */
          iosCenterTitle?: boolean;
          /** When enabled then it will position title at the center in MD theme. This will have effect only in MD theme. (default false) */
          mdCenterTitle?: boolean;
          /** When enabled it will collapse large title on page scroll (default true) */
          collapseLargeTitleOnScroll?: boolean;
          /** When enabled it will snap page scroll to large title (default true) */
          snapPageScrollToLargeTitle?: boolean;
          /** When enabled it will snap page scroll to transparent title (default true) */
          snapPageScrollToTransparentNavbar?: boolean;
        }
      | undefined;
  }

  interface DomEvents {
    /** Event will be triggered when Navbar becomes hidden */
    'navbar:hide': () => void;
    /** Event will be triggered when Navbar becomes visible */
    'navbar:show': () => void;
    /** Event will be triggered when Navbar with large title collapsed (from large navbar to usual navbar) */
    'navbar:collapse': () => void;
    /** Event will be triggered when Navbar with large title expanded (from usual navbar to large navbar) */
    'navbar:expand': () => void;
  }
  interface AppEvents {
    /** Event will be triggered when Navbar becomes hidden */
    navbarHide: (el: HTMLElement) => void;
    /** Event will be triggered when Navbar becomes visible */
    navbarShow: (el: HTMLElement) => void;
    /** Event will be triggered when Navbar with large title collapsed (from large navbar to usual navbar) */
    navbarCollapse: (el: HTMLElement) => void;
    /** Event will be triggered when Navbar with large title expanded (from usual navbar to large navbar) */
    navbarExpand: (el: HTMLElement) => void;
  }
}

declare const NavbarComponent: Framework7Plugin;

export default NavbarComponent;
