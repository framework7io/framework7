import { Dom7Instance } from 'dom7';
import { CSSSelector, Framework7Plugin } from '../app/app-class';

export namespace Toolbar {
  interface AppMethods {
    toolbar: {
      /** Hide toolbar */
      hide(toolbarEl: HTMLElement | CSSSelector, animate?: boolean): void
      /** Show toolbar */
      show(toolbarEl: HTMLElement | CSSSelector, animate?: boolean): void
      /** Set highlight on tab links according to active one (This will have effect only in MD theme) */
      setHighlight(tabbarEl: HTMLElement | CSSSelector): void
    }
  }
  interface AppParams {
    toolbar?: {
      /** Will hide Toolbars/Tabbars on page scroll (default false) */
      hideOnPageScroll?: boolean
      /** Set to true to show hidden Toolbar/Tabbar when scrolling reaches end of the page (default true) */
      showOnPageScrollEnd?: boolean
      /** Set to false and hidden Toolbar/Tabbar will not become visible when you scroll page to top everytime. They will become visible only at the most top scroll position, in the beginning of the page (default true)  */
      showOnPageScrollTop?: boolean
    } | undefined
  }
  interface AppEvents {
    /** Event will be triggered when Tab becomes visible/active */
    tabShow: (tabEl: HTMLElement) => void
    /** Event will be triggered when Tab becomes hidden/inactive */
    tabHide: (tabEl: HTMLElement) => void
  }
}

declare const ToolbarComponent: Framework7Plugin;

export default ToolbarComponent;