import React from 'react';

namespace F7LoginScreen {
  export interface Props {
    slot? : string
    id? : string | number
    opened? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onLoginScreenOpen? : Function
    onLoginScreenOpened? : Function
    onLoginScreenClose? : Function
    onLoginScreenClosed? : Function
  }
}
class F7LoginScreen extends React.Component<F7LoginScreen.Props, {}> {
  onOpen(event : any) : unknown
  onOpened(event : any) : unknown
  onClose(event : any) : unknown
  onClosed(event : any) : unknown
  open(animate : any) : unknown
  close(animate : any) : unknown
}
export default F7LoginScreen;