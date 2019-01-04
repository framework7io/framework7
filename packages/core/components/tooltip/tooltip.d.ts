import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';
import { Dom7Instance } from 'dom7';

export namespace Tooltip {
  interface Parameters {
    /** Tooltip target element. Tooltip will be shown around this element. HTMLElement or string with CSS selector of tooltip target element */
    targetEl: HTMLElement | CSSSelector
    /** Tooltip text or HTML content */
    text: string
    /** Additional css class will be added to Tooltip element. Can be used for additional tooltip styling */
    cssClass?: string
    /** Function to render tooltip element, must return full tooltip HTML layout string */
    render?: (tooltip: Tooltip) => string
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]? : Events[event]
    }
  }
  interface DomEvents {
    /** Event will be triggered when Tooltip becomes visible */
    'tooltip:show': (event: Event) => void
    /** Event will be triggered when Tooltip becomes hidden. */
    'tooltip:hide': (event: Event) => void
    /** Event will be triggered right before Tooltip instance will be destroyed */
    'tooltip:beforedestroy': (event: Event) => void
  }
  interface Events {
    /** Event will be triggered when Tooltip becomes visible. As an argument event handler receives Tooltip instance */
    show: (tooltip: Tooltip) => void
    /** Event will be triggered when Tooltip becomes hidden. As an argument event handler receives Toolitp instance */
    hide: (tooltip: Tooltip) => void
    /** Event will be triggered right before Tooltip instance will be destroyed. As an argument event handler receives Tooltip instance */
    beforeDestroy: (tooltip: Tooltip) => void
  }
  interface Tooltip extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app : Framework7
    /** Tooltip HTML element */
    el : HTMLElement
    /** Dom7 instance with tooltip HTML element */
    $el : Dom7Instance
    /** Tooltip parameters */
    params : Parameters
    /** Tooltip target HTML element */
    targetEl: HTMLElement
    /** Dom7 instance with tooltip target HTML element */
    $targetEl: Dom7Instance
    /** Tooltip text/content */
    text: string
    /** Boolean property indicating whether it is opened/visible or not */
    opened: boolean
    /** Show tooltip around targetEl element. If targetEl is not specified, then it will use targetEl passed in parameters on initialization */
    show(targetEl: HTMLElement | CSSSelector): Tooltip
    /** Hide tooltip */
    hide(): Tooltip
    /** Change tooltip text or HTML content to the new one */
    setText(text: string): Tooltip
    /** Destroys tooltip instance */
    destroy(): void
  }
  interface AppMethods {
    tootlip: {
      /** create Tooltip instance */
      create(parameters: Parameters): Tooltip
      /** destroy Tooltip instance */
      destroy(targetEl: HTMLElement | CSSSelector): void
      /** get Tooltip instance by its target HTML element */
      get(targetEl: HTMLElement | CSSSelector): Tooltip
      /** show Tooltip */
      show(targetEl: HTMLElement | CSSSelector): Tooltip
      /** hide Tooltip */
      hide(targetEl: HTMLElement | CSSSelector): Tooltip
      /** change Tooltip text */
      setText(targetEl: HTMLElement | CSSSelector, text: string): Tooltip
    }
  }
  interface AppParams {
    tooltip?: Parameters | undefined
  }
  interface AppEvents {
    /** Event will be triggered when Tooltip becomes visible. As an argument event handler receives Tooltip instance */
    tooltipShow: (tooltip: Tooltip) => void
    /** Event will be triggered when Tooltip becomes hidden. As an argument event handler receives Toolitp instance */
    tooltipHide: (tooltip: Tooltip) => void
    /** Event will be triggered right before Tooltip instance will be destroyed. As an argument event handler receives Tooltip instance */
    tooltipBeforeDestroy: (tooltip: Tooltip) => void
  }
}

declare const TooltipComponent: Framework7Plugin;
export default TooltipComponent;