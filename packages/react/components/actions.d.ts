import React from 'react';

namespace F7Actions {
  export interface Props {
    slot? : string
    id? : string | number
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
    onActionsOpen? : Function
    onActionsOpened? : Function
    onActionsClose? : Function
    onActionsClosed? : Function
  }
}
class F7Actions extends React.Component<F7Actions.Props, {}> {
  onOpen(event : any) : unknown
  onOpened(event : any) : unknown
  onClose(event : any) : unknown
  onClosed(event : any) : unknown
  open(animate? : any) : unknown
  close(animate? : any) : unknown
}
export default F7Actions;
