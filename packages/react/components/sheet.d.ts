import * as React from 'react';
import { Sheet as SheetNamespace } from 'framework7/components/sheet/sheet';

declare namespace F7Sheet {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
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
    onSheetOpen? : (event?: any) => void
    onSheetOpened? : (event?: any) => void
    onSheetClose? : (event?: any) => void
    onSheetClosed? : (event?: any) => void
  }
}
declare class F7Sheet extends React.Component<F7Sheet.Props, {}> {
  onOpen(event? : any) : unknown
  onOpened(event? : any) : unknown
  onClose(event? : any) : unknown
  onClosed(event? : any) : unknown
  open(animate? : any) : unknown
  close(animate? : any) : unknown
  f7Sheet: SheetNamespace.Sheet
}
export default F7Sheet;