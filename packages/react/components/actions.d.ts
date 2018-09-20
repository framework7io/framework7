import * as React from 'react';

declare namespace F7Actions {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    opened? : boolean
    grid? : boolean
    convertToPopover? : boolean
    forceToPopover? : boolean
    target? : string | Object
    closeByBackdropClick? : boolean
    closeByOutsideClick? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onActionsOpen? : (event?: any) => void
    onActionsOpened? : (event?: any) => void
    onActionsClose? : (event?: any) => void
    onActionsClosed? : (event?: any) => void
  }
}
declare class F7Actions extends React.Component<F7Actions.Props, {}> {
  onOpen(event? : any) : unknown
  onOpened(event? : any) : unknown
  onClose(event? : any) : unknown
  onClosed(event? : any) : unknown
  open(animate? : any) : unknown
  close(animate? : any) : unknown
}
export default F7Actions;