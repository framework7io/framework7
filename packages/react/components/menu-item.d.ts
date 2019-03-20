import * as React from 'react';

declare namespace F7MenuItem {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    text? : string
    iconOnly? : boolean
    href? : string
    link? : boolean
    target? : string
    dropdown? : boolean
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
    iconIos? : string
    iconMd? : string
    iconAurora? : string
    iconColor? : string
    iconSize? : string | number
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
    onClick? : (e?: any) => void
    onMenuOpened? : (e?: any) => void
    onMenuClosed? : (e?: any) => void
  }
}
declare class F7MenuItem extends React.Component<F7MenuItem.Props, {}> {
  onClick(e? : any) : unknown
  onOpened(e? : any) : unknown
  onClosed(e? : any) : unknown
}
export default F7MenuItem;