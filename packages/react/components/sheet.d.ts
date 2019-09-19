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
    push? : boolean
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
    onSheetStepProgress? : (instance?: any, progress?: any) => void
    onSheetStepOpen? : (instance?: any) => void
    onSheetStepClose? : (instance?: any) => void
    onSheetOpen? : (instance?: any) => void
    onSheetOpened? : (instance?: any) => void
    onSheetClose? : (instance?: any) => void
    onSheetClosed? : (instance?: any) => void
  }
}
declare class F7Sheet extends React.Component<F7Sheet.Props, {}> {
  onStepProgress(instance? : any, progress? : any) : unknown
  onStepOpen(instance? : any) : unknown
  onStepClose(instance? : any) : unknown
  onOpen(instance? : any) : unknown
  onOpened(instance? : any) : unknown
  onClose(instance? : any) : unknown
  onClosed(instance? : any) : unknown
  open(animate? : any) : unknown
  close(animate? : any) : unknown
  f7Sheet: SheetNamespace.Sheet
}
export default F7Sheet;