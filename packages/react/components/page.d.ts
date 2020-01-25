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
    onPtrPullStart? : (...args: any[]) => void
    onPtrPullMove? : (...args: any[]) => void
    onPtrPullEnd? : (...args: any[]) => void
    onPtrRefresh? : (...args: any[]) => void
    onPtrDone? : (...args: any[]) => void
    onInfinite? : (...args: any[]) => void
    onPageMounted? : (page?: any) => void
    onPageInit? : (page?: any) => void
    onPageReinit? : (page?: any) => void
    onPageBeforeIn? : (page?: any) => void
    onPageBeforeOut? : (page?: any) => void
    onPageAfterOut? : (page?: any) => void
    onPageAfterIn? : (page?: any) => void
    onPageBeforeRemove? : (page?: any) => void
  }
}
declare class F7Page extends React.Component<F7Page.Props, {}> {
  onPtrPullStart(...args : any[]) : unknown
  onPtrPullMove(...args : any[]) : unknown
  onPtrPullEnd(...args : any[]) : unknown
  onPtrRefresh(...args : any[]) : unknown
  onPtrDone(...args : any[]) : unknown
  onInfinite(...args : any[]) : unknown
  onPageMounted(page? : any) : unknown
  onPageInit(page? : any) : unknown
  onPageReinit(page? : any) : unknown
  onPageBeforeIn(page? : any) : unknown
  onPageBeforeOut(page? : any) : unknown
  onPageAfterOut(page? : any) : unknown
  onPageAfterIn(page? : any) : unknown
  onPageBeforeRemove(page? : any) : unknown
  onPageStack(pageEl? : any) : unknown
  onPageUnstack(pageEl? : any) : unknown
  onPagePosition(pageEl? : any, position? : any) : unknown
  onPageRole(pageEl? : any, rolesData? : any) : unknown
  onPageMasterStack(pageEl? : any) : unknown
  onPageMasterUnstack(pageEl? : any) : unknown
  onPageNavbarLargeCollapsed(pageEl? : any) : unknown
  onPageNavbarLargeExpanded(pageEl? : any) : unknown
  onCardOpened(cardEl? : any, pageEl? : any) : unknown
  onCardClose(cardEl? : any, pageEl? : any) : unknown
}
export default F7Page;