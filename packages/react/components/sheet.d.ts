import * as React from 'react';

declare namespace F7Sheet {
  export interface Props {
    slot? : string
    id? : string | number
    opened? : boolean
    backdrop? : boolean
    closeByBackdropClick? : boolean
    closeByOutsideClick? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onSheetOpen? : Function
    onSheetOpened? : Function
    onSheetClose? : Function
    onSheetClosed? : Function
  }
}
declare class F7Sheet extends React.Component<F7Sheet.Props, {}> {
  onOpen(event : any) : unknown
  onOpened(event : any) : unknown
  onClose(event : any) : unknown
  onClosed(event : any) : unknown
  open(animate : any) : unknown
  close(animate : any) : unknown
}
export default F7Sheet;