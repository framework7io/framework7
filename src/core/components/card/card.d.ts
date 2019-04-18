import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Card {
  interface AppMethods {
    card: {
      /** Open expandable card */
      open(cardEl : HTMLElement | CSSSelector, animate?: boolean) : void
      /** Close expandable card */
      close(cardEl : HTMLElement | CSSSelector, animate?: boolean) : void
      /** Toggle expandable card */
      toggle(cardEl : HTMLElement | CSSSelector, animate?: boolean) : void
    }
  }
  interface AppParams {
    card?: {
      /** Will hide Navbar on expandable card open. (default true) */
      hideNavbarOnOpen?: boolean
      /** Will hide Toolbar on expandable card open. (default true) */
      hideToolbarOnOpen?: boolean
      /** Allows to close expandable card with swipe (default true) */
      swipeToClose?: boolean
      /** Enables expandable card backdrop layer (default true) */
      backdrop?: boolean
      /** When enabled, expandable card will be closed on backdrop click. (default true) */
      closeByBackdropClick?: boolean
    } | undefined
  }
  interface AppEvents {
    /** Event will be triggered before expandable card content starts its opening animation */
    cardBeforeOpen : (el : HTMLElement | CSSSelector, prevent: () => void) => void

    /** Event will be triggered when expandable card content starts its opening animation */
    cardOpen : (el : HTMLElement | CSSSelector) => void

    /** Event will be triggered after expandable card content completes its opening animation */
    cardOpened : (el : HTMLElement | CSSSelector) => void

    /** Event will be triggered when expandable card content starts its closing animation */
    cardClose : (el : HTMLElement | CSSSelector) => void

    /** Event will be triggered after expandable card content completes its closing animation */
    cardClosed : (el : HTMLElement | CSSSelector) => void
  }
}

declare const CardComponent: Framework7Plugin;
export default CardComponent;