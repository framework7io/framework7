import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';
import { View } from '../view/view';

export namespace ColorPicker {
  interface ColorPickerValue {
    hex?: string
    alpha?: number
    hue?: number
    rgb?: number[]
    hsl?: number[]
    hsb?: number[]
    rgba?: number[]
    hsla?: number[]
  }

  interface ColorPicker extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app : Framework7
    /** Color Picker wrapping container HTML element (when inline Color Picker is in use) */
    containerEl : HTMLElement
    /** Dom7 instance with Color Picker wrapping container HTML element (when inline Color Picker is in use) */
    $containerEl : Dom7Instance
    /** Color Picker HTML element */
    el : HTMLElement
    /** Dom7 instance with Color Picker HTML element */
    $el : Dom7Instance
    /** Color Picker input HTML element (passed in inputEl parameter) */
    inputEl : HTMLElement
    /** Dom7 instance with Color Picker input HTML element (passed in inputEl parameter) */
    $inputEl : Dom7Instance
    /** Color Picker target HTML element (passed in targetEl parameter) */
    targetEl : HTMLElement
    /** Dom7 instance with Color Picker target HTML element (passed in targetEl parameter) */
    $targetEl : Dom7Instance
    /** Object with value */
    value : ColorPickerValue
    /** true if Color Picker is currently opened */
    opened : boolean
    /** true when inline Color Picker is in use */
    inline : boolean
    /** Color Picker URL (that was passed in url parameter) */
    url: string
    /** Color Picker View (that was passed in view parameter) or found parent view */
    view : View.View
    /** Object with initialization parameters */
    params : Parameters


    /** Set new color. Value is the Color Picker Value object */
    setValue(value : ColorPickerValue) : void
    /** Returns current Color Picker value */
    getValue() : ColorPickerValue
    /** Open Color Picker */
    open() : void
    /** Close Color Picker */
    close() : void
    /** Destroy Color Picker instance and remove all events */
    destroy() : void
  }


  interface Parameters {
    /** Object with Color Picker value */
    value?: ColorPickerValue
    /** Function to format input value, should return new/formatted string value. */
    formatValue?: (value : ColorPickerValue) => string
    /** Array with Color Picker modules */
    modules?: string[]
    /** Array with pallette values. Each value is a HEX value string. Or array with palette "rows" where each row is an array with HEX palette value */
    palette?: any[]
    /** Center modules vertically if there is an extra space in color picker container */
    centerModules?: boolean
    /** Add additional highlighting to sliders and HEX modules (default false) */
    groupedModules?: boolean
    /** Enables sliders' labels (default false) */
    sliderLabel?: boolean
    /** Enables sliders' values (default false) */
    sliderValue?: boolean
    /** Makes sliders' values editable (by using input) (default false) */
    sliderValueEdiable?: boolean
    /** Enables bars' labels (default false) */
    barLabel?: boolean
    /** Enables bars' values (default false) */
    barValue?: boolean
    /** Makes bars' values editable (by using input) (default false) */
    barValueEdiable?: boolean
    /** Enables text label for HEX module */
    hexLabel?: boolean
    /** Makes HEX value editable (by using input) (default false) */
    hexValueEditable?: boolean
    /** Label text for Red slider/bar (default R) */
    redLabelText?: string
    /** Label text for Green slider/bar (default G) */
    greenLabelText?: string
    /** Label text for Blue slider/bar (default B) */
    blueLabelText?: string
    /** Label text for Hue slider (default H) */
    hueLabelText?: string
    /** Label text for Saturation slider (default S) */
    saturationLabelText?: string
    /** Label text for Brightness slider (default B) */
    brightnessLabelText?: string
    /** Label text for HEX module (default HEX) */
    hexLabelText?: string
    /** Label text for Alpha slider (default A) */
    alphaLabelText?: string
    /** String with CSS selector or HTMLElement where to place generated Color Picker HTML. Use only for inline Color Picker. */
    containerEl?: HTMLElement | CSSSelector
    /** Can be "auto", "popover" (to open Color Picker in popover), "sheet" (to open in sheet modal) or "popup" (to open in popup) or "page" (to open in page). In case of auto will open in modal specified in openInPhone parameter on small screens and in popover on large screens. (default popover) */
    openIn?: string
    /** Enables Color Picker popup to push view/s behind on open (default false) */
    popupPush?: boolean
    /** Enables ability to close Color Picker popup with swipe (default undefined) */
    popupSwipeToClose?: boolean | undefined
    /** Enables Color Picker sheet to push view/s behind on open (default false) */
    sheetPush?: boolean
    /** Enables ability to close Color Picker sheet with swipe (default undefined) */
    sheetSwipeToClose?: boolean | undefined
    /** Defines in what type of modal Color Picker will be opened on phone (small screen size) when openIn is set to auto (default popup) */
    openInPhone?: string
    /** String with CSS selector or HTMLElement with related input element. */
    inputEl?: HTMLElement | CSSSelector
    /** String with CSS selector or HTMLElement with related target element. Popover will be opened around this element */
    targetEl?: HTMLElement | CSSSelector
    /** When enabled it will set background color on targetEl (if passed) */
    targetElSetBackgroundColor: boolean
    /** Scroll viewport (page-content) to input when Color Picker opened. (default true) */
    scrollToInput?: boolean
    /** Sets "readonly" attribute on specified input. (default true) */
    inputReadOnly?: boolean
    /** Additional CSS class name to be set on Color Picker element. */
    cssClass?: string
    /** If enabled, picker will be closed by clicking outside of picker or related input element. (default true) */
    closeByOutsideClick?: boolean
    /** Enables Color Picker toolbar when opened in Sheet modal. (default true) */
    toolbarSheet?: boolean
    /** Enables Color Picker toolbar when opened in Popover. (default false) */
    toolbarPopover?: boolean
    /** Text for Done/Close toolbar button. (default Done) */
    toolbarCloseText?: string
    /** Enables Color Picker navbar when opened in Popup. (default true) */
    navbarPopup?: boolean
    /** Text for Done/Close navbar button. (default Done) */
    navbarCloseText: string,
    /** Navbar title text. (default Color) */
    navbarTitleText: string,
    /** Navbar's back link text (when opened in page). (default Back) */
    navbarBackLinkText: string,
    /** Will add opened Color Picker to router history which gives ability to close Color Picker by going back in router history and set current route to the Color Picker modal. (default true) */
    routableModals?: boolean
    /** Color Picker modal URL that will be set as a current route. (default color/) */
    url?: string
    /** View where to set routing when routableModals enabled. Defaults to parent view of inputEl or main view if not found parent view. */
    view?: View.View

    /** Function to render toolbar. Must return toolbar HTML string. */
    renderToolbar?: () => string
    /** Function to render navbar. Must return navbar HTML string. */
    renderNavbar?: () => string
    /** Function to render whole Color Picker. Must return Color Picker full HTML string. */
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
    /** Event will be triggered when Color Picker initialized */
    colorPickerInit: (colorPicker : ColorPicker) => void
    /** Event will be triggered when Color Picker starts its opening animation. As an argument event handler receives Color Picker instance */
    colorPickerOpen: (colorPicker : ColorPicker) => void
    /** Event will be triggered after Color Picker completes its opening animation. As an argument event handler receives Color Picker instance */
    colorPickerOpened: (colorPicker : ColorPicker) => void
    /** Event will be triggered when Color Picker starts its closing animation. As an argument event handler receives Color Picker instance */
    colorPickerClose: (colorPicker : ColorPicker) => void
    /** Event will be triggered after Color Picker completes its closing animation. As an argument event handler receives Color Picker instance */
    colorPickerClosed: (colorPicker : ColorPicker) => void
    /** Event will be triggered right before Color Picker instance will be destroyed. As an argument event handler receives Color Picker instance */
    colorPickerBeforeDestroy: (colorPicker : ColorPicker) => void
  }
}

declare const ColorPickerComponent: Framework7Plugin;

export default ColorPickerComponent;
