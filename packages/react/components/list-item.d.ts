import * as React from 'react';
import { Tooltip as TooltipNamespace } from 'framework7/components/tooltip/tooltip';
import { SmartSelect as SmartSelectNamespace } from 'framework7/components/smart-select/smart-select';

declare namespace F7ListItem {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    title? : string | number
    text? : string | number
    media? : string
    subtitle? : string | number
    header? : string | number
    footer? : string | number
    tooltip? : string
    link? : boolean | string
    target? : string
    after? : string | number
    badge? : string | number
    badgeColor? : string
    mediaItem? : boolean
    mediaList? : boolean
    divider? : boolean
    groupTitle? : boolean
    swipeout? : boolean
    swipeoutOpened? : boolean
    sortable? : boolean
    accordionItem? : boolean
    accordionItemOpened? : boolean
    smartSelect? : boolean
    smartSelectParams? : Object
    noChevron? : boolean
    chevronCenter? : boolean
    checkbox? : boolean
    radio? : boolean
    checked? : boolean
    defaultChecked? : boolean
    indeterminate? : boolean
    name? : string
    value? : string | number | Array<any>
    readonly? : boolean
    required? : boolean
    disabled? : boolean
    virtualListIndex? : number
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
    transition? : string
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
    onSwipeoutOverswipeEnter? : (...args: any[]) => void
    onSwipeoutOverswipeExit? : (...args: any[]) => void
    onSwipeoutDeleted? : (...args: any[]) => void
    onSwipeoutDelete? : (...args: any[]) => void
    onSwipeoutClose? : (...args: any[]) => void
    onSwipeoutClosed? : (...args: any[]) => void
    onSwipeoutOpen? : (...args: any[]) => void
    onSwipeoutOpened? : (...args: any[]) => void
    onSwipeout? : (progress?: any) => void
    onAccordionBeforeClose? : (prevent?: any) => void
    onAccordionClose? : (...args: any[]) => void
    onAccordionClosed? : (...args: any[]) => void
    onAccordionBeforeOpen? : (prevent?: any) => void
    onAccordionOpen? : (...args: any[]) => void
    onAccordionOpened? : (...args: any[]) => void
    onChange? : (event?: any) => void
    onInput? : (event?: any) => void
  }
}
declare class F7ListItem extends React.Component<F7ListItem.Props, {}> {
  onClick(event? : any) : unknown
  onSwipeoutOverswipeEnter(el? : any) : unknown
  onSwipeoutOverswipeExit(el? : any) : unknown
  onSwipeoutDeleted(el? : any) : unknown
  onSwipeoutDelete(el? : any) : unknown
  onSwipeoutClose(el? : any) : unknown
  onSwipeoutClosed(el? : any) : unknown
  onSwipeoutOpen(el? : any) : unknown
  onSwipeoutOpened(el? : any) : unknown
  onSwipeout(el? : any, progress? : any) : unknown
  onAccBeforeClose(el? : any, prevent? : any) : unknown
  onAccClose(el? : any) : unknown
  onAccClosed(el? : any) : unknown
  onAccBeforeOpen(el? : any, prevent? : any) : unknown
  onAccOpen(el? : any) : unknown
  onAccOpened(el? : any) : unknown
  onChange(event? : any) : unknown
  onInput(event? : any) : unknown
  f7Tooltip: TooltipNamespace.Tooltip
  f7SmartSelect: SmartSelectNamespace.SmartSelect
}
export default F7ListItem;