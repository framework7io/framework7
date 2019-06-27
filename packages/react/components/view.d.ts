import * as React from 'react';
import { View as ViewNamespace } from 'framework7/components/view/view';

declare namespace F7View {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    tab? : boolean
    tabActive? : boolean
    name? : string
    router? : boolean
    linksView? : Object | string
    url? : string
    main? : boolean
    stackPages? : boolean
    xhrCache? : boolean
    xhrCacheIgnore? : Array<any>
    xhrCacheIgnoreGetParameters? : boolean
    xhrCacheDuration? : number
    preloadPreviousPage? : boolean
    allowDuplicateUrls? : boolean
    reloadPages? : boolean
    reloadDetail? : boolean
    masterDetailBreakpoint? : number
    removeElements? : boolean
    removeElementsWithTimeout? : boolean
    removeElementsTimeout? : number
    restoreScrollTopOnBack? : boolean
    iosSwipeBack? : boolean
    iosSwipeBackAnimateShadow? : boolean
    iosSwipeBackAnimateOpacity? : boolean
    iosSwipeBackActiveArea? : number
    iosSwipeBackThreshold? : number
    mdSwipeBack? : boolean
    mdSwipeBackAnimateShadow? : boolean
    mdSwipeBackAnimateOpacity? : boolean
    mdSwipeBackActiveArea? : number
    mdSwipeBackThreshold? : number
    auroraSwipeBack? : boolean
    auroraSwipeBackAnimateShadow? : boolean
    auroraSwipeBackAnimateOpacity? : boolean
    auroraSwipeBackActiveArea? : number
    auroraSwipeBackThreshold? : number
    pushState? : boolean
    pushStateRoot? : string
    pushStateAnimate? : boolean
    pushStateAnimateOnLoad? : boolean
    pushStateSeparator? : string
    pushStateOnLoad? : boolean
    animate? : boolean
    iosDynamicNavbar? : boolean
    iosSeparateDynamicNavbar? : boolean
    iosAnimateNavbarBackIcon? : boolean
    materialPageLoadDelay? : number
    passRouteQueryToRequest? : boolean
    passRouteParamsToRequest? : boolean
    routes? : Array<any>
    routesAdd? : Array<any>
    routesBeforeEnter? : Function | Array<any>
    routesBeforeLeave? : Function | Array<any>
    init? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onViewInit? : (view?: any) => void
    onSwipeBackMove? : (swipeBackData?: any) => void
    onSwipeBackBeforeChange? : (swipeBackData?: any) => void
    onSwipeBackAfterChange? : (swipeBackData?: any) => void
    onSwipeBackBeforeReset? : (swipeBackData?: any) => void
    onSwipeBackAfterReset? : (swipeBackData?: any) => void
    onTabShow? : (...args: any[]) => void
    onTabHide? : (...args: any[]) => void
  }
}
declare class F7View extends React.Component<F7View.Props, {}> {
  onViewInit(view? : any) : unknown
  onSwipeBackMove(data? : any) : unknown
  onSwipeBackBeforeChange(data? : any) : unknown
  onSwipeBackAfterChange(data? : any) : unknown
  onSwipeBackBeforeReset(data? : any) : unknown
  onSwipeBackAfterReset(data? : any) : unknown
  onTabShow(el? : any) : unknown
  onTabHide(el? : any) : unknown
  f7View: ViewNamespace.View
}
export default F7View;