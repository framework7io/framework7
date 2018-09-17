import * as React from 'react';

declare namespace F7ListIndex {
  export interface Props {
    slot? : string
    id? : string | number
    init? : boolean  | true
    listEl? : string | Object
    indexes? : string | Array<any>  | 'auto'
    scrollList? : boolean  | true
    label? : boolean  | false
    iosItemHeight? : number  | 14
    mdItemHeight? : number  | 14
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onListIndexSelect? : Function
  }
}
declare class F7ListIndex extends React.Component<F7ListIndex.Props, {}> {
  update() : unknown
  scrollListToIndex(indexContent : any) : unknown
}
export default F7ListIndex;