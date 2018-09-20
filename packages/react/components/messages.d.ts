import * as React from 'react';

declare namespace F7Messages {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    autoLayout? : boolean  | false
    messages? : Array<any>  | function(){return[];}
    newMessagesFirst? : boolean  | false
    scrollMessages? : boolean  | true
    scrollMessagesOnEdge? : boolean  | true
    firstMessageRule? : Function
    lastMessageRule? : Function
    tailMessageRule? : Function
    sameNameMessageRule? : Function
    sameHeaderMessageRule? : Function
    sameFooterMessageRule? : Function
    sameAvatarMessageRule? : Function
    customClassMessageRule? : Function
    renderMessage? : Function
    init? : boolean  | true
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7Messages extends React.Component<F7Messages.Props, {}> {
  renderMessages(messagesToRender? : any, method? : any) : unknown
  layout() : unknown
  scroll(duration? : any, scrollTop? : any) : unknown
  clear() : unknown
  removeMessage(messageToRemove? : any, layout? : any) : unknown
  removeMessages(messagesToRemove? : any, layout? : any) : unknown
  addMessage(undefined? : any) : unknown
  addMessages(undefined? : any) : unknown
  showTyping(message? : any) : unknown
  hideTyping() : unknown
  destroy() : unknown
}
export default F7Messages;