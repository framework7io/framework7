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
    onPopoverOpen? : (event?: any) => void
    onPopoverOpened? : (event?: any) => void
    onPopoverClose? : (event?: any) => void
    onPopoverClosed? : (event?: any) => void
  }
}
declare class F7Popover extends React.Component<F7Popover.Props, {}> {
  onOpen(event? : any) : unknown
  onOpened(event? : any) : unknown
  onClose(event? : any) : unknown
  onClosed(event? : any) : unknown
  open(target? : any, animate? : any) : unknown
  close(animate? : any) : unknown
  f7Popover: PopoverNamespace.Popover
}
export default F7Popover;