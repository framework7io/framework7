import React from 'react';

declare namespace F7Page {
  export interface Props {
    slot? : string
    id? : string | number
    name? : string
    stacked? : boolean
    withSubnavbar? : boolean
    subnavbar? : boolean
    noNavbar? : boolean
    noToolbar? : boolean
    tabs? : boolean
    pageContent? : boolean  | true
    noSwipeback? : boolean
    ptr? : boolean
    ptrDistance? : number
    ptrPreloader? : boolean  | true
    infinite? : boolean
    infiniteTop? : boolean
    infiniteDistance? : number
    infinitePreloader? : boolean  | true
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
    onPtrPullStart? : Function
    onPtrPullMove? : Function
    onPtrPullEnd? : Function
    onPtrRefresh? : Function
    onPtrDone? : Function
    onInfinite? : Function
    onPageMounted? : Function
    onPageInit? : Function
    onPageReinit? : Function
    onPageBeforeIn? : Function
    onPageBeforeOut? : Function
    onPageAfterOut? : Function
    onPageAfterIn? : Function
    onPageBeforeRemove? : Function
  }
}
declare class F7Page extends React.Component<F7Page.Props, {}> {
  onPtrPullStart(event : any) : unknown
  onPtrPullMove(event : any) : unknown
  onPtrPullEnd(event : any) : unknown
  onPtrRefresh(event : any) : unknown
  onPtrDone(event : any) : unknown
  onInfinite(event : any) : unknown
  onPageMounted(event : any) : unknown
  onPageInit(event : any) : unknown
  onPageReinit(event : any) : unknown
  onPageBeforeIn(event : any) : unknown
  onPageBeforeOut(event : any) : unknown
  onPageAfterOut(event : any) : unknown
  onPageAfterIn(event : any) : unknown
  onPageBeforeRemove(event : any) : unknown
}
export default F7Page;