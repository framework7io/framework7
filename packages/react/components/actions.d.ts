import * as React from 'react';
import { Actions as ActionsNamespace } from 'framework7/components/actions/actions';

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
    backdrop? : boolean
    backdropEl? : string | Object | any
    closeByBackdropClick? : boolean
    closeByOutsideClick? : boolean
    closeOnEscape? : boolean
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
  f7Actions: ActionsNamespace.Actions
}
export default F7Actions;