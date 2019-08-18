import * as React from 'react';
import { Popover as PopoverNamespace } from 'framework7/components/popover/popover';

declare namespace F7Popover {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    opened? : boolean
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
    onPopoverOpen? : (instance?: any) => void
    onPopoverOpened? : (instance?: any) => void
    onPopoverClose? : (instance?: any) => void
    onPopoverClosed? : (instance?: any) => void
  }
}
declare class F7Popover extends React.Component<F7Popover.Props, {}> {
  onOpen(instance? : any) : unknown
  onOpened(instance? : any) : unknown
  onClose(instance? : any) : unknown
  onClosed(instance? : any) : unknown
  open(animate? : any) : unknown
  close(animate? : any) : unknown
  f7Popover: PopoverNamespace.Popover
}
export default F7Popover;