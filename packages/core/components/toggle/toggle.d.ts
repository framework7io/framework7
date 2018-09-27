import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Toggle {
  interface Parameters {
    /** Toggle element. HTMLElement or string with CSS selector of toggle element */
    el?: HTMLElement | CSSSelector
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]? : Events[event]
    }
  }
  interface Toggle extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app : Framework7
    /** Toggle HTML element */
    el : HTMLElement
    /** Dom7 instance with toggle HTML element */
    $el : Dom7Instance
    /** Toggle input HTML element */
    inputEl: HTMLElement
    /** Dom7 instance with toggle input HTML element */
    $inputEl: Dom7Instance
    /** Boolean property indicating whether it is input is checked or not */
    checked: boolean
    /** Toggle parameters */
    params : Parameters
    /** Toggle input state */
    toggle(): number
    /** Destroy Toggle */
    destroy() : void
  }
  interface Events {
    /** Event will be triggered when toggle state has been changed. As an argument event handler receives toggle instance */
    change: (toggle : Toggle) => void
    /** Event will be triggered right before Toggle instance will be destroyed. As an argument event handler receives toggle instance */
    beforeDestroy: (toggle : Toggle) => void
  }
  interface DomEvents {
    /** Event will be triggered when Toggle state has been changed */
    'toggle:change' : (event: Event) => void
    /** Event will be triggered right before Toggle instance will be destroyed */
    'toggle:beforedestroy' : (event: Event) => void
  }

  interface AppMethods {
    toggle: {
      /** create Toggle instance */
      create(parameters: Parameters): Toggle
      /** get Toggle instance by HTML element */
      get(el: HTMLElement | CSSSelector | Toggle): Toggle
      /** destroy Toggle instance */
      destroy(el : HTMLElement | CSSSelector | Toggle) : void
    }
  }
  interface AppParams {
    toggle?: Parameters | undefined
  }
  interface AppEvents {
    /** Event will be triggered when toggle state has been changed. As an argument event handler receives toggle instance */
    toggleChange: (toggle : Toggle) => void
    /** Event will be triggered right before Toggle instance will be destroyed. As an argument event handler receives toggle instance */
    toggleBeforeDestroy: (toggle : Toggle) => void
  }
}

declare const ToggleComponent: Framework7Plugin;

export default ToggleComponent;