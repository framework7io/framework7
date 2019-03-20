import * as React from 'react';

declare namespace F7PageContent {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    tab? : boolean
    tabActive? : boolean
    ptr? : boolean
    ptrDistance? : number
    ptrPreloader? : boolean
    ptrBottom? : boolean
    ptrMousewheel? : boolean
    infinite? : boolean
    infiniteTop? : boolean
    infiniteDistance? : number
    infinitePreloader? : boolean
    hideBarsOnScroll? : boolean
    hideNavbarOnScroll? : boolean
    hideToolbarOnScroll? : boolean
    messagesContent? : boolean
    loginScreen? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onPtrPullStart? : (event?: any) => void
    onPtrPullMove? : (event?: any) => void
    onPtrPullEnd? : (event?: any) => void
    onPtrRefresh? : (event?: any, done?: any) => void
    onPtrDone? : (event?: any) => void
    onInfinite? : (event?: any) => void
    onTabShow? : (event?: any) => void
    onTabHide? : (event?: any) => void
  }
}
declare class F7PageContent extends React.Component<F7PageContent.Props, {}> {
  onPtrPullStart(event? : any) : unknown
  onPtrPullMove(event? : any) : unknown
  onPtrPullEnd(event? : any) : unknown
  onPtrRefresh(event? : any) : unknown
  onPtrDone(event? : any) : unknown
  onInfinite(event? : any) : unknown
  onTabShow(event? : any) : unknown
  onTabHide(event? : any) : unknown
}
export default F7PageContent;