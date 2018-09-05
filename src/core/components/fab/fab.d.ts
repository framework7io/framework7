import Dom7 from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass } from '../app/app-class';

namespace FAB {
  interface DomEvents {
    /** Event will be triggered on FAB open or when it morphs to target element */
    'fab:open' : () => void
    /** Event will be triggered on FAB close or when it morphs back from target element */
    'fab:close' : () => void
  }
}

declare module '../app/app-class' {
  interface Framework7Class {
    fab: {
      /** currently opened FAB HTML Element */
      openedEl: HTMLElement
      /** Open FAB speed dial actions/buttons, or morph it to specified target */
      open(fabEl : HTMLElement | CSSSelector, morphTargetEl? : HTMLElement | CSSSelector) : void;
      /** Close FAB speed dial actions/buttons, or morph it back from specified target */
      close(fabEl : HTMLElement | CSSSelector) : void;
      /** Toggle FAB speed dial actions/buttons */
      toggle(fabEl : HTMLElement | CSSSelector) : void;
    }
  }
  interface Framework7Params {
  }
  interface Framework7AppEvents {
  }
}

export default FAB;