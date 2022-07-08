import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class.js';

export namespace Preloader {
  interface AppMethods {
    preloader: {
      /** Show Preloader overlay */
      show (color?: string | 'white'): void;
      /** Show Preloader overlay in specified element */
      showIn (el: HTMLElement | CSSSelector, color?: string): void;
      /** Hide Preloader overlay */
      hide (): void;
      /** Hide Preloader overlay in specified element */
      hideIn (el: HTMLElement | CSSSelector): void;
    };
  }
  interface AppParams { }
  interface AppEvents { }
}

declare const PreloaderComponent: Framework7Plugin;

export default PreloaderComponent;
