import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Treeview {
  interface AppMethods {
    treeview: {
      /** open specified treeview item */
      open(el: HTMLElement | CSSSelector): void;

      /** close specified treeview item */
      close(el: HTMLElement | CSSSelector): void;

      /** toggle specified treeview item */
      toggle(el: HTMLElement | CSSSelector): void;
    };
  }
  interface AppParams {}
  interface AppEvents {
    /** Event will be triggered on treeview item open */
    treeviewOpen: (el: HTMLElement | CSSSelector) => void;

    /** Event will be triggered on treeview item close */
    treeviewClose: (el: HTMLElement | CSSSelector) => void;

    /** Event will be triggered when treeview item with "treeview-load-children" class opened. It will also show preloader instead of toggle element */
    treeviewLoadChildren: (el: HTMLElement | CSSSelector, done: () => void) => void;
  }
}

declare const TreeviewComponent: Framework7Plugin;
export default TreeviewComponent;
