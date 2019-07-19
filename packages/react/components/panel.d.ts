import * as React from 'react';
import { Panel as PanelNamespace } from 'framework7/components/panel/panel';

declare namespace F7Panel {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    side? : string
    effect? : string
    cover? : boolean
    reveal? : boolean
    left? : boolean
    right? : boolean
    opened? : boolean
    resizable? : boolean
    backdrop? : boolean
    backdropEl? : string
    visibleBreakpoint? : number
    collapsedBreakpoint? : number
    swipe? : boolean
    swipeOnlyClose? : boolean
    swipeActiveArea? : number
    swipeThreshold? : number
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onPanelOpen? : (event?: any) => void
    onPanelOpened? : (event?: any) => void
    onPanelClose? : (event?: any) => void
    onPanelClosed? : (event?: any) => void
    onPanelBackdropClick? : (event?: any) => void
    onPanelSwipe? : (event?: any) => void
    onPanelSwipeOpen? : (event?: any) => void
    onPanelBreakpoint? : (event?: any) => void
    onPanelCollapsedBreakpoint? : (event?: any) => void
    onPanelResize? : (event?: any) => void
  }
}
declare class F7Panel extends React.Component<F7Panel.Props, {}> {
  onOpen(event? : any) : unknown
  onOpened(event? : any) : unknown
  onClose(event? : any) : unknown
  onClosed(event? : any) : unknown
  onBackdropClick(event? : any) : unknown
  onSwipe(event? : any) : unknown
  onSwipeOpen(event? : any) : unknown
  onBreakpoint(event? : any) : unknown
  onCollapsedBreakpoint(event? : any) : unknown
  onResize(event? : any) : unknown
  open(animate? : any) : unknown
  close(animate? : any) : unknown
  toggle(animate? : any) : unknown
  f7Panel: PanelNamespace.Panel
}
export default F7Panel;