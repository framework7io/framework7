import Framework7 from '../app/app-class.js';
import { CSSSelector, Framework7Plugin } from '../app/app-class.js';

export namespace Accordion {
  interface AppMethods {
    accordion: {
      /** open specified accordion item */
      open(el: HTMLElement | CSSSelector): void;

      /** close specified accordion item */
      close(el: HTMLElement | CSSSelector): void;

      /** toggle specified accordion item */
      toggle(el: HTMLElement | CSSSelector): void;
    };
  }
  interface AppParams {}
  interface DomEvents {
    /** Event will be triggered right before accordion content starts its opening animation. event.detail.prevent contains function that will prevent accordion from opening when called */
    'accordion:beforeopen': () => void;
    /** Event will be triggered when accordion content starts its opening animation */
    'accordion:open': () => void;
    /** Event will be triggered after accordion content completes its opening animation */
    'accordion:opened': () => void;
    /** Event will be triggered right before accordion content starts its closing animation. event.detail.prevent contains function that will prevent accordion from closing when called */
    'accordion:beforeclose': () => void;
    /** Event will be triggered when accordion content starts its closing animation */
    'accordion:close': () => void;
    /** Event will be triggered after accordion content completes its closing animation */
    'accordion:closed': () => void;
  }
  interface AppEvents {
    /** Event will be triggered before accordion content starts its opening animation */
    accordionBeforeOpen: (el: HTMLElement | CSSSelector, prevent: () => void) => void;

    /** Event will be triggered when accordion content starts its opening animation */
    accordionOpen: (el: HTMLElement | CSSSelector) => void;

    /** Event will be triggered after accordion content completes its opening animation */
    accordionOpened: (el: HTMLElement | CSSSelector) => void;

    /** Event will be triggered before accordion content starts its closing animation */
    accordionBeforeClose: (el: HTMLElement | CSSSelector, prevent: () => void) => void;

    /** Event will be triggered when accordion content starts its closing animation */
    accordionClose: (el: HTMLElement | CSSSelector) => void;

    /** Event will be triggered after accordion content completes its closing animation */
    accordionClosed: (el: HTMLElement | CSSSelector) => void;
  }
}

declare const AccordionComponent: Framework7Plugin;

export default AccordionComponent;
