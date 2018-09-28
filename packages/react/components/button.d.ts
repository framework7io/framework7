import * as React from 'react';
import { Tooltip as TooltipNamespace } from 'framework7/components/tooltip/tooltip';

declare namespace F7Button {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    noFastclick? : boolean
    noFastClick? : boolean
    text? : string
    tabLink? : boolean | string
    tabLinkActive? : boolean
    href? : string | boolean
    target? : string
    round? : boolean
    roundMd? : boolean
    roundIos? : boolean
    fill? : boolean
    fillMd? : boolean
    fillIos? : boolean
    big? : boolean
    bigMd? : boolean
    bigIos? : boolean
    small? : boolean
    smallMd? : boolean
    smallIos? : boolean
    raised? : boolean
    outline? : boolean
    active? : boolean
    disabled? : boolean
    tooltip? : string
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    icon? : string
    iconMaterial? : string
    iconIon? : string
    iconFa? : string
    iconF7? : string
    iconIfMd? : string
    iconIfIos? : string
    iconIos? : string
    iconMd? : string
    iconColor? : string
    iconSize? : string | number
    back? : boolean
    external? : boolean
    force? : boolean
    animate? : boolean
    ignoreCache? : boolean
    pageName? : string
    reloadCurrent? : boolean
    reloadAll? : boolean
    reloadPrevious? : boolean
    routeTabId? : string
    view? : string
    searchbarEnable? : boolean | string
    searchbarDisable? : boolean | string
    searchbarClear? : boolean | string
    searchbarToggle? : boolean | string
    panelOpen? : boolean | string
    panelClose? : boolean | string
    popupOpen? : boolean | string
    popupClose? : boolean | string
    actionsOpen? : boolean | string
    actionsClose? : boolean | string
    popoverOpen? : boolean | string
    popoverClose? : boolean | string
    loginScreenOpen? : boolean | string
    loginScreenClose? : boolean | string
    sheetOpen? : boolean | string
    sheetClose? : boolean | string
    sortableEnable? : boolean | string
    sortableDisable? : boolean | string
    sortableToggle? : boolean | string
    onClick? : (event?: any) => void
  }
}
declare class F7Button extends React.Component<F7Button.Props, {}> {
  onClick(event? : any) : unknown
  f7Tooltip: TooltipNamespace.Tooltip
}
export default F7Button;