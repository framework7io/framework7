import * as React from 'react';

declare namespace F7TreeviewItem {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    toggle? : boolean
    itemToggle? : boolean
    selectable? : boolean
    selected? : boolean
    opened? : boolean
    label? : string
    loadChildren? : boolean
    link? : boolean | string
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
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
    onClick? : (event?: any) => void
    onTreeviewOpen? : (event?: any) => void
    onTreeviewClose? : (event?: any) => void
    onTreeviewLoadChildren? : (...args: any[]) => void
  }
}
declare class F7TreeviewItem extends React.Component<F7TreeviewItem.Props, {}> {
  onClick(event? : any) : unknown
  onOpen(event? : any) : unknown
  onClose(event? : any) : unknown
  onLoadChildren(event? : any) : unknown
}
export default F7TreeviewItem;