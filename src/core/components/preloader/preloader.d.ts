import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Preloader {
  interface AppMethods {
    preloader: {
      /** Show Preloader overlay */
      show(color?: string | 'white'): void;
      /** Hide Preloader overlay */
      hide(): void;
    };
  }
  interface AppParams {}
  interface AppEvents {}
}

declare const PreloaderComponent: Framework7Plugin;

export default PreloaderComponent;
