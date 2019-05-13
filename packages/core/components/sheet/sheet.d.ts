import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Sheet {
  interface Events {
    /** Event will be triggered when Sheet Modal starts its opening animation. As an argument event handler receives sheet instance */
    open: (sheet : Sheet) => void
    /** Event will be triggered when Sheet Modal completes its opening animation. As an argument event handler receives sheet instance */
    opened: (sheet : Sheet) => void
    /** Event will be triggered when Sheet Modal starts its closing animation. As an argument event handler receives sheet instance */
    close: (sheet : Sheet) => void
    /** Event will be triggered after Sheet Modal completes its closing animation. As an argument event handler receives sheet instance */
    closed: (sheet : Sheet) => void
    /** Event will be triggered right before Sheet Modal instance will be destroyed */
    beforeDestroy: (sheet : Sheet) => void
  }
  interface Parameters {
    /** Sheet Modal element. Can be useful if you already have Sheet Modal element in your HTML and want to create new instance using this element. */
    el?: HTMLElement | CSSSelector
    /** Full Sheet Modal HTML layout string. Can be useful if you want to create Sheet Modal element dynamically. */
    content?: string
    /** Enables Sheet Modal backdrop (dark semi transparent layer behind). (default true) */
    backdrop?: boolean
    /** HTML element or string (with CSS selector) of element. If specified, then sheet will try to scroll page content to this element on open */
    scrollToEl?: HTMLElement | CSSSelector
    /** When enabled, Sheet Modal will be closed on backdrop click. (default true) */
    closeByBackdropClick?: boolean
    /** When enabled, sheet will be closed on when click outside of it */
    closeByOutsideClick?: boolean
    /** Whether the Sheet Modal should be opened/closed with animation or not. Can be overwritten in .open() and .close() methods. (default true) */
    animate?: boolean
    /** When enabled it will be possible to close sheet with swipe, can be false or true (default false) */
    swipeToClose?: boolean
    /** When enabled it will be possible to split opened sheet into two states: partially opened and fully opened that can be controlled with swipe (default false) */
    swipeToStep?: boolean
    /** When enabled it will be possible to close sheet with swipe only on specified handler element (default null) */
    swipeHandler?: HTMLElement | CSSSelector

    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]? : Events[event]
    }
  }
  interface Sheet extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app : Framework7
    /** Sheet Modal HTML element */
    el : HTMLElement
    /** Dom7 instance with Sheet Modal HTML element */
    $el : Dom7Instance
    /** Backdrop HTML element */
    backdropEl : HTMLElement
    /** Dom7 instance with backdrop HTML element */
    $backdropEl: Dom7Instance
    /** sheet parameters */
    params : Parameters
    /** Boolean prop indicating whether sheet is opened or not */
    opened : boolean

    /** Open sheet. */
    open(animate?: boolean) : Sheet
    /** Close sheet. */
    close(animate?: boolean) : Sheet
    /** Destroy sheet */
    destroy() : void
  }
  interface DomEvents {
    /** Event will be triggered when Sheet Modal starts its opening animation */
    'sheet:open' : () => void
    /** Event will be triggered after Sheet Modal completes its opening animation */
    'sheet:opened' : () => void
    /** Event will be triggered when Sheet Modal starts its closing animation */
    'sheet:close' : () => void
    /** Event will be triggered after Sheet Modal completes its closing animation */
    'sheet:closed' : () => void
  }

  interface AppMethods {
    sheet: {
      /** create Sheet Modal instance */
      create(parameters : Parameters) : Sheet
      /** destroy Sheet Modal instance */
      destroy(el : HTMLElement | CSSSelector | Sheet) : void
      /** get Sheet Modal instance by HTML element */
      get(el? : HTMLElement | CSSSelector) : Sheet
      /** open Sheet Modal */
      open(el? : HTMLElement | CSSSelector, animate?: boolean) : Sheet
      /** closes Sheet Modal */
      close(el? : HTMLElement | CSSSelector, animate?: boolean) : Sheet
    }
  }
  interface AppParams {
    sheet?: Parameters | undefined
  }
  interface AppEvents {
    /** Event will be triggered when Sheet Modal starts its opening animation. As an argument event handler receives sheet instance */
    sheetOpen: (sheet : Sheet) => void
    /** Event will be triggered when Sheet Modal completes its opening animation. As an argument event handler receives sheet instance */
    sheetOpened: (sheet : Sheet) => void
    /** Event will be triggered when Sheet Modal starts its closing animation. As an argument event handler receives sheet instance */
    sheetClose: (sheet : Sheet) => void
    /** Event will be triggered after Sheet Modal completes its closing animation. As an argument event handler receives sheet instance */
    sheetClosed: (sheet : Sheet) => void
    /** Event will be triggered right before Sheet Modal instance will be destroyed */
    sheetBeforeDestroy: (sheet : Sheet) => void
  }
}
declare const SheetComponent: Framework7Plugin;
export default SheetComponent;