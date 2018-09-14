import React from 'react';

namespace F7PageContent {
  export interface Props {
    slot? : string
    id? : string | number
    tab? : boolean
    tabActive? : boolean
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
    onTabShow? : Function
    onTabHide? : Function
  }
}
class F7PageContent extends React.Component<F7PageContent.Props, {}> {
  onPtrPullStart(event : any) : unknown
  onPtrPullMove(event : any) : unknown
  onPtrPullEnd(event : any) : unknown
  onPtrRefresh(event : any) : unknown
  onPtrDone(event : any) : unknown
  onInfinite(event : any) : unknown
  onTabShow(e : any) : unknown
  onTabHide(e : any) : unknown
}
export default F7PageContent;