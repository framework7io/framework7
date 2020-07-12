import { Dom7Array } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Modal {
  interface Modal extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app: Framework7;
    /** Modal HTML element */
    el: HTMLElement;
    /** Dom7 instance with modal HTML element */
    $el: Dom7Array; // Dom7Array
    /** Backdrop HTML element */
    backdropEl: HTMLElement;
    /** Dom7 instance with backdrop HTML element */
    $backdropEl: Dom7Array; // Dom7Array
    /** Modal parameters */
    params: Parameters;
    /** Boolean prop indicating whether modal is opened or not */
    opened: boolean;

    /** Open modal */
    open(animate: boolean): Modal;
    /** Close modal. */
    close(animate: boolean): Modal;
    /** Destroy modal */
    destroy(): void;
  }
  interface Parameters {
    /** Modal element. Can be useful if you already have Modal element in your HTML and want to create new instance using this element. */
    el: HTMLElement;
    /** Enables Modal backdrop (dark semi transparent layer behind). (default true) */
    backdrop?: boolean;
    /** When enabled, modal will be closed on backdrop click. (default true) */
    closeByBackdropClick?: boolean;
    /** Whether the Modal should be opened/closed with animation or not. Can be overwritten in .open() and .close() methods. (default true) */
    animate?: boolean;
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]?: Events[event];
    };
  }
  interface Events {
    /** Event will be triggered when Custom Modal starts its opening animation. As an argument event handler receives modal instance */
    open: (modal: Modal) => void;
    /** Event will be triggered after Custom Modal completes its opening animation. As an argument event handler receives modal instance */
    opened: (modal: Modal) => void;
    /** Event will be triggered when Custom Modal starts its closing animation. As an argument event handler receives modal instance */
    close: (modal: Modal) => void;
    /** Event will be triggered after Custom Modal completes its closing animation. As an argument event handler receives modal instance */
    closed: (modal: Modal) => void;
    /** Event will be triggered right before Custom Modal instance will be destroyed. As an argument event handler receives modal instance */
    beforeDestroy: (modal: Modal) => void;
  }

  interface AppMethods {
    customModal: {
      /** Creates Custom modal */
      create(parameters: Parameters): Modal;
    };
  }
  interface AppParams {}
  interface AppEvents {
    /** Event will be triggered when Modal starts its opening animation. As an argument event handler receives modal instance */
    customModalOpen: (modal: Modal) => void;
    /** Event will be triggered after Modal completes its opening animation. As an argument event handler receives modal instance */
    customModalOpened: (modal: Modal) => void;
    /** Event will be triggered when Modal starts its closing animation. As an argument event handler receives modal instance */
    customModalClose: (modal: Modal) => void;
    /** Event will be triggered after Modal completes its closing animation. As an argument event handler receives modal instance */
    customModalClosed: (modal: Modal) => void;
    /** Event will be triggered right before Modal instance will be destroyed. As an argument event handler receives modal instance */
    customModalBeforeDestroy: (modal: Modal) => void;
  }
}

declare const ModalComponent: Framework7Plugin;

export default ModalComponent;
