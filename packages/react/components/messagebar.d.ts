import * as React from 'react';
import { Messagebar as MessagebarNamespace } from 'framework7/components/messagebar/messagebar';

declare namespace F7Messagebar {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    sheetVisible? : boolean
    attachmentsVisible? : boolean
    top? : boolean
    resizable? : boolean
    bottomOffset? : number
    topOffset? : number
    maxHeight? : number
    resizePage? : boolean
    sendLink? : string
    value? : string | number | Array<any>
    disabled? : boolean
    readonly? : boolean
    textareaId? : number | string
    name? : string
    placeholder? : string
    init? : boolean
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
  clear(...args : any[]) : unknown
  getValue(...args : any[]) : unknown
  setValue(...args : any[]) : unknown
  setPlaceholder(...args : any[]) : unknown
  resize(...args : any[]) : unknown
  focus(...args : any[]) : unknown
  blur(...args : any[]) : unknown
  attachmentsShow(...args : any[]) : unknown
  attachmentsHide(...args : any[]) : unknown
  attachmentsToggle(...args : any[]) : unknown
  sheetShow(...args : any[]) : unknown
  sheetHide(...args : any[]) : unknown
  sheetToggle(...args : any[]) : unknown
  onChange(event? : any) : unknown
  onInput(event? : any) : unknown
  onFocus(event? : any) : unknown
  onBlur(event? : any) : unknown
  onClick(event? : any) : unknown
  onDeleteAttachment(event? : any) : unknown
  onClickAttachment(event? : any) : unknown
  onResizePage(event? : any) : unknown
  f7Messagebar: MessagebarNamespace.Messagebar
}
export default F7Messagebar;