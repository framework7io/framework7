import React from 'react';

declare namespace F7Popup {
  export interface Props {
    slot? : string
    id? : string | number
    tabletFullscreen? : boolean
    opened? : boolean
    closeByBackdropClick? : boolean
    backdrop? : boolean
    animate? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onPopupOpen? : Function
    onPopupOpened? : Function
    onPopupClose? : Function
    onPopupClosed? : Function
  }
}
declare class F7Popup extends React.Component<F7Popup.Props, {}> {
  onOpen(event : any) : unknown
  onOpened(event : any) : unknown
  onClose(event : any) : unknown
  onClosed(event : any) : unknown
  open(animate : any) : unknown
  close(animate : any) : unknown
}
export default F7Popup;