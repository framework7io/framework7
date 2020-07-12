import { Dom7Array } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Stepper {
  interface Parameters {
    /** Stepper element. HTMLElement or string with CSS selector of stepper element */
    el: HTMLElement | CSSSelector;
    /** Stepper input element or CSS selector of input element. If not specified, will try to look for <input> inside of stepper element */
    inputEl?: HTMLElement | CSSSelector;
    /** Minimal step between values (default 1) */
    step?: number;
    /** Minimum value (default 0) */
    min?: number;
    /** Maximum value (default 100) */
    max?: number;
    /** Initial value (default 0) */
    value?: number;
    /** When enabled, incrementing beyond maximum value sets value to minimum value; likewise, decrementing below minimum value sets value to maximum value (default false) */
    wraps?: boolean;
    /** When enabled it will repeatedly increase/decrease values while you tap and hold plus/minus buttons (default false) */
    autorepeat?: boolean;
    /** When enabled it will increase autorepeat ratio based on how long you hold the button (default false) */
    autorepeatDynamic?: boolean;
    /** Stepper value element or CSS selector of this element where Stepper will insert value. If not specified, and there is no inputEl passed will try to look for <div class="stepper-value"> inside of stepper element */
    valueEl?: HTMLElement | CSSSelector;
    /** Function to format value in required format. It accepts current value and must return new formatted value */
    formatValue?: (value: number) => string | number;
    /**  */
    manualInputMode?: boolean;
    /** Enables manual input mode. This mode allows to type value from keyboar and check fractional part with defined accurancy. Also, step parameter is ignored when typing in this mode */
    decimalPoint?: number;
    /** Number of digits after dot, when in manual input mode */
    buttonsEndInputMode?: boolean;
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]?: Events[event];
    };
  }
  interface Stepper extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app: Framework7;
    /** Stepper HTML element */
    el: HTMLElement;
    /** Dom7 instance with stepper HTML element */
    $el: Dom7Array;
    /** Stepper min value */
    min: number;
    /** Stepper max value */
    max: number;
    /** Stepper value */
    value: number;
    /** Stepper input HTML element */
    inputEl: HTMLElement;
    /** Dom7 instance with stepper input HTML element */
    $inputEl: Dom7Array;
    /** Stepper value container HTML element */
    valueEl: HTMLElement;
    /** Dom7 instance with stepper value container HTML element */
    $valueEl: HTMLElement;
    /** Stepper parameters */
    params: Parameters;
    /** Returns stepper value */
    getValue(): number;
    /** Set new stepper value */
    setValue(value: number): Stepper;
    /** Increment stepper value, similar to clicking on its "plus" button */
    incremenet(): Stepper;
    /** Increment stepper value, similar to clicking on its "plus" button */
    plus(): Stepper;
    /** Decrement stepper value, similar to clicking on its "minus" button */
    decrement(): Stepper;
    /** Decrement stepper value, similar to clicking on its "minus" button */
    minus(): Stepper;
    /** Destroy stepper */
    destroy(): void;
  }
  interface Events {
    /** Event will be triggered when stepper value has been changed. As an argument event handler receives stepper instance and stepper value */
    change: (stepper: Stepper, value: number) => void;
    /** Event will be triggered right before Stepper instance will be destroyed. As an argument event handler receives stepper instance */
    beforeDestroy: (stepper: Stepper) => void;
  }
  interface DomEvents {
    /** Event will be triggered when Stepper value has been changed*/
    'stepper:change': () => void;
    /** Event will be triggered right before Stepper instance will be destroyed */
    'stepper:beforedestroy': () => void;
  }

  interface AppMethods {
    stepper: {
      /** create Stepper instance */
      create(parameters: Parameters): Stepper;
      /** get Stepper instance by HTML element */
      get(el: HTMLElement | CSSSelector | Stepper): Stepper;
      /** get Stepper value */
      getValue(el: HTMLElement | CSSSelector | Stepper): number | number[];
      /** set new Stepper value */
      setValue(el: HTMLElement | CSSSelector | Stepper, value: number | number[]): void;
      /** destroy Stepper instance */
      destroy(el: HTMLElement | CSSSelector | Stepper): void;
    };
  }
  interface AppParams {
    stepper?: Parameters | undefined;
  }
  interface AppEvents {
    /** Event will be triggered when stepper value has been changed. As an argument event handler receives stepper instance and stepper value */
    stepperChange: (stepper: Stepper, value: number) => void;
    /** Event will be triggered right before Stepper instance will be destroyed. As an argument event handler receives stepper instance */
    stepperBeforeDestroy: (stepper: Stepper) => void;
  }
}

declare const StepperComponent: Framework7Plugin;

export default StepperComponent;
