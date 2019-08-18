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
    onActionsOpen? : (instance?: any) => void
    onActionsOpened? : (instance?: any) => void
    onActionsClose? : (instance?: any) => void
    onActionsClosed? : (instance?: any) => void
  }
}
declare class F7Actions extends React.Component<F7Actions.Props, {}> {
  onOpen(instance? : any) : unknown
  onOpened(instance? : any) : unknown
  onClose(instance? : any) : unknown
  onClosed(instance? : any) : unknown
  open(animate? : any) : unknown
  close(animate? : any) : unknown
  f7Actions: ActionsNamespace.Actions
}
export default F7Actions;