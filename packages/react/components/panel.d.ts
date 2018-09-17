import * as React from 'react';

declare namespace F7Panel {
  export interface Props {
    slot? : string
    id? : string | number
    side? : string
    effect? : string
    cover? : boolean
    reveal? : boolean
    left? : boolean
    right? : boolean
    opened? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onPanelOpen? : Function
    onPanelOpened? : Function
    onPanelClose? : Function
    onPanelClosed? : Function
    onPanelBackdropClick? : Function
    onPanelSwipe? : Function
    onPanelSwipeOpen? : Function
    onPanelBreakpoint? : Function
  }
}
declare class F7Panel extends React.Component<F7Panel.Props, {}> {
  onOpen(event : any) : unknown
  onOpened(event : any) : unknown
  onClose(event : any) : unknown
  onClosed(event : any) : unknown
  onBackdropClick(event : any) : unknown
  onPanelSwipe(event : any) : unknown
  onPanelSwipeOpen(event : any) : unknown
  onBreakpoint(event : any) : unknown
  open(animate : any) : unknown
  close(animate : any) : unknown
}
export default F7Panel;