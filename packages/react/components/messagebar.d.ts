import React from 'react';

namespace F7Messagebar {
  export interface Props {
    slot? : string
    id? : string | number
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
    onChange? : Function
    onInput? : Function
    onFocus? : Function
    onBlur? : Function
    onSubmit? : Function
    onSend? : Function
    onClick? : Function
    onMessagebarAttachmentDelete? : Function
    onMessagebarAttachmentClick? : Function
    onMessagebarResizePage? : Function
  }
}
class F7Messagebar extends React.Component<F7Messagebar.Props, {}> {
  clear(undefined : any) : unknown
  getValue(undefined : any) : unknown
  setValue(undefined : any) : unknown
  setPlaceholder(undefined : any) : unknown
  resize(undefined : any) : unknown
  focus(undefined : any) : unknown
  blur(undefined : any) : unknown
  attachmentsShow(undefined : any) : unknown
  attachmentsHide(undefined : any) : unknown
  attachmentsToggle(undefined : any) : unknown
  sheetShow(undefined : any) : unknown
  sheetHide(undefined : any) : unknown
  sheetToggle(undefined : any) : unknown
  onChange(event : any) : unknown
  onInput(event : any) : unknown
  onFocus(event : any) : unknown
  onBlur(event : any) : unknown
  onClick(event : any) : unknown
  onDeleteAttachment(e : any) : unknown
  onClickAttachment(e : any) : unknown
  onResizePage(e : any) : unknown
}
export default F7Messagebar;