import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Notification {
  interface Notification extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app : Framework7
    /** Notification HTML element */
    el : HTMLElement
    /** Dom7 instance with notification HTML element */
    $el : Dom7Instance
    /** Notification parameters */
    params : Parameters

    /** Open notification */
    open() : Notification
    /** Close notification */
    close() : Notification
  }

  interface Parameters {
    /** Notification element. Can be useful if you already have Notification element in your HTML and want to create new instance using this element. */
    el?: HTMLElement
    /** Notification icon HTML layout, e.g. <i class="f7-icons">house</i> or image <img src="path/to/icon.png">. */
    icon?: string
    /** Notification title. */
    title?: string
    /** Additional text on the right side of title. */
    titleRightText?: string
    /** Notification subtitle. */
    subtitle?: string
    /** Notification inner text. */
    text?: string
    /** Adds notification close button. (default false) */
    closeButton?: boolean
    /** Timeout delay (in ms) to close notification automatically. */
    closeTimeout?: number
    /** If enabled, notification will be closed on notification click. (default false) */
    closeOnClick?: boolean
    /** If enabled, notification can be closed by swipe gesture. (default true) */
    swipeToClose?: boolean
    /** Additional css class to add. */
    cssClass?: string
    /** Custom function to render Notification. Must return notification html. */
    render?: () => string
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]? : Events[event]
    }
  }

  interface Events {
    /** Event will be triggered when user clicks on Notification element. As an argument event handler receives notification instance */
    click: (notification : Notification) => void
    /** Event will be triggered when Notification starts its opening animation. As an argument event handler receives notification instance */
    open: (notification : Notification) => void
    /** Event will be triggered after Notification completes its opening animation. As an argument event handler receives notification instance */
    opened: (notification : Notification) => void
    /** Event will be triggered when Notification starts its closing animation. As an argument event handler receives notification instance */
    close: (notification : Notification) => void
    /** Event will be triggered after Notification completes its closing animation. As an argument event handler receives notification instance */
    closed: (notification : Notification) => void
    /** Event will be triggered right before Notification instance will be destroyed. As an argument event handler receives notification instance */
    beforeDestroy: (notification : Notification) => void
  }

  interface DomEvents {
    /** Event will be triggered when Notification starts its opening animation */
    'notification:open' : () => void
    /** Event will be triggered after Notification completes its opening animation */
    'notification:opened' : () => void
    /** Event will be triggered when Notification starts its closing animation */
    'notification:close' : () => void
    /** Event will be triggered after Notification completes its closing animation */
    'notification:closed' : () => void
  }
  interface AppMethods {
    notification: {
      /** create Notification instance */
      create(parameters : Parameters) : Notification

      /** destroy Notification instance */
      destroy(el : HTMLElement | CSSSelector | Notification) : void

      /** get Notification instance by HTML element */
      get(el : HTMLElement | CSSSelector) : Notification

      /** open Notification */
      open(el : HTMLElement | CSSSelector) : Notification

      /** closes Notification */
      close(el : HTMLElement | CSSSelector) : Notification
    }
  }
  interface AppParams {
    notification?: Parameters | undefined
  }
  interface AppEvents {
    /** Event will be triggered when user clicks on Notification element. As an argument event handler receives notification instance */
    notificationClick: (notification : Notification) => void
    /** Event will be triggered when Notification starts its opening animation. As an argument event handler receives notification instance */
    notificationOpen: (notification : Notification) => void
    /** Event will be triggered after Notification completes its opening animation. As an argument event handler receives notification instance */
    notificationOpened: (notification : Notification) => void
    /** Event will be triggered when Notification starts its closing animation. As an argument event handler receives notification instance */
    notificationClose: (notification : Notification) => void
    /** Event will be triggered after Notification completes its closing animation. As an argument event handler receives notification instance */
    notificationClosed: (notification : Notification) => void
    /** Event will be triggered right before Notification instance will be destroyed. As an argument event handler receives notification instance */
    notificationBeforeDestroy: (notification : Notification) => void
  }
}

declare const NotificationComponent: Framework7Plugin;

export default NotificationComponent;
