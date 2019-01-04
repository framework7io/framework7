import * as React from 'react';

declare namespace F7Message {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    text? : string
    name? : string
    avatar? : string
    type? : string
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
    onClick? : (event?: any) => void
    onClickName? : (event?: any) => void
    onClickText? : (event?: any) => void
    onClickAvatar? : (event?: any) => void
    onClickHeader? : (event?: any) => void
    onClickFooter? : (event?: any) => void
    onClickBubble? : (event?: any) => void
  }
}
declare class F7Message extends React.Component<F7Message.Props, {}> {
  onClick(event? : any) : unknown
  onNameClick(event? : any) : unknown
  onTextClick(event? : any) : unknown
  onAvatarClick(event? : any) : unknown
  onHeaderClick(event? : any) : unknown
  onFooterClick(event? : any) : unknown
  onBubbleClick(event? : any) : unknown
}
export default F7Message;