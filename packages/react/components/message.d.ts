import React from 'react';

declare namespace F7Message {
  export interface Props {
    slot? : string
    id? : string | number
    text? : string
    name? : string
    avatar? : string
    type? : string  | 'sent'
    image? : string
    header? : string
    footer? : string
    textHeader? : string
    textFooter? : string
    first? : boolean
    last? : boolean
    tail? : boolean
    sameName? : boolean
    sameHeader? : boolean
    sameFooter? : boolean
    sameAvatar? : boolean
    typing? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onClick? : Function
    onClickName? : Function
    onClickText? : Function
    onClickAvatar? : Function
    onClickHeader? : Function
    onClickFooter? : Function
    onClickBubble? : Function
  }
}
declare class F7Message extends React.Component<F7Message.Props, {}> {
  onClick(event : any) : unknown
  onNameClick(event : any) : unknown
  onTextClick(event : any) : unknown
  onAvatarClick(event : any) : unknown
  onHeaderClick(event : any) : unknown
  onFooterClick(event : any) : unknown
  onBubbleClick(event : any) : unknown
}
export default F7Message;