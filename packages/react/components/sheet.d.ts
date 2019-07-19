import * as React from 'react';
import { Sheet as SheetNamespace } from 'framework7/components/sheet/sheet';

declare namespace F7Sheet {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    opened? : boolean
    top? : boolean
    bottom? : boolean
    position? : string
    backdrop? : boolean
    backdropEl? : string | Object | any
    closeByBackdropClick? : boolean
    closeByOutsideClick? : boolean
    closeOnEscape? : boolean
    swipeToClose? : boolean
    swipeToStep? : boolean
    swipeHandler? : string | Object | any
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onSheetStepProgress? : (...args: any[]) => void
    onSheetStepOpen? : (event?: any) => void
    onSheetStepClose? : (event?: any) => void
    onSheetOpen? : (event?: any) => void
    onSheetOpened? : (event?: any) => void
    onSheetClose? : (event?: any) => void
    onSheetClosed? : (event?: any) => void
  }
}
declare class F7Sheet extends React.Component<F7Sheet.Props, {}> {
  onStepProgress(event? : any) : unknown
  onStepOpen(event? : any) : unknown
  onStepClose(event? : any) : unknown
  onOpen(event? : any) : unknown
  onOpened(event? : any) : unknown
  onClose(event? : any) : unknown
  onClosed(event? : any) : unknown
  open(animate? : any) : unknown
  close(animate? : any) : unknown
  f7Sheet: SheetNamespace.Sheet
}
export default F7Sheet;