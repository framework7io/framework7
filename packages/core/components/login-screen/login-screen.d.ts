import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace LoginScreen {
  interface LoginScreen extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app : Framework7
    /** Login Screen HTML element */
    el : HTMLElement
    /** Dom7 instance with login screen HTML element */
    $el : Dom7Instance
    /** Login Screen parameters */
    params : Parameters
    /** Boolean prop indicating whether login screen is opened or not */
    opened : boolean

    /** Open login screen. Where */
    open(animate : boolean) : LoginScreen
    /** Close login screen. Where */
    close(animate : boolean) : LoginScreen
    /** Destroy login screen */
    destroy() : void
  }

  interface Parameters {
    /**  */
    el?: HTMLElement
    /**  */
    content?: string
    /** true */
    animate?: boolean
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]? : Events[event]
    }
  }

  interface Events {
    /** Event will be triggered when LoginScreen starts its opening animation. As an argument event handler receives loginScreen instance */
    open: (loginScreen : LoginScreen) => void
    /** Event will be triggered after LoginScreen completes its opening animation. As an argument event handler receives loginScreen instance */
    opened: (loginScreen : LoginScreen) => void
    /** Event will be triggered when LoginScreen starts its closing animation. As an argument event handler receives loginScreen instance */
    close: (loginScreen : LoginScreen) => void
    /** Event will be triggered after LoginScreen completes its closing animation. As an argument event handler receives loginScreen instance */
    closed: (loginScreen : LoginScreen) => void
    /** Event will be triggered right before LoginScreen instance will be destroyed. As an argument event handler receives loginScreen instance */
    beforeDestroy: (loginScreen : LoginScreen) => void
  }
  interface DomEvents {
    /** Event will be triggered when LoginScreen starts its opening animation */
    'loginscreen:open' : () => void
    /** Event will be triggered after LoginScreen completes its opening animation */
    'loginscreen:opened' : () => void
    /** Event will be triggered when LoginScreen starts its closing animation */
    'loginscreen:close' : () => void
    /** Event will be triggered after LoginScreen completes its closing animation */
    'loginscreen:closed' : () => void
  }
  interface AppMethods {
    loginScreen: {
      /** create LoginScreen instance */
      create(parameters : Parameters) : LoginScreen
      /** destroy LoginScreen instance */
      destroy(el : HTMLElement | CSSSelector | LoginScreen) : void
      /** get LoginScreen instance by HTML element */
      get(el : HTMLElement | CSSSelector) : LoginScreen
      /** open LoginScreen */
      open(el : HTMLElement | CSSSelector, animate?: boolean) : LoginScreen
      /** closes LoginScreen */
      close(el : HTMLElement | CSSSelector, animate?: boolean) : LoginScreen
    }
  }
  interface AppParams {
    loginScreen?: Parameters | undefined
  }
  interface AppEvents {
    /** Event will be triggered when LoginScreen starts its opening animation. As an argument event handler receives loginScreen instance */
    loginScreenOpen: (loginScreen : LoginScreen) => void
    /** Event will be triggered after LoginScreen completes its opening animation. As an argument event handler receives loginScreen instance */
    loginScreenOpened: (loginScreen : LoginScreen) => void
    /** Event will be triggered when LoginScreen starts its closing animation. As an argument event handler receives loginScreen instance */
    loginScreenClose: (loginScreen : LoginScreen) => void
    /** Event will be triggered after LoginScreen completes its closing animation. As an argument event handler receives loginScreen instance */
    loginScreenClosed: (loginScreen : LoginScreen) => void
    /** Event will be triggered right before LoginScreen instance will be destroyed. As an argument event handler receives loginScreen instance */
    loginScreenBeforeDestroy: (loginScreen : LoginScreen) => void
  }
}

declare const LoginScreenComponent: Framework7Plugin;

export default LoginScreenComponent;