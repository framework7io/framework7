import Framework7, {
  CSSSelector,
  Framework7EventsClass,
  Framework7Plugin,
} from '../app/app-class.js';

export namespace Progressbar {
  interface AppMethods {
    progressbar: {
      /** set progress for Determinate Progressbar */
      set(el: HTMLElement | CSSSelector, progress: number, duration: number): void;
      /** set progress for Determinate Progressbar which is under the app root element */
      set(progress: number, duration: number): void;
      /** create and show or just show (if already presented) Progressbar */
      show(el?: HTMLElement | CSSSelector, progress?: number, color?: string): void;
      show(el?: HTMLElement | CSSSelector, color?: string): void;
      /** create and show Determinate Progressbar under app root */
      show(progress?: number, color?: string): void;
      /** create and show infinite Progressbar under app root */
      show(color?: string): void;
      /** hide Progressbar */
      hide(el?: HTMLElement | CSSSelector): void;
    };
  }
  interface AppParams {}
  interface AppEvents {}
}

declare const ProgressbarComponent: Framework7Plugin;

export default ProgressbarComponent;
