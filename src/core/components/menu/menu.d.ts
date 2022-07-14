import Framework7, {
  CSSSelector,
  Framework7EventsClass,
  Framework7Plugin,
} from '../app/app-class.js';

export namespace Menu {
  interface DomEvents {
    /** Event will be triggered right after menu dropdown will be opened */
    'menu:opened': () => void;
    /** Event will be triggered right after menu dropdown will be closed */
    'menu:closed': () => void;
  }
  interface AppMethods {
    menu: {
      /** open Menu dropdown */
      open(el?: HTMLElement | CSSSelector): void;
      /** close Menu dropdown */
      close(el?: HTMLElement | CSSSelector): void;
    };
  }
  interface AppParams {}
  interface AppEvents {
    /** Event will be triggered right after menu dropdown will be opened. As an argument event handler receives menu dropdown item element */
    menuOpened: (el: HTMLElement) => void;
    /** Event will be triggered right after menu dropdown will be closed. As an argument event handler receives menu dropdown item element */
    menuClosed: (el: HTMLElement) => void;
  }
}

declare const MenuComponent: Framework7Plugin;
export default MenuComponent;
