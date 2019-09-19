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
    onTextEditorChange? : (editor?: any, value?: any) => void
    onTextEditorFocus? : (editor?: any) => void
    onTextEditorBlur? : (editor?: any) => void
    onTextEditorButtonClick? : (editor?: any, button?: any) => void
    onTextEditorKeyboardOpen? : (editor?: any) => void
    onTextEditorKeyboardClose? : (editor?: any) => void
    onTextEditorPopoverOpen? : (editor?: any) => void
    onTextEditorPopoverClose? : (editor?: any) => void
  }
}
declare class F7TextEditor extends React.Component<F7TextEditor.Props, {}> {
  onChange(editor? : any, value? : any) : unknown
  onInput(editor? : any) : unknown
  onFocus(editor? : any) : unknown
  onBlur(editor? : any) : unknown
  onButtonClick(editor? : any, button? : any) : unknown
  onKeyboardOpen(editor? : any) : unknown
  onKeyboardClose(editor? : any) : unknown
  onPopoverOpen(editor? : any) : unknown
  onPopoverClose(editor? : any) : unknown
}
export default F7TextEditor;