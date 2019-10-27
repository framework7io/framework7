import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Grid {
  interface AppMethods {

  }
  interface AppParams {

  }
  interface AppEvents {
    /** Event will be triggered when column or row resized */
    gridResize: (el : HTMLElement) => void
  }
}

declare const GridComponent: Framework7Plugin;
export default GridComponent;
