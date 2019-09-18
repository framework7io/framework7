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
    onPtrPullStart? : (...args: any[]) => void
    onPtrPullMove? : (...args: any[]) => void
    onPtrPullEnd? : (...args: any[]) => void
    onPtrRefresh? : (done?: any) => void
    onPtrDone? : (...args: any[]) => void
    onInfinite? : (...args: any[]) => void
    onTabShow? : (...args: any[]) => void
    onTabHide? : (...args: any[]) => void
  }
}
declare class F7PageContent extends React.Component<F7PageContent.Props, {}> {
  onPtrPullStart(el? : any) : unknown
  onPtrPullMove(el? : any) : unknown
  onPtrPullEnd(el? : any) : unknown
  onPtrRefresh(el? : any, done? : any) : unknown
  onPtrDone(el? : any) : unknown
  onInfinite(el? : any) : unknown
  onTabShow(el? : any) : unknown
  onTabHide(el? : any) : unknown
}
export default F7PageContent;