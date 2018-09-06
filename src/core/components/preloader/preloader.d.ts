import Framework7, { CSSSelector, Framework7EventsClass } from '../app/app-class';

namespace Preloader {
  interface AppMethods {
    preloader: {
      /** Show Preloader overlay */
      show(color?: string | 'white') : void
      /** Hide Preloader overlay */
      hide() : void
    }
  }
  interface AppParams {

  }
  interface AppEvents {

  }
}

export default Preloader;