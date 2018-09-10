import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Lazy {
  interface DomEvents {
    /** Event will be triggered in the beginning of image file loading */
    'lazy:load': () => void
    /** Event will be triggered after image file successfully loaded */
    'lazy:loaded': () => void
    /** Event will be triggered in case of error loading image file */
    'lazy:error': () => void
  }
  interface AppMethods {
    lazy: {
      /** initialize lazy loading on page */
      create(pageEl : HTMLElement | CSSSelector) : void;
      /** destroy/disable lazy loading on page */
      destroy(pageEl : HTMLElement | CSSSelector) : void;
      /** force to load lazy image */
      loadImage(
        /** lazy image or element (element with lazy class). Required. */
        pageEl : HTMLElement | CSSSelector,
        callback : () => void
      ) : void;
    }
  }
  interface AppParams {
    lazy?: {
      /** Lazy load image placeholder source to show while image is not yet loaded. By default it is 1x1 px image. */
      placeholder?: string
      /** By default images are loaded when they appear on the screen. Use this parameter if you want to load images earlier. Setting it to 50 will load image when it 50 pixels before it appears on viewport. (default 0) */
      threshold?: number
      /** If enabled, then lazy images will be loaded one by one when they appear in viewport. (default true) */
      sequential?: boolean
    } | undefined
  }
  interface AppEvents {
    /** Event will be triggered in the beginning of image file loading. As an argument it receives lazy loading HTML element. */
    lazyLoad?: (lazyEl : HTMLElement) => void
    /** Event will be triggered after image file successfully loaded. As an argument it receives lazy loading HTML element. */
    lazyLoaded?: (lazyEl : HTMLElement) => void
    /** Event will be triggered in case of error loading image file. As an argument it receives lazy loading HTML element.*/
    lazyError?: (lazyEl : HTMLElement) => void
  }
}

declare const LazyComponent: Framework7Plugin;

export default LazyComponent;