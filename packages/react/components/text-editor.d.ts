import * as React from 'react';

declare namespace F7TextEditor {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    mode? : string
    value? : string
    buttons? : Array<any>
    customButtons? : Object
    dividers? : boolean
    imageUrlText? : string
    linkUrlText? : string
    placeholder? : string
    clearFormattingOnPaste? : boolean
    resizable? : boolean
    onTextEditorChange? : (value?: any) => void
    onTextEditorFocus? : (...args: any[]) => void
    onTextEditorBlur? : (...args: any[]) => void
    onTextEditorButtonClick? : (button?: any) => void
    onTextEditorKeyboardOpen? : (...args: any[]) => void
    onTextEditorKeyboardClose? : (...args: any[]) => void
    onTextEditorPopoverOpen? : (...args: any[]) => void
    onTextEditorPopoverClose? : (...args: any[]) => void
  }
}
declare class F7TextEditor extends React.Component<F7TextEditor.Props, {}> {
  onChange(editor? : any, value? : any) : unknown
  onInput() : unknown
  onFocus() : unknown
  onBlur() : unknown
  onButtonClick(editor? : any, button? : any) : unknown
  onKeyboardOpen() : unknown
  onKeyboardClose() : unknown
  onPopoverOpen() : unknown
  onPopoverClose() : unknown
}
export default F7TextEditor;