import React from 'react';

namespace F7List {
  export interface Props {
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
    onVirtualItemBeforeInsert? : Function
    onVirtualBeforeClear? : Function
    onVirtualItemsBeforeInsert? : Function
    onVirtualItemsAfterInsert? : Function
    onSortableEnable? : Function
    onSortableDisable? : Function
    onSortableSort? : Function
    onTabShow? : Function
    onTabHide? : Function
  }
}
class F7List extends React.Component<F7List.Props, {}> {
  onSortableEnable(event : any) : unknown
  onSortableDisable(event : any) : unknown
  onSortableSort(event : any) : unknown
  onTabShow(e : any) : unknown
  onTabHide(e : any) : unknown
}
export default F7List;
