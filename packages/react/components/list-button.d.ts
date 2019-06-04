import * as React from 'react';
import { Tooltip as TooltipNamespace } from 'framework7/components/tooltip/tooltip';

declare namespace F7ListButton {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    noFastclick? : boolean
    noFastClick? : boolean
    title? : string | number
    text? : string | number
    tabLink? : boolean | string
    tabLinkActive? : boolean
    link? : boolean | string
    href? : boolean | string
    target? : string
    tooltip? : string
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    back? : boolean
    external? : boolean
    force? : boolean
    animate? : boolean
    ignoreCache? : boolean
    reloadCurrent? : boolean
    reloadAll? : boolean
    reloadPrevious? : boolean
    reloadDetail? : boolean
    routeTabId? : string
    view? : string
    routeProps? : Object
    preventRouter? : boolean
    searchbarEnable? : boolean | string
    searchbarDisable? : boolean | string
    searchbarClear? : boolean | string
    searchbarToggle? : boolean | string
    panelOpen? : boolean | string
    panelClose? : boolean | string
    panelToggle? : boolean | string
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
    cardOpen? : boolean | string
    cardPreventOpen? : boolean | string
    cardClose? : boolean | string
    menuClose? : boolean | string
    onClick? : (event?: any) => void
  }
}
declare class F7ListButton extends React.Component<F7ListButton.Props, {}> {
  onClick(event? : any) : unknown
  f7Tooltip: TooltipNamespace.Tooltip
}
export default F7ListButton;