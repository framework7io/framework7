import { Dom7Array } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Messages {
  interface Messages extends Framework7EventsClass<Events> {
    /** Object with passed initialization parameters */
    params: Parameters;
    /** Messages container HTML element (<div class="messages">) */
    el: HTMLElement;
    /** Dom7 element with messages HTML element */
    $el: Dom7Array;
    /** Array with messages */
    messages: Message[];

    /** Show typing message indicator */
    showTyping(message: Message): void;
    /** Hide typing message indicator */
    hideTyping(): void;
    /** Add new message to the end or to the beginning depending on method parameter */
    addMessage(message: Message, method: 'append' | 'prepend', animate?: boolean): Messages;
    /** Add multiple messages per once. */
    addMessages(messages: Message[], method: 'append' | 'prepend', animate?: boolean): Messages;
    /** Remove message */
    removeMessage(message: Message): Messages;
    /** Remove multiple messages */
    removeMessages(messages: Message[]): Messages;
    /** Scroll messages to top/bottom depending on newMessagesFirst parameter */
    scroll(durationMS: number, position: number): Messages;
    /** Render messages HTML depending on messages array */
    renderMessages(): Messages;
    /** Force messages auto layout */
    layout(): Messages;
    /** Clear/remove all the messages */
    clear(): Messages;
    /** Destroy messages instance */
    destroy(): void;
  }

  interface Message {
    /** Message text. */
    text: string;
    /** Single message header. */
    header: string;
    /** Single message footer. */
    footer: string;
    /** Sender name. */
    name: string;
    /** Sender avatar URL string. */
    avatar: string;
    /** Message type - sent or received. (default sent) */
    type?: string;
    /** Message text header. */
    textHeader: string;
    /** Message text footer. */
    textFooter: string;
    /** Message image HTML string, e.g. <img src="path/to/image">. Can be used instead of imageSrc parameter. */
    image: string;
    /** Message image URL string. Can be used instead of image parameter. */
    imageSrc: string;
    /** Defines whether it should be rendered as a message or as a messages title. */
    isTitle: boolean;
  }

  interface Parameters {
    /** Enable Auto Layout to add all required additional classes automatically based on passed conditions. (default true) */
    autoLayout?: boolean;
    /** Enable if you want to use new messages on top, instead of having them on bottom. (default false) */
    newMessagesFirst?: boolean;
    /** Enable/disable messages autoscrolling when adding new message. (default true) */
    scrollMessages?: boolean;
    /** If enabled then messages autoscrolling will happen only when user is on top/bottom of the messages view. (default true) */
    scrollMessagesOnEdge?: boolean;
    /** Array with initial messages. Each message in array should be presented as an object with single message parameters. */
    messages?: Message[];
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]?: Events[event];
    };

    /** Function to render single message. Must return full message HTML string. */
    renderMessage?: (message: Message) => string;

    /** Function that must return boolean true or false based on required condition depending on previous and next messages. In case of match then message-first class will be added to message. */
    firstMessageRule?: (
      message: Message,
      previousMessage: Message,
      nextMessage: Message,
    ) => boolean;
    /** Function that must return boolean true or false based on required condition depending on previous and next messages. In case of match then message-last class will be added to message. */
    lastMessageRule?: (message: Message, previousMessage: Message, nextMessage: Message) => boolean;
    /** Function that must return boolean true or false based on required condition depending on previous and next messages. In case of match then message-tail class will be added to message. */
    tailMessageRule?: (message: Message, previousMessage: Message, nextMessage: Message) => boolean;
    /** Function that must return boolean true or false based on required condition depending on previous and next messages. In case of match then message-same-name class will be added to message. */
    sameNameMessageRule?: (
      message: Message,
      previousMessage: Message,
      nextMessage: Message,
    ) => boolean;
    /** Function that must return boolean true or false based on required condition depending on previous and next messages. In case of match then message-same-header class will be added to message. */
    sameHeaderMessageRule?: (
      message: Message,
      previousMessage: Message,
      nextMessage: Message,
    ) => boolean;
    /** Function that must return boolean true or false based on required condition depending on previous and next messages. In case of match then message-same-footer class will be added to message. */
    sameFooterMessageRule?: (
      message: Message,
      previousMessage: Message,
      nextMessage: Message,
    ) => boolean;
    /** Function that must return boolean true or false based on required condition depending on previous and next messages. In case of match then message-same-avatar class will be added to message. */
    sameAvatarMessageRule?: (
      message: Message,
      previousMessage: Message,
      nextMessage: Message,
    ) => boolean;
    /** Function that must return additional message classes as string, based on required condition depending on previous and next messages.. */
    customClassMessageRule?: (
      message: Message,
      previousMessage: Message,
      nextMessage: Message,
    ) => string;
  }

  interface Events {
    /** Event will be triggered right before Messages instance will be destroyed */
    beforeDestroy(messages: Messages): void;
  }

  interface DomEvents {
    /** Event will be triggered right before Messages instance will be destroyed */
    'messages:beforedestroy': void;
  }

  interface AppMethods {
    messages: {
      /** create Messages instance */
      create(parameters: Parameters): Messages;

      /** destroy Messages instance */
      destroy(el: HTMLElement | CSSSelector | Messages): void;

      /** get Messages instance by HTML element */
      get(el: HTMLElement | CSSSelector): Messages;
    };
  }
  interface AppParams {
    messages?: Parameters | undefined;
  }
  interface AppEvents {
    /** Event will be triggered right before Messages instance will be destroyed */
    messagesBeforeDestroy(messages: Messages): void;
  }
}

declare const MessagesComponent: Framework7Plugin;

export default MessagesComponent;
