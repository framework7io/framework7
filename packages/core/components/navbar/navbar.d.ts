import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Navbar {
  interface AppMethods {
    navbar: {
      /** Hide navbar */
      hide(navbarEl : HTMLElement | CSSSelector, animate?: boolean) : void
      /** Show navbar */
      show(navbarEl : HTMLElement | CSSSelector, isAnimated?: boolean) : void
      /** Recalculate positional styles for Navbar elements. It could be useful after you change some of Navbar elements dynamically. This will have effect only in iOS theme */
      size(navbarEl : HTMLElement | CSSSelector) : void
      /** Get navbar HTML element by specified page element. Useful only when dynamic navbar is enabled. In this case it is out of the page container. This will have effect only in iOS theme */
      getElByPage(pageEl : HTMLElement | CSSSelector) : HTMLElement
      /** Get page HTML element by specified Navbar element. Useful only when dynamic navbar is enabled. In this case it is out of the page container. This will have effect only in iOS theme */
      getPageByEl(navbarEl : HTMLElement | CSSSelector) : HTMLElement
    }
  }
  interface AppParams {
    navbar?: {
      /** Will hide Navbars on page scroll. (default false) */
      hideOnPageScroll?: boolean
      /** Set to true to show hidden Navbar when scrolling reaches end of the page. (default true) */
      showOnPageScrollEnd?: boolean
      /** Set to false and hidden Navbar will not become visible when you scroll page to top everytime. They will become visible only at the most top scroll position, in the beginning of the page. (default true) */
      showOnPageScrollTop?: boolean
      /** When enabled then every click on navbar's title element will scroll related page to the top. (default true) */
      scrollTopOnTitleClick?: boolean
      /** When enabled then it will try to position title at the center in iOS theme. Sometime (with some custom design) it may not needed. This will have effect only in iOS theme. (default true) */
      iosCenterTitle?: boolean
    } | undefined
  }
  interface AppEvents {

  }
}

declare const NavbarComponent: Framework7Plugin;

export default NavbarComponent;