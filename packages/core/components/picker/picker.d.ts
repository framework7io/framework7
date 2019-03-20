import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';
import { View } from '../view/view';

export namespace Picker {
  interface Picker extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app : Framework7
    /** Picker wrapping container HTML element (when inline picker is in use) */
    containerEl : HTMLElement
    /** Dom7 instance with picker wrapping container HTML element (when inline picker is in use) */
    $containerEl : Dom7Instance
    /** Picker HTML element */
    el : HTMLElement
    /** Dom7 instance with picker HTML element */
    $el : Dom7Instance
    /** Picker input HTML element (passed in inputEl parameter) */
    inputEl : HTMLElement
    /** Dom7 instance with picker input HTML element (passed in inputEl parameter) */
    $inputEl : Dom7Instance
    /** Array where each item represents current selected value for each column */
    value : unknown
    /** Array with specified Picker columns. Each column also has its own methods and properties (look below) */
    cols : Column[]
    /** true if Picker is currently opened */
    opened : boolean
    /** true when inline picker is in use */
    inline : boolean
    /** Picker URL (that was passed in url parameter) */
    url: string
    /** Picker View (that was passed in view parameter) or found parent view */
    view : View.View
    /** Object with initialization parameters */
    params : Parameters

    /** Set new picker value. values is array where each item represents value for each column. duration - transition duration in ms */
    setValue(values : unknown[], duration : number) : void
    /** Returns current picker value */
    getValue() : unknown
    /** Adds value to the values array. Useful in case if multiple selection is enabled (with multiple: true parameter) */
    addValue() : void
    /** Open Picker */
    open() : void
    /** Close Picker */
    close() : void
    /** Destroy Picker instance and remove all events */
    destroy() : void
  }

  interface Column {
    /** Column HTML element */
    el : HTMLElement
    /** Dom7 instance with column HTML container */
    $el : Dom7Instance
    /** Dom7 instance with column items HTML elements */
    items : HTMLElement[]
    /** Currently selected column value */
    value: unknown
    /** Currently selected column display value */
    displayValue: string
    /** Index number of currently selected/active item */
    activeIndex: number

    /** Set new value for current column. value is a new value, duration - transition duration in ms */
    setValue(value : unknown, duration: number) : void
    /** Replace column values and displayValues with new ones */
    replaceValues(values : unknown[], displayValues : unknown[]) : void
  }

  interface ColumnParameters {
    /** Array with string columns values. */
    values?: string[]
    /** Array with string columns values that will be displayed in Picker. If not specified, it will display values from values parameter. */
    displayValues?: string[]
    /** Additional CSS class name to be set on column HTML container. */
    cssClass?: string
    /** Text alignment of column values, could be "left", "center" or "right". */
    textAlign?: string
    /** Column width in px. Useful if you need to fix column widths in picker with dependent columns. By default, calculated automatically. */
    width?: number
    /** Defines column that should be used as a visual divider, that doesn't have any values. (default false) */
    divider?: boolean
    /** Should be specified for divider-column (divider:true) with content of the column. */
    content?: string
    /** Callback function that will be executed when picker value changed. */
    onChange?: (picker : Picker, value : string, displayValue : string) => void
  }

  interface Parameters {
    /** Enables 3D rotate effect. (default false) */
    rotateEffect?: boolean
    /** Larger values produces more momentum when you release picker after fast touch and move. (default 7) */
    momentumRatio?: number
    /** Updates picker and input values during momentum. (default false) */
    updateValuesOnMomentum?: boolean
    /** Updates picker and input values during touch move. (default true) */
    updateValuesOnTouchmove?: boolean
    /** Updates picker and input values during mousewheel scrolling. (default true) */
    updateValuesOnMousewheel?: boolean
    /** Allow to scroll through picker with mousewheel (default true) */
    mousewheel?: boolean
    /** Disables snapping on values. (default false) */
    freeMode?: boolean
    /** Array with initial values. Each array item represents value of related column. */
    value?: unknown[]
    /** Function to format input value, should return new/formatted string value. values and displayValues are arrays where each item represents value/display value of related column. */
    formatValue?: (values : unknown[], displayValues : unknown[]) => string
    /** Array with columns. Each array item represents object with column parameters. */
    cols?: ColumnParameters[]

    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]? : Events[event]
    }

    /** String with CSS selector or HTMLElement where to place generated Picker HTML. Use only for inline picker. */
    containerEl?: HTMLElement | CSSSelector
    /** Can be auto, popover (to open picker in popover), sheet (to open in sheet modal). In case of auto will open in sheet modal on small screens and in popover on large screens.. (default auto) */
    openIn?: string
    /** String with CSS selector or HTMLElement with related input element. */
    inputEl?: HTMLElement | CSSSelector
    /** Scroll viewport (page-content) to input when picker opened. (default true) */
    scrollToInput?: boolean
    /** Sets "readonly" attribute on specified input. (default true) */
    inputReadOnly?: boolean
    /** Additional CSS class name to be set on picker element. */
    cssClass?: string
    /** If enabled, picker will be closed by clicking outside of picker or related input element. (default true) */
    closeByOutsideClick?: boolean
    /** Enables picker toolbar. (default true) */
    toolbar?: boolean
    /** Text for Done/Close toolbar button. (default Done) */
    toolbarCloseText?: string
    /** Will add opened picker to router history which gives ability to close picker by going back in router history and set current route to the picker modal. (default true) */
    routableModals?: boolean
    /** Picker modal URL that will be set as a current route. (default select/) */
    url?: string
    /** View where to set routing when routableModals enabled. Defaults to parent view of inputEl or main view if not found parent view. */
    view?: object

    /** Function to render toolbar. Must return toolbar HTML string. */
    renderToolbar?: () => string
    /** Function to render whole picker. Must return picker full HTML string. */
    render?: () => string
  }

  interface Events {
    /** Event will be triggered when picker value changes */
    change: (picker : Picker, value : unknown, displayValue : unknown) => void
    /** Event will be triggered when picker initialized */
    init: (picker : Picker) => void
    /** Event will be triggered when Picker starts its opening animation. As an argument event handler receives picker instance */
    open: (picker : Picker) => void
    /** Event will be triggered when Picker completes its opening animation. As an argument event handler receives picker instance */
    opened: (picker : Picker) => void
    /** Event will be triggered when Picker starts its closing animation. As an argument event handler receives picker instance */
    close: (picker : Picker) => void
    /** Event will be triggered after Picker completes its closing animation. As an argument event handler receives picker instance */
    closed: (picker : Picker) => void
    /** Event will be triggered right before Picker instance will be destroyed */
    beforeDestroy: (picker : Picker) => void
  }

  interface DomEvents {
    /** Event will be triggered when Picker starts its opening animation */
    'picker:open' : () => void
    /** Event will be triggered after Picker completes its opening animation */
    'picker:opened' : () => void
    /** Event will be triggered when Picker starts its closing animation */
    'picker:close' : () => void
    /** Event will be triggered after Picker completes its closing animation */
    'picker:closed' : () => void
  }

  interface AppMethods {
    picker: {
      /** create Picker instance */
      create(parameters : Parameters) : Picker
      /** destroy Picker instance */
      destroy(el : HTMLElement | CSSSelector | Picker) : void
      /** get Picker instance by HTML element */
      get(el : HTMLElement | CSSSelector) : Picker
      /** closes Picker */
      close(el : HTMLElement | CSSSelector) : Picker
    }
  }
  interface AppParams {
    picker?: Parameters | undefined
  }
  interface AppEvents {
    /** Event will be triggered when picker value changes */
    pickerChange: (picker : Picker, value : unknown, displayValue : unknown) => void
    /** Event will be triggered when picker initialized */
    pickerInit: (picker : Picker) => void
    /** Event will be triggered when Picker starts its opening animation. As an argument event handler receives picker instance */
    pickerOpen: (picker : Picker) => void
    /** Event will be triggered when Picker completes its opening animation. As an argument event handler receives picker instance */
    pickerOpened: (picker : Picker) => void
    /** Event will be triggered when Picker starts its closing animation. As an argument event handler receives picker instance */
    pickerClose: (picker : Picker) => void
    /** Event will be triggered after Picker completes its closing animation. As an argument event handler receives picker instance */
    pickerClosed: (picker : Picker) => void
    /** Event will be triggered right before Picker instance will be destroyed */
    pickerBeforeDestroy: (picker : Picker) => void
  }
}

declare const PickerComponent: Framework7Plugin;

export default PickerComponent;