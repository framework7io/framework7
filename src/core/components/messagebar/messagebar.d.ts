import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Messagebar {
  interface Messagebar extends Framework7EventsClass<Events> {
    /** Messagebar HTML element. */
    el : HTMLElement
    /** Dom7 element with messagebar HTML element. */
    $el : Dom7Instance
    /** Messagebar textarea HTML element */
    textareaEl : HTMLTextAreaElement
    /** Dom7 element with messagebar textarea HTML element */
    $textareaEl : Dom7Instance
    /** Object with passed initialization parameters */
    params : Parameters
    /** Array with messagebar attachments */
    attachments : string[]

    /** Get messagebar textarea value */
    getValue() : string
    /** Set messagebar textarea value/text */
    setValue(value : string) : Messagebar
    /** Clear textarea and update/reset its size */
    clear() : Messagebar
    /** Focus messagebar textarea */
    focus() : Messagebar
    /** Remove focus from messagebar textarea */
    blur() : Messagebar
    /** Set/change messagebar placeholder text */
    setPlaceholder(placeholder : string) : Messagebar
    /** Force Messagebar to resize messages page depending on messagebar height/size */
    resizePage() : Messagebar
    /** Dynamically create attachments block HTML element */
    attachmentsCreate() : Messagebar
    /** Show attachments block */
    attachmentsShow() : Messagebar
    /** Hide attachments block */
    attachmentsHide() : Messagebar
    /** Toggle attachments block */
    attachmentsToggle() : Messagebar
    /** Render attachments block based on attachments data */
    renderAttachments() : Messagebar
    /** Dynamically create messagebar sheet block HTML element */
    sheetCreate() : Messagebar
    /** Show messagebar sheet */
    sheetShow() : Messagebar
    /** Hide messagebar sheet */
    sheetHide() : Messagebar
    /** Toggle messagebar sheet */
    sheetToggle() : Messagebar
    /** Destroy messagebar instance */
    destroy() : void
  }

  interface Parameters {
    /** CSS selector or HTML element of messagebar element (div class="messagebar"). */
    el: HTMLElement | CSSSelector
    /** CSS selector or HTML element of messagebar textarea element. By default (if not passed) will try to look for textarea inside of messagebar. */
    textareaEl?: HTMLElement | CSSSelector
    /** Max height of textarea when it resized depending on amount of its text. (default null) */
    maxHeight?: number
    /** Array with attachments. For example ['path/to/image1.png', 'path/to/image2.png']. (default []) */
    attachments?: string[]
    /** Disable if you don't want to resize messages page when messagebar textarea size changed. (default true) */
    resizePage?: boolean
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]? : Events[event]
    }

    /** Function to render attachments block. Must return full attachments HTML string. */
    renderAttachments?: (attachments : string[]) => string
    /** Function to render single attachment. Must return full attachment HTML string. */
    renderAttachment?: (attachment : string) => string
  }

  interface Events {
    /** Event will be triggered after messagebar textarea value changed. As an argument event handler receives messagebar instance */
    change(messagebar : Messagebar) : void
    /** Event will be triggered when messagebar textarea gets focus. As an argument event handler receives messagebar instance */
    focus(messagebar : Messagebar) : void
    /** Event will be triggered when messagebar textarea loses focus. As an argument event handler receives messagebar instance */
    blur(messagebar : Messagebar) : void
    /** Event will be triggered when messagebar resizes messages page. As an argument event handler receives messagebar instance */
    resizePage(messagebar : Messagebar) : void
    /** Event will be triggered after click on messagebar attachment delete button. As an argument event handler receives messagebar instance, clicked attachment HTML element and attachment index number */
    attachmentDelete(messagebar : Messagebar, attachmentEl : HTMLElement, attachmentIndex: number) : void
    /** Event will be triggered on messagebar attachment click. As an argument event handler receives messagebar instance, clicked attachment HTML element and attachment index number */
    attachmentClick(messagebar : Messagebar, attachmentEl : HTMLElement, attachmentIndex: number) : void
    /** Event will be triggered right before Messagebar instance will be destroyed */
    beforeDestroy(messagebar : Messagebar) : void
  }

  interface DomEvents {
    /** Event will be triggered after messagebar textarea value changed */
    'messagebar:change': void
    /** Event will be triggered when messagebar textarea gets focus */
    'messagebar:focus': void
    /** Event will be triggered when messagebar textarea loses focus */
    'messagebar:blur': void
    /** Event will be triggered when messagebar resizes messages page */
    'messagebar:resizepage': void
    /** Event will be triggered after click on messagebar attachment delete button */
    'messagebar:attachmentdelete': void
    /** Event will be triggered on messagebar attachment click */
    'messagebar:attachmentclick': void
    /** Event will be triggered right before Messagebar instance will be destroyed */
    'messagebar:beforedestroy': void
  }
  interface AppMethods {
    messagebar: {
      /** create Messagebar instance */
      create(parameters : Parameters) : Messagebar

      /** destroy Messagebar instance */
      destroy(el : HTMLElement | CSSSelector | Messagebar) : void

      /** get Messagebar instance by HTML element */
      get(el : HTMLElement | CSSSelector) : Messagebar
    }
  }
  interface AppParams {
    messagebar?: Parameters | undefined
  }
  interface AppEvents {
    /** Event will be triggered after messagebar textarea value changed. As an argument event handler receives messagebar instance */
    messagebarChange(messagebar : Messagebar) : void
    /** Event will be triggered when messagebar textarea gets focus. As an argument event handler receives messagebar instance */
    messagebarFocus(messagebar : Messagebar) : void
    /** Event will be triggered when messagebar textarea loses focus. As an argument event handler receives messagebar instance */
    messagebarBlur(messagebar : Messagebar) : void
    /** Event will be triggered when messagebar resizes messages page. As an argument event handler receives messagebar instance */
    messagebarResizePage(messagebar : Messagebar) : void
    /** Event will be triggered after click on messagebar attachment delete button. As an argument event handler receives messagebar instance, clicked attachment HTML element and attachment index number */
    messagebarAttachmentDelete(messagebar : Messagebar, attachmentEl : HTMLElement, attachmentIndex: number) : void
    /** Event will be triggered on messagebar attachment click. As an argument event handler receives messagebar instance, clicked attachment HTML element and attachment index number */
    messagebarAttachmentClick(messagebar : Messagebar, attachmentEl : HTMLElement, attachmentIndex: number) : void
    /** Event will be triggered right before Messagebar instance will be destroyed */
    messagebarBeforeDestroy(messagebar : Messagebar) : void
  }
}

declare const MessagebarComponent: Framework7Plugin;

export default MessagebarComponent;