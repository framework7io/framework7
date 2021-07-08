import { Dom7Array } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Actions {
  interface Actions extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app: Framework7;
    /** Action sheet HTML element */
    el: HTMLElement;
    /** Dom7 instance with action sheet HTML element */
    $el: Dom7Array;
    /** Backdrop HTML element */
    backdropEl: HTMLElement;
    /** Dom7 instance with backdrop HTML element */
    $backdropEl: Dom7Array;
    /** Action sheet instance parameters */
    params: Parameters;
    /** Boolean prop indicating whether action sheet is opened or not */
    opened: boolean;

    /** Open action sheet. Where animate - boolean (by default true) - defines whether it should be opened with animation */
    open(animate?: boolean): void;
    /** Close action sheet. Where animate - boolean (by default true) - defines whether it should be closed with animation */
    close(animate?: boolean): void;
    /** Destroy action sheet */
    destroy(): void;
  }

  interface Button {
    /** String with Button's text (could be HTML string) */
    text: string;
    /** HTML string of icon */
    icon?: string;
    /** Enables bold button text */
    bold?: boolean;
    /** Button color, one of default colors */
    color?: string;
    /** Button background color, one of default colors */
    bg?: string;
    /** If enabled then it will be rendered as label instead of button */
    label?: boolean;
    /** Defines whether the button is disabled or not. */
    disabled?: boolean;
    /** If enabled then button click will close Action Sheet */
    close?: boolean;
    /** Callback function that will be executed after click on this button */
    onClick?: (actions: Actions, e: unknown) => void;
  }

  interface Parameters {
    /** Action Sheet element. Can be useful if you already have Action Sheet element in your HTML and want to create new instance using this element*/
    el?: HTMLElement | CSSSelector;
    /** Full Action Sheet HTML content string. Can be useful if you want to create Action Sheet element with custom HTML*/
    content?: string;
    /** Enables Action Sheet backdrop (dark semi transparent layer behind)*/
    backdrop?: boolean;
    /** Backdrop element to share across instances */
    backdropEl?: HTMLElement | CSSSelector;
    /** Custom css class added to Actions Sheet element */
    cssClass?: string;
    /** When enabled, action sheet will be closed on backdrop click*/
    closeByBackdropClick?: boolean;
    /** When enabled, action sheet will be closed on when click outside of it*/
    closeByOutsideClick?: boolean;
    /** When enabled, action sheet will be closed on ESC keyboard key press (default false) */
    closeOnEscape?: boolean;
    /** Whether the Action Sheet should be opened/closed with animation or not. Can be overwritten in .open() and .close() methods*/
    animate?: boolean;
    /** Action sheet groups/buttons. In this case Actions layout will be generated dynamically based on passed groups and buttons. In case of groups it should array where each item represent array with buttons for group.*/
    buttons?: Button[] | Button[][];
    /** Enables grid buttons layout*/
    grid?: boolean;
    /** When enabled, action sheet will be converted to Popover on large screens.*/
    convertToPopover?: boolean;
    /** When enabled, action sheet will be always converted to Popover.*/
    forceToPopover?: boolean;
    /** HTML element or string CSS selector of target element. Required when conversion to popover is in use*/
    targetEl?: HTMLElement | CSSSelector;
    /** Virtual target element horizontal offset from left side of the screen. Required when conversion to popover is in use without using real target element (targetEl)*/
    targetX?: number;
    /** Virtual target element vertical offset from top of the screen. Required when conversion to popover is in use without using real target element (targetEl)*/
    targetY?: number;
    /** Virtual target element width (in px). Required when conversion to popover is in use without using real target element (targetEl)*/
    targetWidth?: number;
    /** Virtual target element height (in px). Required when conversion to popover is in use without using real target element (targetEl)*/
    targetHeight?: number;
    /** Element to mount modal to. (default app.el) */
    containerEl?: HTMLElement | CSSSelector;
    /** Callback function that will be executed after click on the Action Sheet button*/
    onClick?: (actions: Actions, e: unknown) => void;
    /** Custom function to render Action Sheet. Must return Action Sheet html*/
    render?: () => string;
    /** Custom function to render Popover when conversion to popover is in use. Must return Popover html*/
    renderPopover?: () => string;
    /** Object with event handlers */
    on?: {
      [event in keyof Events]?: Events[event];
    };
  }

  interface Events {
    /** Event will be triggered when Action Sheet starts its opening animation. As an argument event handler receives action sheet instance */
    open: (actions: Actions) => void;
    /** Event will be triggered after Action Sheet completes its opening animation. As an argument event handler receives action sheet instance */
    opened: (actions: Actions) => void;
    /** Event will be triggered when Action Sheet starts its closing animation. As an argument event handler receives action sheet instance */
    close: (actions: Actions) => void;
    /** Event will be triggered after Action Sheet completes its closing animation. As an argument event handler receives action sheet instance */
    closed: (actions: Actions) => void;
    /** Event will be triggered right before Action Sheet instance will be destroyed. As an argument event handler receives action sheet instance */
    beforeDestroy: (actions: Actions) => void;
  }

  interface DomEvents {
    /** Event will be triggered when Action Sheet starts its opening animation */
    'actions:open': (actions: Actions) => void;
    /** Event will be triggered after Action Sheet completes its opening animation */
    'actions:opened': (actions: Actions) => void;
    /** Event will be triggered when Action Sheet starts its closing animation */
    'actions:close': (actions: Actions) => void;
    /** Event will be triggered after Action Sheet completes its closing animation */
    'actions:closed': (actions: Actions) => void;
  }

  interface AppMethods {
    actions: {
      /** create Action Sheet instance */
      create(parameters: Parameters): Actions;
      /** destroy Action Sheet instance */
      destroy(el: HTMLElement | CSSSelector | Actions): void;
      /** get Action Sheet instance by HTML element */
      get(el?: HTMLElement | CSSSelector): Actions;
      /** opens Action Sheet */
      open(el?: HTMLElement | CSSSelector, animate?: boolean): Actions;
      /** closes Action Sheet */
      close(el?: HTMLElement | CSSSelector, animate?: boolean): Actions;
    };
  }
  interface AppParams {
    actions?: Parameters | undefined;
  }
  interface AppEvents {
    /** Event will be triggered when Action Sheet starts its opening animation. As an argument event handler receives action sheet instance */
    actionsOpen: (actions: Actions) => void;
    /** Event will be triggered after Action Sheet completes its opening animation. As an argument event handler receives action sheet instance */
    actionsOpened: (actions: Actions) => void;
    /** Event will be triggered when Action Sheet starts its closing animation. As an argument event handler receives action sheet instance */
    actionsClose: (actions: Actions) => void;
    /** Event will be triggered after Action Sheet completes its closing animation. As an argument event handler receives action sheet instance */
    actionsClosed: (actions: Actions) => void;
    /** Event will be triggered right before Action Sheet instance will be destroyed. As an argument event handler receives action sheet instance */
    actionsBeforeDestroy: (actions: Actions) => void;
  }
}

declare const ActionsComponent: Framework7Plugin;

export default ActionsComponent;
