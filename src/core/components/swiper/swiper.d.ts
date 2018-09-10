import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Swiper {
  interface Swiper {}
  interface Parameters {}
  interface AppMethods {
    swiper: {
      /** initialize slider with options */
      create(swiperEl: HTMLElement | CSSSelector, params?: Parameters): Swiper
      /** get Swiper instance by HTML element */
      get(swiperEl: HTMLElement | CSSSelector): Swiper
      /** destroy Swiper instance */
      get(swiperEl: HTMLElement | CSSSelector): void
    }
  }
  interface AppParams {

  }
  interface AppEvents {

  }
}

declare const SwiperComponent: Framework7Plugin;
export default SwiperComponent;