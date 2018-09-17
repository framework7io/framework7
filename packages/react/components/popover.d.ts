import * as React from 'react';

declare namespace F7Popover {
  export interface Props {
    slot? : string
    id? : string | number
    opened? : boolean
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
    onPopoverOpen? : Function
    onPopoverOpened? : Function
    onPopoverClose? : Function
    onPopoverClosed? : Function
  }
}
declare class F7Popover extends React.Component<F7Popover.Props, {}> {
  onOpen(event : any) : unknown
  onOpened(event : any) : unknown
  onClose(event : any) : unknown
  onClosed(event : any) : unknown
  open(target : any, animate : any) : unknown
  close(animate : any) : unknown
}
export default F7Popover;