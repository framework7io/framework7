import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Range {
  interface Parameters {
    /** Range Slider element. HTMLElement or string with CSS selector of range slider element */
    el: HTMLElement | CSSSelector
    /** Range Slider input element or CSS selector of input element. If not specified, will try to look for input type="range" inside of range slider element */
    inputEl?: HTMLElement | CSSSelector
    /** Enable dual range slider (default false) */
    dual?: boolean
    /** Minimal step between values (default 1) */
    step?: number
    /** Enables additional label around range slider knob (default false) */
    label?: boolean
    /** Minimum value */
    min?: number
    /** Maximum value */
    max?: number
    /** Initial value. Number in case of single range, and array of values in case of dual range */
    value?: number | number[]
    /** When enabled it is also possible to interact with range slider (change value) on range bar click and swipe (default true) */
    draggableBar?: boolean
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]? : Events[event]
    }
  }
  interface Range extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app : Framework7
    /** Range HTML element */
    el : HTMLElement
    /** Dom7 instance with range HTML element */
    $el : Dom7Instance
    /** Range Slider input HTML element */
    inputEl: HTMLElement
    /** Dom7 instance with range slider input HTML element */
    $inputEl: Dom7Instance
    /** Range slider width (in px) */
    rangeWidth: number
    /** Boolean property indicating whether it is dual or not */
    dual: boolean
    /** Range min value */
    min: number
    /** Range max value */
    max: number
    /** Range value */
    value: number | number[]
    /** Array where each element represents HTMLElement of created range knob (2 knobs in case of dual slider) */
    knobs: HTMLElement[]
    /** Array where each element represent HTMLElement of created range knob label (2 labels in case of dual slider) */
    labels: HTMLElement[]
    /** Range parameters */
    params : Parameters
    /** Returns range slider value */
    getValue(): number | number[]
    /** Set new range slider value */
    setValue(value: number | number[]): Range
    /** Destroy range slider */
    destroy() : void
  }
  interface Events {
    /** Event will be triggered when range value has been changed. As an argument event handler receives range instance */
    change: (range : Range) => void
    /** Event will be triggered on slider knob release after value change. As an argument event handler receives range instance */
    changed: (range : Range) => void
    /** Event will be triggered right before Range slider instance will be destroyed */
    beforeDestroy: (range : Range) => void
  }
  interface DomEvents {
    /** Event will be triggered when range value has been changed. As an argument event handler receives range instance */
    'range:change' : () => void
    /** Event will be triggered on slider knob release after value change. As an argument event handler receives range instance */
    'range:changed' : () => void
    /** Event will be triggered right before Range slider instance will be destroyed */
    'range:beforedestroy' : () => void
  }

  interface AppMethods {
    range: {
      /** create Range Slider instance */
      create(parameters: Parameters): Range
      /** get Range Slider instance by HTML element */
      get(el: HTMLElement | CSSSelector | Range): Range
      /** get Range Slider value */
      getValue(el: HTMLElement | CSSSelector | Range): number | number[]
      /** set new Range Slider value */
      setValue(el: HTMLElement | CSSSelector | Range, value: number | number[]): void
      /** destroy Range Slider instance */
      destroy(el : HTMLElement | CSSSelector | Range) : void
    }
  }
  interface AppParams {
    range?: Parameters | undefined
  }
  interface AppEvents {
    /** Event will be triggered when range value has been changed. As an argument event handler receives range instance */
    rangeChange: (range : Range) => void
    /** Event will be triggered on slider knob release after value change. As an argument event handler receives range instance */
    rangeChanged: (range : Range) => void
    /** Event will be triggered right before Range slider instance will be destroyed */
    rangeBeforeDestroy: (range : Range) => void
  }
}

declare const RangeComponent: Framework7Plugin;

export default RangeComponent;