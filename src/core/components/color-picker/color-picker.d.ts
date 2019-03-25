import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';
import { View } from '../view/view';

export namespace ColorPicker {
  interface ColorPicker extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app : Framework7
    /** Color Picker wrapping container HTML element (when inline color picker is in use) */
    containerEl : HTMLElement
    /** Dom7 instance with color picker wrapping container HTML element (when inline color picker is in use) */
    $containerEl : Dom7Instance
    /** Color Picker HTML element */
    el : HTMLElement
    /** Dom7 instance with color picker HTML element */
    $el : Dom7Instance
    /** Color Picker input HTML element (passed in inputEl parameter) */
    inputEl : HTMLElement
    /** Dom7 instance with color picker input HTML element (passed in inputEl parameter) */
    $inputEl : Dom7Instance
    /** Array where each item represents selected date */
    value : Date[]
    /** true if Color Picker is currently opened */
    opened : boolean
    /** true when inline color picker is in use */
    inline : boolean
    /** Color Picker URL (that was passed in url parameter) */
    url: string
    /** Color Picker View (that was passed in view parameter) or found parent view */
    view : View.View
    /** Object with initialization parameters */
    params : Parameters


    /** Set new selected dates. values is array where each item represents selected date */
    setValue(values : Date[]) : void
    /** Returns current color picker value */
    getValue() : Date[]
    /** Adds value to the values array. Useful in case if multiple selection is enabled (with multiple: true parameter) */
    addValue(value: Date) : void
    /** Open Color Picker */
    open() : void
    /** Close Color Picker */
    close() : void
    /** Destroy Color Picker instance and remove all events */
    destroy() : void
  }


  interface Parameters {
    /** Array with initial selected dates. Each array item represents selected date. */
    value?: Date[]
    /** Function to format input value, should return new/formatted string value. values is array where each item represents selected date. */
    formatValue?: (values : Date) => string
    /** Enable and color picker will be closed when user pick a date. (default false) */
    closeOnSelect?: boolean

    // Container/opener-specific parameters
    /** String with CSS selector or HTMLElement where to place generated Color Picker HTML. Use only for inline color picker. */
    containerEl?: HTMLElement | CSSSelector
    /** Can be auto, popover (to open color picker in popover), sheet (to open in sheet modal) or customModal (to open in custom Color Picker modal overlay). In case of auto will open in sheet modal on small screens and in popover on large screens.. (default auto) */
    openIn?: string
    /** String with CSS selector or HTMLElement with related input element. */
    inputEl?: HTMLElement | CSSSelector
    /** Scroll viewport (page-content) to input when color picker opened. (default true) */
    scrollToInput?: boolean
    /** Sets "readonly" attribute on specified input. (default true) */
    inputReadOnly?: boolean
    /** Additional CSS class name to be set on color picker element. */
    cssClass?: string
    /** If enabled, picker will be closed by clicking outside of picker or related input element. (default true) */
    closeByOutsideClick?: boolean
    /** Enables color picker toolbar. (default true) */
    toolbar?: boolean
    /** Text for Done/Close toolbar button. (default Done) */
    toolbarCloseText?: string
    /** Will add opened color picker to router history which gives ability to close color picker by going back in router history and set current route to the color picker modal. (default true) */
    routableModals?: boolean
    /** Color Picker modal URL that will be set as a current route. (default date/) */
    url?: string
    /** View where to set routing when routableModals enabled. Defaults to parent view of inputEl or main view if not found parent view. */
    view?: View.View

    /** Function to render toolbar. Must return toolbar HTML string. */
    renderToolbar?: () => string
    /** Function to render whole color picker. Must return color picker full HTML string. */
    render?: () => string

    on?: {
      [event in keyof Events]? : Events[event]
    }
  }

  interface Events {
    /** Event will be triggered when Color Picker initialized */
    init: (colorPicker : ColorPicker) => void
    /** Event will be triggered when Color Picker starts its opening animation. As an argument event handler receives Color Picker instance */
    open: (colorPicker : ColorPicker) => void
    /** Event will be triggered after Color Picker completes its opening animation. As an argument event handler receives Color Picker instance */
    opened: (colorPicker : ColorPicker) => void
    /** Event will be triggered when Color Picker starts its closing animation. As an argument event handler receives Color Picker instance */
    close: (colorPicker : ColorPicker) => void
    /** Event will be triggered after Color Picker completes its closing animation. As an argument event handler receives Color Picker instance */
    closed: (colorPicker : ColorPicker) => void
    /** Event will be triggered right before Color Picker instance will be destroyed. As an argument event handler receives Color Picker instance */
    beforeDestroy: (colorPicker : ColorPicker) => void
  }

  interface DomEvents {
    /** Event will be triggered when Color Picker starts its opening animation */
    'colorpicker:open' : () => void
    /** Event will be triggered after Color Picker completes its opening animation */
    'colorpicker:opened' : () => void
    /** Event will be triggered when Color Picker starts its closing animation */
    'colorpicker:close' : () => void
    /** Event will be triggered after Color Picker completes its closing animation */
    'colorpicker:closed' : () => void
  }

  interface AppMethods {
    colorPicker: {
      /** create ColorPicker instance */
      create(parameters : Parameters) : ColorPicker

      /** destroy ColorPicker instance */
      destroy(el : HTMLElement | CSSSelector | ColorPicker) : void

      /** get ColorPicker instance by HTML element */
      get(el : HTMLElement | CSSSelector) : ColorPicker

      /** closes ColorPicker */
      close(el : HTMLElement | CSSSelector) : ColorPicker
    }
  }
  interface AppParams {
    colorPicker?: Parameters | undefined
  }
  interface AppEvents {
    /** Event will be triggered when color picker initialized */
    colorPickerInit: (colorPicker : ColorPicker) => void
    /** Event will be triggered when Color Picker starts its opening animation. As an argument event handler receives color picker instance */
    colorPickerOpen: (colorPicker : ColorPicker) => void
    /** Event will be triggered after Color Picker completes its opening animation. As an argument event handler receives color picker instance */
    colorPickerOpened: (colorPicker : ColorPicker) => void
    /** Event will be triggered when Color Picker starts its closing animation. As an argument event handler receives color picker instance */
    colorPickerClose: (colorPicker : ColorPicker) => void
    /** Event will be triggered after Color Picker completes its closing animation. As an argument event handler receives color picker instance */
    colorPickerClosed: (colorPicker : ColorPicker) => void
    /** Event will be triggered right before Color Picker instance will be destroyed. As an argument event handler receives color picker instance */
    colorPickerBeforeDestroy: (colorPicker : ColorPicker) => void
  }
}

declare const ColorPickerComponent: Framework7Plugin;

export default ColorPickerComponent;