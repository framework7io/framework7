import Framework7, {
  CSSSelector,
  Framework7EventsClass,
  Framework7Plugin,
} from '../app/app-class.js';

export namespace Grid {
  interface AppMethods {}
  interface AppParams {}
  interface DomEvents {
    /** Event will be triggered on resizable grid column (or row) resize */
    'grid:resize': () => void;
  }
  interface AppEvents {
    /** Event will be triggered when column or row resized */
    gridResize: (el: HTMLElement) => void;
  }
}

declare const GridComponent: Framework7Plugin;
export default GridComponent;
