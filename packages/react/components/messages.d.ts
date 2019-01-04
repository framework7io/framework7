import * as React from 'react';
import { Messages as MessagesNamespace } from 'framework7/components/messages/messages';

declare namespace F7Messages {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    autoLayout? : boolean
    messages? : Array<any>
    newMessagesFirst? : boolean
    scrollMessages? : boolean
    scrollMessagesOnEdge? : boolean
    firstMessageRule? : Function
    lastMessageRule? : Function
    tailMessageRule? : Function
    sameNameMessageRule? : Function
    sameHeaderMessageRule? : Function
    sameFooterMessageRule? : Function
    sameAvatarMessageRule? : Function
    customClassMessageRule? : Function
    renderMessage? : Function
    init? : boolean
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
  addMessage(...args : any[]) : unknown
  addMessages(...args : any[]) : unknown
  showTyping(message? : any) : unknown
  hideTyping() : unknown
  destroy() : unknown
  f7Messages: MessagesNamespace.Messages
}
export default F7Messages;