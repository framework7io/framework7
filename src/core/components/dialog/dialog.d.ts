import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Dialog {
  interface Dialog extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app : Framework7
    /** Dialog HTML element */
    el : HTMLElement
    /** Dom7 instance with dialog HTML element */
    $el : Dom7Instance // Dom7Instance
    /** Backdrop HTML element */
    backdropEl : HTMLElement
    /** Dom7 instance with backdrop HTML element */
    $backdropEl : Dom7Instance // Dom7Instance
    /** Dialog parameters */
    params : Parameters
    /** Boolean prop indicating whether dialog is opened or not */
    opened : boolean

    /** Open dialog */
    open(animate?: boolean) : void
    /** Close dialog. */
    close(animate?: boolean) : void
    /** Sets dialog progress when Dialog Progress shortcut in use */
    setProgress(
      /** progressbar progress (from 0 to 100) */
      progress: number,
      /** (in ms) - progressbar progress change duration */
      duration?: number) : void
    /** Sets dialog's title */
    setTitle(title : string) : void
    /** Sets dialog's text */
    setText(text : string) : void
    /** Destroy dialog */
    destroy() : void
  }

  interface Button {
    /** String with Button's text (could be HTML string). */
    text: string
    /** Enables bold button text. (default false) */
    bold?: boolean
    /** Button color, one of default colors. */
    color?: string
    /** If enabled then button click will close Dialog. (default true) */
    close?: boolean
    /** Additional button CSS class. */
    cssClass?: string
    /** Array with keyboard keycodes that will be used to trigger button click. For example, key code 13 means that button click will be triggered on Enter key press. (default []) */
    keyCodes?: number[]
    /** Callback function that will be executed after click on this button. */
    onClick?: (dialog : Dialog, e : Event) => void
  }

  interface Parameters {
    /** Dialog element. Can be useful if you already have Dialog element in your HTML and want to create new instance using this element. */
    el?: HTMLElement
    /** Enables Dialog backdrop (dark semi transparent layer behind). (default true) */
    backdrop?: boolean
    /** When enabled, dialog will be closed on backdrop click. (default true) */
    closeByBackdropClick?: boolean
    /** Whether the Dialog should be opened/closed with animation or not. Can be overwritten in .open() and .close() methods. (default false) */
    animate?: boolean
    /** Dialog title. */
    title?: string
    /** Dialog inner text. */
    text?: string
    /** Custom Dialog content that follows dialog text. */
    content?: string
    /** Array with dialog buttons. (default []) */
    buttons?: Button[]
    /** Enables vertical buttons layout. (default false) */
    verticalButtons?: boolean
    /** When enabled will automatically destroy Dialog on close. (default false) */
    destroyOnClose?: boolean
    /** Callback function that will be executed after click on the Dialog button. As an arguments it received dialog instance and clicked button index number. */
    onClick?: (dialog : Dialog, index : number) => void
    /** Additional css class to add. */
    cssClass?: string
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]? : Events[event]
    }
  }

  interface Events {
    /** Event will be triggered when Dialog starts its opening animation. As an argument event handler receives dialog instance */
    open: (dialog : Dialog) => void
    /** Event will be triggered after Dialog completes its opening animation. As an argument event handler receives dialog instance */
    opened: (dialog : Dialog) => void
    /** Event will be triggered when Dialog starts its closing animation. As an argument event handler receives dialog instance */
    close: (dialog : Dialog) => void
    /** Event will be triggered after Dialog completes its closing animation. As an argument event handler receives dialog instance */
    closed: (dialog : Dialog) => void
    /** Event will be triggered right before Dialog instance will be destroyed. As an argument event handler receives dialog instance */
    beforeDestroy: (dialog : Dialog) => void
  }

  interface DomEvents {
    /** Event will be triggered when Dialog starts its opening animation */
    'dialog:open' : () => void
    /** Event will be triggered after Dialog completes its opening animation */
    'dialog:opened' : () => void
    /** Event will be triggered when Dialog starts its closing animation */
    'dialog:close' : () => void
    /** Event will be triggered after Dialog completes its closing animation */
    'dialog:closed' : () => void
  }

  interface AppMethods {
    dialog: {
      /** create Dialog instance */
      create(parameters : Parameters ) : Dialog;
      /** destroy Dialog instance */
      destroy(el : HTMLElement | CSSSelector | Dialog) : void;
      /** get Dialog instance by HTML element */
      get(el? : HTMLElement | CSSSelector) : Dialog;
      /** opens Dialog */
      open(el? : HTMLElement | CSSSelector, animate? : boolean) : Dialog;
      /** closes Dialog */
      close(el? : HTMLElement | CSSSelector, animate? : boolean) : Dialog;

      /** create Alert Dialog and open it */
      alert(text : string, title : string, callback?: () => void) : Dialog
      /** create Alert Dialog with default title and open it */
      alert(text : string, callback?: () => void) : Dialog

      /** create Confirm Dialog and open it */
      confirm(text : string, title : string, callbackOk?: () => void, callbackCancel?: () => void) : Dialog
      /** create Confirm Dialog with default title and open it */
      confirm(text : string, callbackOk?: () => void, callbackCancel?: () => void) : Dialog

      /** create Prompt Dialog and open it */
      prompt(text : string, title : string, callbackOk?: (value : string) => void, callbackCancel?: (value : string) => void, defaultValue?: string) : Dialog
      /** create Prompt Dialog with default title and open it */
      prompt(text : string, callbackOk?: (value : string) => void, callbackCancel?: (value : string) => void, defaultValue?: string) : Dialog

      /** create Login Dialog and open it */
      login(text : string, title : string, callbackOk?: (username : string, password : string) => void, callbackCancel?: (username : string, password : string) => void) : Dialog
      /** create Login Dialog with default title and open it */
      login(text : string, callbackOk?: (username : string, password : string) => void, callbackCancel?: (username : string, password : string) => void) : Dialog

      /** create Password Dialog and open it */
      password(text : string, title : string, callbackOk?: (password : string) => void, callbackCancel?: (password : string) => void) : Dialog
      /** create Password Dialog with default title and open it */
      password(text : string, callbackOk?: (password : string) => void, callbackCancel?: (password : string) => void) : Dialog

      /** create Preloader Dialog and open it */
      preloader(title?: string, color?: string) : Dialog

      /** create Progress Dialog and open it */
      progress(
        title?: string,
        /** Optional. Progressbar progress (from 0 to 100). If no number passed then it will have infinite progressbar. */
        progress?: number,
        color?: string
      ) : Dialog
    }
  }
  interface AppParams {
    dialog?: {
      /** Default dialogs shortcuts title. If not specified, will be equal to app.name. */
      title? : string
      /** Default "OK" button text. (default OK) */
      buttonOk?: string
      /** Default "Cancel" button text. (default Cancel) */
      buttonCancel?: string
      /** Default username field placeholder in Login dialog. (default Username) */
      usernamePlaceholder?: string
      /** Default password field placeholder in Login & Password dialogs. (default Password) */
      passwordPlaceholder?: string
      /** Default title for Preloader dialog. (default Loading...) */
      preloaderTitle?: string
      /** Default title for Progress dialog. (default Loading...) */
      progressTitle?: string
      /** Will automatically destroy all predefined dialogs (Alert, Confirm, Prompt, etc.) on close. (default true) */
      destroyPredefinedDialogs?: boolean
      /** Enables keyboard shortcuts (Enter and Esc) keys for predefined dialogs (Alert, Confirm, Prompt, Login, Password) "Ok" and "Cancel" buttons. (default true) */
      keyboardActions?: boolean
      /** When enabled, dialog will be closed on backdrop click. (default true) */
      closeByBackdropClick?: boolean
      /** When enabled it will auto focus input in predefined dialogs (like .prompt(), .login() and .password()) */
      autoFocus?: boolean
    } | undefined
  }
  interface AppEvents {
    /** Event will be triggered when Dialog starts its opening animation. As an argument event handler receives dialog instance */
    dialogOpen: (dialog : Dialog) => void
    /** Event will be triggered after Dialog completes its opening animation. As an argument event handler receives dialog instance */
    dialogOpened: (dialog : Dialog) => void
    /** Event will be triggered when Dialog starts its closing animation. As an argument event handler receives dialog instance */
    dialogClose: (dialog : Dialog) => void
    /** Event will be triggered after Dialog completes its closing animation. As an argument event handler receives dialog instance */
    dialogClosed: (dialog : Dialog) => void
    /** Event will be triggered right before Dialog instance will be destroyed. As an argument event handler receives dialog instance */
    dialogBeforeDestroy: (dialog : Dialog) => void
  }
}
declare const DialogComponent: Framework7Plugin;

export default DialogComponent;
