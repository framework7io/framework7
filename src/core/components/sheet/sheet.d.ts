import { Dom7Array } from 'dom7';
import Framework7, {
  CSSSelector,
  Framework7EventsClass,
  Framework7Plugin,
} from '../app/app-class.js';

export namespace Sheet {
  interface Events {
    /** Event will be triggered on Sheet swipe step open/expand */
    stepOpen: (sheet: Sheet) => void;
    /** Event will be triggered on Sheet swipe step close/collapse */
    stepClose: (sheet: Sheet) => void;
    /** Event will be triggered on Sheet swipe step between step opened and closed state. As `progress` it receives step open progress number (from 0 to 1) */
    stepProgress: (sheet: Sheet, progress: number) => void;
    /** Event will be triggered when Sheet Modal starts its opening animation. As an argument event handler receives sheet instance */
    open: (sheet: Sheet) => void;
    /** Event will be triggered when Sheet Modal completes its opening animation. As an argument event handler receives sheet instance */
    opened: (sheet: Sheet) => void;
    /** Event will be triggered when Sheet Modal starts its closing animation. As an argument event handler receives sheet instance */
    close: (sheet: Sheet) => void;
    /** Event will be triggered after Sheet Modal completes its closing animation. As an argument event handler receives sheet instance */
    closed: (sheet: Sheet) => void;
    /** Event will be triggered right before Sheet Modal instance will be destroyed */
    beforeDestroy: (sheet: Sheet) => void;
  }
  interface Parameters {
    /** Sheet Modal element. Can be useful if you already have Sheet Modal element in your HTML and want to create new instance using this element. */
    el?: HTMLElement | CSSSelector;
    /** Full Sheet Modal HTML layout string. Can be useful if you want to create Sheet Modal element dynamically. */
    content?: string;
    /** Enables Sheet Modal backdrop (dark semi transparent layer behind). (default true) */
    backdrop?: boolean;
    /** Backdrop element to share across instances */
    backdropEl?: HTMLElement | CSSSelector;
    /** If enabled it creates unique backdrop element exclusively for this modal (default false) */
    backdropUnique?: boolean;
    /** HTML element or string (with CSS selector) of element. If specified, then sheet will try to scroll page content to this element on open */
    scrollToEl?: HTMLElement | CSSSelector;
    /** When enabled, Sheet Modal will be closed on backdrop click. (default true) */
    closeByBackdropClick?: boolean;
    /** When enabled, sheet will be closed on when click outside of it */
    closeByOutsideClick?: boolean;
    /** When enabled, sheet will be closed on ESC keyboard key press (default false) */
    closeOnEscape?: boolean;
    /** Whether the Sheet Modal should be opened/closed with animation or not. Can be overwritten in .open() and .close() methods. (default true) */
    animate?: boolean;
    /** When enabled it will be possible to close sheet with swipe, can be false or true (default false) */
    swipeToClose?: boolean;
    /** When enabled it will be possible to split opened sheet into two states: partially opened and fully opened that can be controlled with swipe (default false) */
    swipeToStep?: boolean;
    /** When enabled it will be possible to close sheet with swipe only on specified handler element (default null) */
    swipeHandler?: HTMLElement | CSSSelector;
    /** When enabled it will push view behind on open. Works only when top safe area is in place. It can also be enabled by adding `sheet-modal-push` class to Sheet element. (default false) */
    push?: boolean;
    /** Element to mount modal to. (default app.el) */
    containerEl?: HTMLElement | CSSSelector;

    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]?: Events[event];
    };
  }
  interface Sheet extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app: Framework7;
    /** Sheet Modal HTML element */
    el: HTMLElement;
    /** Dom7 instance with Sheet Modal HTML element */
    $el: Dom7Array;
    /** Backdrop HTML element */
    backdropEl: HTMLElement;
    /** Dom7 instance with backdrop HTML element */
    $backdropEl: Dom7Array;
    /** sheet parameters */
    params: Parameters;
    /** Boolean prop indicating whether sheet is opened or not */
    opened: boolean;

    /** Open sheet. */
    open(animate?: boolean): Sheet;
    /** Close sheet. */
    close(animate?: boolean): Sheet;
    /** Open/expand sheet swipe step */
    stepOpen(): void;
    /** Close/collapse sheet swipe step */
    stepClose(): void;
    /** Toggle (open or close) sheet swipe step */
    stepToggle(): void;
    /** Update step position. Required to call after content of sheet modal has been modified manually when it is opened */
    setSwipeStep(): void;
    /** Destroy sheet */
    destroy(): void;
  }
  interface DomEvents {
    /** Event will be triggered when Sheet Modal starts its opening animation */
    'sheet:open': () => void;
    /** Event will be triggered after Sheet Modal completes its opening animation */
    'sheet:opened': () => void;
    /** Event will be triggered when Sheet Modal starts its closing animation */
    'sheet:close': () => void;
    /** Event will be triggered after Sheet Modal completes its closing animation */
    'sheet:closed': () => void;
    /** Event will be triggered on Sheet swipe step open/expand */
    'sheet:stepopen': () => void;
    /** Event will be triggered on Sheet swipe step close/collapse */
    'sheet:stepclose': () => void;
    /** Event will be triggered on Sheet swipe step between step opened and closed state. As `event.detail` it receives step open progress number (from 0 to 1) */
    'sheet:stepprogress': () => void;
  }

  interface AppMethods {
    sheet: {
      /** create Sheet Modal instance */
      create(parameters: Parameters): Sheet;
      /** destroy Sheet Modal instance */
      destroy(el: HTMLElement | CSSSelector | Sheet): void;
      /** get Sheet Modal instance by HTML element */
      get(el?: HTMLElement | CSSSelector): Sheet;
      /** open Sheet Modal */
      open(el?: HTMLElement | CSSSelector, animate?: boolean): Sheet;
      /** closes Sheet Modal */
      close(el?: HTMLElement | CSSSelector, animate?: boolean): Sheet;
      /** open/expand Sheet swipe step */
      stepOpen(el?: HTMLElement | CSSSelector): Sheet;
      /** close/collapse Sheet swipe step */
      stepClose(el?: HTMLElement | CSSSelector): Sheet;
      /** toggle (open or close) Sheet swipe step */
      stepToggle(el?: HTMLElement | CSSSelector): Sheet;
    };
  }
  interface AppParams {
    sheet?: Parameters | undefined;
  }
  interface AppEvents {
    /** Event will be triggered on Sheet swipe step open/expand */
    sheetStepOpen: (sheet: Sheet) => void;
    /** Event will be triggered on Sheet swipe step close/collapse */
    sheetStepClose: (sheet: Sheet) => void;
    /** Event will be triggered on Sheet swipe step between step opened and closed state. As `progress` it receives step open progress number (from 0 to 1) */
    sheetStepProgress: (sheet: Sheet, progress: number) => void;
    /** Event will be triggered when Sheet Modal starts its opening animation. As an argument event handler receives sheet instance */
    sheetOpen: (sheet: Sheet) => void;
    /** Event will be triggered when Sheet Modal completes its opening animation. As an argument event handler receives sheet instance */
    sheetOpened: (sheet: Sheet) => void;
    /** Event will be triggered when Sheet Modal starts its closing animation. As an argument event handler receives sheet instance */
    sheetClose: (sheet: Sheet) => void;
    /** Event will be triggered after Sheet Modal completes its closing animation. As an argument event handler receives sheet instance */
    sheetClosed: (sheet: Sheet) => void;
    /** Event will be triggered right before Sheet Modal instance will be destroyed */
    sheetBeforeDestroy: (sheet: Sheet) => void;
  }
}
declare const SheetComponent: Framework7Plugin;
export default SheetComponent;
