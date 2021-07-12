import { Dom7Array } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace TextEditor {
  interface Parameters {
    /** Editor element. HTMLElement or string with CSS selector of editor element */
    el: HTMLElement | CSSSelector;
    /** Text editor mode: Can be "toolbar", "popover" or "keyboard-toolbar" (default "toolbar") */
    mode?: string;
    /** Default value. Should be HTML string. If not passed then it will treat inner HTML content as default value (default undefined) */
    value?: string;
    /** Placeholder (default null) */
    palceholder?: string;
    /** Set of editor toolbar buttons */
    buttons?: string[] | Array<string>[];
    /** Define custom buttons */
    customButtons?: object;
    /** Adds visual divider between buttons group (default true) */
    dividers?: boolean;
    /** Prompt text that appears on image url request (default "Insert image URL") */
    imageUrlText?: string;
    /** Prompt text that appears on link url request (default "Insert link URL") */
    linkUrlText?: string;
    /** When enabled it will clear any formatting on paste from clipboard (default true) */
    clearFormattingOnPaste?: boolean;
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]?: Events[event];
    };
  }
  interface TextEditor extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app: Framework7;
    /** Editor HTML element */
    el: HTMLElement;
    /** Dom7 instance with editor HTML element */
    $el: Dom7Array;
    /** Editor contenteditable content element */
    contentEl: HTMLElement;
    /** Dom7 instance with editor contenteditable content element */
    $contentEl: Dom7Array;
    /** Current editor value (html string) */
    value: string;

    /** Editor parameters */
    params: Parameters;
    /** Returns editor value */
    getValue(): number;
    /** Set new editor value */
    setValue(value: string): TextEditor;
    /** Clear editor value */
    clearValue(): TextEditor;
    /** Returns current selection Range */
    getSelectionRange(): Range;
    /** Set selection based on passed Range */
    setSelectionRange(range: Range): void;
    /** Destroy text editor */
    destroy(): void;
  }
  interface Events {
    /** Event will be triggered when editor value has been changed. As an argument event handler receives editor instance and value */
    change: (editor: TextEditor, value: string) => void;
    /** Event will be triggered on editor's content "input" event. As an argument event handler receives editor instance */
    input: (editor: TextEditor) => void;
    /** Event will be triggered on editor's content focus. As an argument event handler receives editor instance */
    focus: (editor: TextEditor) => void;
    /** Event will be triggered on editor's content blur. As an argument event handler receives editor instance */
    blur: (editor: TextEditor) => void;
    /** Event will be triggered on editor button click. As an argument event handler receives editor instance and name of the clicked button, e.g. "bold" */
    buttonClick: (editor: TextEditor, button: string) => void;
    /** Event will be triggered when editor keyboard toolbar appears. As an argument event handler receives editor instance */
    keyboardOpen: (editor: TextEditor) => void;
    /** Event will be triggered when editor keyboard toolbar disappears. As an argument event handler receives editor instance */
    keyboardClose: (editor: TextEditor) => void;
    /** Event will be triggered on editor popover open. As an argument event handler receives editor instance */
    popoverOpen: (editor: TextEditor) => void;
    /** Event will be triggered on editor popover close. As an argument event handler receives editor instance */
    popoverClose: (editor: TextEditor) => void;
    /** Event will be triggered on editor init */
    init: (editor: TextEditor) => void;
    /** Event will be triggered right before Text Editor instance will be destroyed. As an argument event handler receives Text Editor instance */
    beforeDestroy: (editor: TextEditor) => void;
    /** Event will be triggered on link insert, as second argument it receives user-specified link URL (href) */
    insertLink: (editor: TextEditor, url: string) => void;
    /** Event will be triggered on image insert, as second argument it receives user-specified image source URL (href) */
    insertImage: (editor: TextEditor, url: string) => void;
  }
  interface DomEvents {
    /** Event will be triggered when editor value has been changed. */
    'texteditor:change': () => void;
    /** Event will be triggered on editor's content "input" event. */
    'texteditor:input': () => void;
    /** Event will be triggered on editor's content focus.*/
    'texteditor:focus': () => void;
    /** Event will be triggered on editor's content blur.*/
    'texteditor:blur': () => void;
    /** Event will be triggered on editor button click. */
    'texteditor:buttonclick': () => void;
    /** Event will be triggered when editor keyboard toolbar appears.*/
    'texteditor:keyboardopen': () => void;
    /** Event will be triggered when editor keyboard toolbar disappears.*/
    'texteditor:keyboardclose': () => void;
    /** Event will be triggered on editor popover open.*/
    'texteditor:popoveropen': () => void;
    /** Event will be triggered on editor popover close.*/
    'texteditor:popoverclose': () => void;
    /** Event will be triggered on editor init */
    'texteditor:init': () => void;
    /** Event will be triggered right before Text Editor instance will be destroyed.*/
    'texteditor:beforedestroy': () => void;
    /** Event will be triggered on link insert, as second argument it receives user-specified link URL (href) */
    'texteditor:insertlink': (editor: TextEditor, url: string) => void;
    /** Event will be triggered on image insert, as second argument it receives user-specified image source URL (href) */
    'texteditor:insertimage': (editor: TextEditor, url: string) => void;
  }

  interface AppMethods {
    textEditor: {
      /** create Text Editor instance */
      create(parameters: Parameters): TextEditor;
      /** get Text Editor instance by HTML element */
      get(el: HTMLElement | CSSSelector | TextEditor): TextEditor;
      /** destroy Text Editor instance */
      destroy(el: HTMLElement | CSSSelector | TextEditor): void;
    };
  }
  interface AppParams {
    textEditor?: Parameters | undefined;
  }
  interface AppEvents {
    /** Event will be triggered when editor value has been changed. As an argument event handler receives editor instance and value */
    textEditorChange: (editor: TextEditor, value: string) => void;
    /** Event will be triggered on editor's content "input" event. As an argument event handler receives editor instance */
    textEditorInput: (editor: TextEditor) => void;
    /** Event will be triggered on editor's content focus. As an argument event handler receives editor instance */
    textEditorFocus: (editor: TextEditor) => void;
    /** Event will be triggered on editor's content blur. As an argument event handler receives editor instance */
    textEditorBlur: (editor: TextEditor) => void;
    /** Event will be triggered on editor button click. As an argument event handler receives editor instance and name of the clicked button, e.g. "bold" */
    textEditorButtonClick: (editor: TextEditor, button: string) => void;
    /** Event will be triggered when editor keyboard toolbar appears. As an argument event handler receives editor instance */
    textEditorKeyboardOpen: (editor: TextEditor) => void;
    /** Event will be triggered when editor keyboard toolbar disappears. As an argument event handler receives editor instance */
    textEditorKeyboardClose: (editor: TextEditor) => void;
    /** Event will be triggered on editor popover open. As an argument event handler receives editor instance */
    textEditorPopoverOpen: (editor: TextEditor) => void;
    /** Event will be triggered on editor popover close. As an argument event handler receives editor instance */
    textEditorPopoverClose: (editor: TextEditor) => void;
    /** Event will be triggered on editor init */
    textEditorInit: (editor: TextEditor) => void;
    /** Event will be triggered right before Text Editor instance will be destroyed. As an argument event handler receives Text Editor instance */
    textEditorBeforeDestroy: (editor: TextEditor) => void;
    /** Event will be triggered on link insert, as second argument it receives user-specified link URL (href) */
    textEditorInsertLink: (editor: TextEditor, url: string) => void;
    /** Event will be triggered on image insert, as second argument it receives user-specified image source URL (href) */
    textEditorInsertImage: (editor: TextEditor, url: string) => void;
  }
}

declare const TextEditorComponent: Framework7Plugin;

export default TextEditorComponent;
