import * as React from 'react';
import { Popup as PopupNamespace } from 'framework7/components/popup/popup';

declare namespace F7Popup {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    tabletFullscreen? : boolean
    opened? : boolean
    animate? : boolean
    backdrop? : boolean
    backdropEl? : string | Object | any
    closeByBackdropClick? : boolean
    closeOnEscape? : boolean
    swipeToClose? : boolean | string
    swipeHandler? : string | Object | any
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onPopupOpen? : (event?: any) => void
    onPopupOpened? : (event?: any) => void
    onPopupClose? : (event?: any) => void
    onPopupClosed? : (event?: any) => void
  }
}
declare class F7Popup extends React.Component<F7Popup.Props, {}> {
  onOpen(event? : any) : unknown
  onOpened(event? : any) : unknown
  onClose(event? : any) : unknown
  onClosed(event? : any) : unknown
  open(animate? : any) : unknown
  close(animate? : any) : unknown
  f7Popup: PopupNamespace.Popup
}
export default F7Popup;