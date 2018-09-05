import Dom7 from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass } from '../app/app-class';

namespace Preloader {

}

declare module '../app/app-class' {
  interface Framework7Class {
    preloader: {
      /** Show Preloader overlay */
      show(color?: string | 'white') : void
      /** Hide Preloader overlay */
      hide() : void
    }
  }
  interface Framework7Params {
  }
  interface Framework7AppEvents {
  }
}

export default Preloader;