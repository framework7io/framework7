import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Toast {
  interface Events {
    /** Event will be triggered when user clicks on Toast close button. As an argument event handler receives toast instance */
    closeButtonClick: (toast: Toast) => void
    /** Event will be triggered when Toast starts its opening animation. As an argument event handler receives toast instance */
    open: (toast : Toast) => void
    /** Event will be triggered when Toast completes its opening animation. As an argument event handler receives toast instance */
    opened: (toast : Toast) => void
    /** Event will be triggered when Toast starts its closing animation. As an argument event handler receives toast instance */
    close: (toast : Toast) => void
    /** Event will be triggered after Toast completes its closing animation. As an argument event handler receives toast instance */
    closed: (toast : Toast) => void
    /** Event will be triggered right before Toast instance will be destroyed */
    beforeDestroy: (toast : Toast) => void
  }
  interface Parameters {
    /** Toast element. Can be useful if you already have Toast element in your HTML and want to create new instance using this element. */
    el?: HTMLElement | CSSSelector
    /** Toast icon HTML layout, e.g. <i class="f7-icons">home</i> or image <img src="path/to/icon.png"> */
    icon?: string
    /** Toast inner text */
    text?: string
    /** Toast position. Can be bottom, center or top (default bottom) */
    position?: 'top' | 'center' | 'bottom'
    /** Toast horizontal alignment on wide screen. Has effects only on top and bottom toasts. (default left) */
    horizontalPosition?: 'left' | 'center' | 'right'
    /** Adds toast close button (default false) */
    closeButton?: boolean
    /** One of the default color themes */
    closeButtonColor?: string
    /** Close button text (default Ok) */
    closeButtonText?: string
    /** Timeout delay (in ms) to close toast automatically  */
    closeTimeout?: number
    /** Additional css class to add */
    cssClass?: string
    /** Destroys toast instance on close (default false) */
    destroyOnClose?: boolean
    /** Custom function to render Toast. Must return toast html */
    render?: () => string

    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]? : Events[event]
    }
  }
  interface Toast extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app : Framework7
    /** Toast HTML element */
    el : HTMLElement
    /** Dom7 instance with toast HTML element */
    $el : Dom7Instance
    /** Toast parameters */
    params : Parameters

    /** Open toast */
    open() : Toast
    /** Close toast */
    close() : Toast
    /** Destroy toast */
    destroy() : void
  }
  interface DomEvents {
    /** Event will be triggered when Toast starts its opening animation */
    'toast:open' : () => void
    /** Event will be triggered after Toast completes its opening animation */
    'toast:opened' : () => void
    /** Event will be triggered when Toast starts its closing animation */
    'toast:close' : () => void
    /** Event will be triggered after Toast completes its closing animation */
    'toast:closed' : () => void
  }

  interface AppMethods {
    toast: {
      /** create Toast instance */
      create(parameters : Parameters) : Toast
      /** destroy Toast instance */
      destroy(el : HTMLElement | CSSSelector | Toast) : void
      /** get Toast instance by HTML element */
      get(el : HTMLElement | CSSSelector) : Toast
      /** open Toast */
      open(el : HTMLElement | CSSSelector, animate?: boolean) : Toast
      /** closes Toast */
      close(el : HTMLElement | CSSSelector, animate?: boolean) : Toast
      /** create Toast instance and show immediately */
      show(parameters: Parameters): Toast
    }
  }
  interface AppParams {
    toast?: Parameters | undefined
  }
  interface AppEvents {
    /** Event will be triggered when user clicks on Toast close button. As an argument event handler receives toast instance */
    toastCloseButtonClick: (toast: Toast) => void
    /** Event will be triggered when Toast starts its opening animation. As an argument event handler receives toast instance */
    toastOpen: (toast : Toast) => void
    /** Event will be triggered when Toast completes its opening animation. As an argument event handler receives toast instance */
    toastOpened: (toast : Toast) => void
    /** Event will be triggered when Toast starts its closing animation. As an argument event handler receives toast instance */
    toastClose: (toast : Toast) => void
    /** Event will be triggered after Toast completes its closing animation. As an argument event handler receives toast instance */
    toastClosed: (toast : Toast) => void
    /** Event will be triggered right before Toast instance will be destroyed */
    toastBeforeDestroy: (toast : Toast) => void
  }
}

declare const ToastComponent: Framework7Plugin;

export default ToastComponent;
