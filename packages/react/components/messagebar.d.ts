import * as React from 'react';

declare namespace F7Messagebar {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    sheetVisible? : boolean
    attachmentsVisible? : boolean
    top? : boolean
    resizable? : boolean  | true
    bottomOffset? : number  | 0
    topOffset? : number  | 0
    maxHeight? : number
    resizePage? : boolean
    sendLink? : string
    value? : string | number | Array<any>
    disabled? : boolean
    readonly? : boolean
    name? : string
    placeholder? : string  | 'Message'
    init? : boolean  | true
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onChange? : (event?: any) => void
    onInput? : (event?: any) => void
    onFocus? : (event?: any) => void
    onBlur? : (event?: any) => void
    onSubmit? : (value?: any, clear?: any) => void
    onSend? : (value?: any, clear?: any) => void
    onClick? : (event?: any) => void
    onMessagebarAttachmentDelete? : (event?: any) => void
    onMessagebarAttachmentClick? : (event?: any) => void
    onMessagebarResizePage? : (event?: any) => void
  }
}
declare class F7Messagebar extends React.Component<F7Messagebar.Props, {}> {
  clear(undefined? : any) : unknown
  getValue(undefined? : any) : unknown
  setValue(undefined? : any) : unknown
  setPlaceholder(undefined? : any) : unknown
  resize(undefined? : any) : unknown
  focus(undefined? : any) : unknown
  blur(undefined? : any) : unknown
  attachmentsShow(undefined? : any) : unknown
  attachmentsHide(undefined? : any) : unknown
  attachmentsToggle(undefined? : any) : unknown
  sheetShow(undefined? : any) : unknown
  sheetHide(undefined? : any) : unknown
  sheetToggle(undefined? : any) : unknown
  onChange(event? : any) : unknown
  onInput(event? : any) : unknown
  onFocus(event? : any) : unknown
  onBlur(event? : any) : unknown
  onClick(event? : any) : unknown
  onDeleteAttachment(event? : any) : unknown
  onClickAttachment(event? : any) : unknown
  onResizePage(event? : any) : unknown
}
export default F7Messagebar;