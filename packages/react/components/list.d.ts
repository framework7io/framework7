import * as React from 'react';
import { VirtualList as VirtualListNamespace } from 'framework7/components/virtual-list/virtual-list';

declare namespace F7List {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    inset? : boolean
    tabletInset? : boolean
    mediaList? : boolean
    sortable? : boolean
    sortableEnabled? : boolean
    accordionList? : boolean
    contactsList? : boolean
    simpleList? : boolean
    linksList? : boolean
    noHairlines? : boolean
    noHairlinesBetween? : boolean
    noHairlinesMd? : boolean
    noHairlinesBetweenMd? : boolean
    noHairlinesIos? : boolean
    noHairlinesBetweenIos? : boolean
    noHairlinesAurora? : boolean
    noHairlinesBetweenAurora? : boolean
    noChevron? : boolean
    chevronCenter? : boolean
    tab? : boolean
    tabActive? : boolean
    form? : boolean
    formStoreData? : boolean
    inlineLabels? : boolean
    virtualList? : boolean
    virtualListParams? : Object
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onVirtualItemBeforeInsert? : (vl?: any, itemEl?: any, item?: any) => void
    onVirtualBeforeClear? : (vl?: any, fragment?: any) => void
    onVirtualItemsBeforeInsert? : (vl?: any, fragment?: any) => void
    onVirtualItemsAfterInsert? : (vl?: any, fragment?: any) => void
    onSubmit? : (event?: any) => void
    onSortableEnable? : (event?: any) => void
    onSortableDisable? : (event?: any) => void
    onSortableSort? : (event?: any, sortData?: any) => void
    onTabShow? : (event?: any) => void
    onTabHide? : (event?: any) => void
  }
}
declare class F7List extends React.Component<F7List.Props, {}> {
  onSubmit(event? : any) : unknown
  onSortableEnable(event? : any) : unknown
  onSortableDisable(event? : any) : unknown
  onSortableSort(event? : any) : unknown
  onTabShow(event? : any) : unknown
  onTabHide(event? : any) : unknown
  f7VirtualList: VirtualListNamespace.VirtualList
}
export default F7List;