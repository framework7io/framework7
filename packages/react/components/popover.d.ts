import * as React from 'react';

declare namespace F7Popover {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
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
}
export default F7Popover;