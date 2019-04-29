import * as React from 'react';

declare namespace F7Page {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    name? : string
    stacked? : boolean
    withSubnavbar? : boolean
    subnavbar? : boolean
    withNavbarLarge? : boolean
    navbarLarge? : boolean
    noNavbar? : boolean
    noToolbar? : boolean
    tabs? : boolean
    pageContent? : boolean
    noSwipeback? : boolean
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
    onPageMounted? : (event?: any, page?: any) => void
    onPageInit? : (event?: any, page?: any) => void
    onPageReinit? : (event?: any, page?: any) => void
    onPageBeforeIn? : (event?: any, page?: any) => void
    onPageBeforeOut? : (event?: any, page?: any) => void
    onPageAfterOut? : (event?: any, page?: any) => void
    onPageAfterIn? : (event?: any, page?: any) => void
    onPageBeforeRemove? : (event?: any, page?: any) => void
  }
}
declare class F7Page extends React.Component<F7Page.Props, {}> {
  onPtrPullStart(event? : any) : unknown
  onPtrPullMove(event? : any) : unknown
  onPtrPullEnd(event? : any) : unknown
  onPtrRefresh(event? : any) : unknown
  onPtrDone(event? : any) : unknown
  onInfinite(event? : any) : unknown
  onPageMounted(event? : any) : unknown
  onPageStack() : unknown
  onPageUnstack() : unknown
  onPagePosition(event? : any) : unknown
  onPageRole(event? : any) : unknown
  onPageMasterStack() : unknown
  onPageMasterUnstack() : unknown
  onPageNavbarLargeCollapsed() : unknown
  onPageNavbarLargeExpanded() : unknown
  onPageInit(event? : any) : unknown
  onPageReinit(event? : any) : unknown
  onPageBeforeIn(event? : any) : unknown
  onPageBeforeOut(event? : any) : unknown
  onPageAfterOut(event? : any) : unknown
  onPageAfterIn(event? : any) : unknown
  onPageBeforeRemove(event? : any) : unknown
  onCardOpened() : unknown
  onCardClose() : unknown
}
export default F7Page;