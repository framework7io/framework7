import { Dom7Array } from 'dom7';
import Framework7, {
  CSSSelector,
  Framework7EventsClass,
  Framework7Plugin,
} from '../app/app-class.js';

export namespace Popover {
  interface Events {
    /** Event will be triggered when Popover starts its opening animation. As an argument event handler receives popover instance */
    open: (popover: Popover) => void;
    /** Event will be triggered when Popover completes its opening animation. As an argument event handler receives popover instance */
    opened: (popover: Popover) => void;
    /** Event will be triggered when Popover starts its closing animation. As an argument event handler receives popover instance */
    close: (popover: Popover) => void;
    /** Event will be triggered after Popover completes its closing animation. As an argument event handler receives popover instance */
    closed: (popover: Popover) => void;
    /** Event will be triggered right before Popover instance will be destroyed */
    beforeDestroy: (popover: Popover) => void;
  }
  interface Parameters {
    /** Popover element. Can be useful if you already have Popover element in your HTML and want to create new instance using this element. */
    el?: HTMLElement | CSSSelector;
    /** Full Popover HTML layout string. Can be useful if you want to create Popover element dynamically. */
    content?: string;
    /** Enables Popover backdrop (dark semi transparent layer behind). (default true) */
    backdrop?: boolean;
    /** Backdrop element to share across instances */
    backdropEl?: HTMLElement | CSSSelector;
    /** If enabled it creates unique backdrop element exclusively for this modal (default false) */
    backdropUnique?: boolean;
    /** When enabled, popover will be closed on backdrop click. (default true) */
    closeByBackdropClick?: boolean;
    /** When enabled, popover will be closed on when click outside of it (default true) */
    closeByOutsideClick?: boolean;
    /** When enabled, popover will be closed on ESC keyboard key press (default false) */
    closeOnEscape?: boolean;
    /** Whether the Popover should be opened/closed with animation or not. Can be overwritten in .open() and .close() methods. (default true) */
    animate?: boolean;
    /** HTML element or string CSS selector of target element */
    targetEl?: HTMLElement | CSSSelector;
    /** Virtual target element horizontal offset from left side of the screen. Required without using real target element (targetEl) */
    targetX?: number;
    /** Virtual target element vertical offset from top of the screen. Required without using real target element (targetEl) */
    targetY?: number;
    /** Virtual target element width (in px). Required without using real target element (targetEl) (default 0) */
    targetWidth?: number;
    /** Virtual target element height (in px). Required without using real target element (targetEl) (default 0) */
    targetHeight?: number;
    /** Element to mount modal to. (default app.el) */
    containerEl?: HTMLElement | CSSSelector;
    /** Force popover vertical position, can be 'auto', 'top' or 'bottom' (default 'auto')  */
    verticalPosition?: string;
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]?: Events[event];
    };
  }
  interface Popover extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app: Framework7;
    /** Popover HTML element */
    el: HTMLElement;
    /** Dom7 instance with popover HTML element */
    $el: Dom7Array;
    /** Backdrop HTML element */
    backdropEl: HTMLElement;
    /** Dom7 instance with backdrop HTML element */
    $backdropEl: Dom7Array;
    /** Popover target HTML element */
    targetEl: HTMLElement;
    /** Dom7 instance with popover target HTML element */
    $targetEl: Dom7Array;
    /** Popover parameters */
    params: Parameters;
    /** Boolean prop indicating whether popover is opened or not */
    opened: boolean;

    /** Open popover. */
    open(targetEl: HTMLElement | CSSSelector, animate?: boolean): Popover;
    open(animate?: boolean): Popover;
    /** Close popover. */
    close(animate?: boolean): Popover;
    /** Destroy popover */
    destroy(): void;
  }
  interface DomEvents {
    /** Event will be triggered when Popover starts its opening animation */
    'popover:open': () => void;
    /** Event will be triggered after Popover completes its opening animation */
    'popover:opened': () => void;
    /** Event will be triggered when Popover starts its closing animation */
    'popover:close': () => void;
    /** Event will be triggered after Popover completes its closing animation */
    'popover:closed': () => void;
  }

  interface AppMethods {
    popover: {
      /** create Popover instance */
      create(parameters: Parameters): Popover;
      /** destroy Popover instance */
      destroy(el: HTMLElement | CSSSelector | Popover): void;
      /** get Popover instance by HTML element */
      get(el?: HTMLElement | CSSSelector): Popover;
      /** open Popover */
      open(
        el?: HTMLElement | CSSSelector,
        targetEl?: HTMLElement | CSSSelector,
        animate?: boolean,
      ): Popover;
      /** closes Popover */
      close(el?: HTMLElement | CSSSelector, animate?: boolean): Popover;
    };
  }
  interface AppParams {
    popover?: Parameters | undefined;
  }
  interface AppEvents {
    /** Event will be triggered when Popover starts its opening animation. As an argument event handler receives popover instance */
    popoverOpen: (popover: Popover) => void;
    /** Event will be triggered when Popover completes its opening animation. As an argument event handler receives popover instance */
    popoverOpened: (popover: Popover) => void;
    /** Event will be triggered when Popover starts its closing animation. As an argument event handler receives popover instance */
    popoverClose: (popover: Popover) => void;
    /** Event will be triggered after Popover completes its closing animation. As an argument event handler receives popover instance */
    popoverClosed: (popover: Popover) => void;
    /** Event will be triggered right before Popover instance will be destroyed */
    popoverBeforeDestroy: (popover: Popover) => void;
  }
}

declare const PopoverComponent: Framework7Plugin;

export default PopoverComponent;
