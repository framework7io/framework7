import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Input {
  interface DomEvents {
    /** Event will be triggered after resizable textarea resized. event.detail will contain object with the initialHeight, currentHeight and scrollHeight properties */
    'textarea:resize': () => void
    /** Event will be triggered when input value becomes not empty */
    'input:notempty': () => void
    /** Event will be triggered when input value becomes empty */
    'input:empty': () => void
    /** Event will be triggered after input value will be cleared by clicking on input clear button */
    'input:clear': () => void
  }
  interface AppMethods {
    input: {
      /** Scroll input into view */
      scrollIntoView(inputEl : HTMLElement | CSSSelector, durationMS?: number, centered? : boolean, force? : boolean) : void
      /** Will add additional required styles and classes on input like when it is focused*/
      focus(inputEl : HTMLElement | CSSSelector) : void
      /** Will remove additional required styles and classes on input like when it loses focus */
      blur(inputEl : HTMLElement | CSSSelector) : void
      /** Force resizable textarea to resize depending on its content */
      resizeTextarea(textareaEl : HTMLElement | CSSSelector) : void
      /** Recalculate required additional styles and classes on input element based on whether it has value or not */
      checkEmptyState(inputEl : HTMLElement | CSSSelector) : void
      /** Validate input */
      validate(inputEl : HTMLElement | CSSSelector) : void
      /** Validate all inputs in passed container */
      validateInputs(containerEl : HTMLElement | CSSSelector) : void
    }
  }
  interface AppParams {
    input?: {
      /** When enabled will scroll input into view on input focus. By default it is enabled for android devices only, as it helps to solve issue when on-screen keyboard may overlap the input. */
      scrollIntoViewOnFocus?: boolean
      /** Tweaks behavior of previous parameter to scroll input into the center of view on input focus. (default false) */
      scrollIntoViewCentered?: boolean
      /** Default duration for scrolling input into view. (default 0) */
      scrollIntoViewDuration?: number
      /** When enabled will scroll input into view no matter is it outside of view or not. (default false) */
      scrollIntoViewAlways?: boolean
    } | undefined
  }
  interface AppEvents {

  }
}

declare const InputComponent: Framework7Plugin;

export default InputComponent;