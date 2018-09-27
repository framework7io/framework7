import * as React from 'react';

declare namespace F7LoginScreen {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    opened? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onLoginScreenOpen? : (event?: any) => void
    onLoginScreenOpened? : (event?: any) => void
    onLoginScreenClose? : (event?: any) => void
    onLoginScreenClosed? : (event?: any) => void
  }
}
declare class F7LoginScreen extends React.Component<F7LoginScreen.Props, {}> {
  onOpen(event? : any) : unknown
  onOpened(event? : any) : unknown
  onClose(event? : any) : unknown
  onClosed(event? : any) : unknown
  open(animate? : any) : unknown
  close(animate? : any) : unknown
}
export default F7LoginScreen;