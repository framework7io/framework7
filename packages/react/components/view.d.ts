import React from 'react';

namespace F7View {
  export interface Props {
    slot? : string
    id? : string | number
    tab? : boolean
    tabActive? : boolean
    name? : string
    router? : boolean
    linksView? : Object | string
    url? : string
    main? : boolean
    stackPages? : boolean
    xhrCache? : string
    xhrCacheIgnore? : Array<any>
    xhrCacheIgnoreGetParameters? : boolean
    xhrCacheDuration? : number
    preloadPreviousPage? : boolean
    allowDuplicateUrls? : boolean
    reloadPages? : boolean
    removeElements? : boolean
    removeElementsWithTimeout? : boolean
    removeElementsTimeout? : number
    restoreScrollTopOnBack? : boolean
    iosSwipeBack? : boolean
    iosSwipeBackAnimateShadow? : boolean
    iosSwipeBackAnimateOpacity? : boolean
    iosSwipeBackActiveArea? : number
    iosSwipeBackThreshold? : number
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
    init? : boolean  | true
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onSwipeBackMove? : Function
    onSwipeBackBeforeChange? : Function
    onSwipeBackAfterChange? : Function
    onSwipeBackBeforeReset? : Function
    onSwipeBackAfterReset? : Function
    onTabShow? : Function
    onTabHide? : Function
  }
}
class F7View extends React.Component<F7View.Props, {}> {
  onSwipeBackMove(event : any) : unknown
  onSwipeBackBeforeChange(event : any) : unknown
  onSwipeBackAfterChange(event : any) : unknown
  onSwipeBackBeforeReset(event : any) : unknown
  onSwipeBackAfterReset(event : any) : unknown
  onTabShow(e : any) : unknown
  onTabHide(e : any) : unknown
}
export default F7View;