import * as React from 'react';
import { ListIndex as ListIndexNamespace } from 'framework7/components/list-index/list-index';

declare namespace F7ListIndex {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    init? : boolean
    listEl? : string | Object
    indexes? : string | Array<any>
    scrollList? : boolean
    label? : boolean
    iosItemHeight? : number
    mdItemHeight? : number
    auroraItemHeight? : number
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onListIndexSelect? : (itemContent?: any, itemIndex?: any) => void
  }
}
declare class F7ListIndex extends React.Component<F7ListIndex.Props, {}> {
  update() : unknown
  scrollListToIndex(indexContent? : any) : unknown
  f7ListIndex: ListIndexNamespace.ListIndex
}
export default F7ListIndex;