import React from 'react';

declare namespace F7Block {
  export interface Props {
    slot? : string
    id? : string | number
    inset? : boolean
    tabletInset? : boolean
    strong? : boolean
    tabs? : boolean
    tab? : boolean
    tabActive? : boolean
    accordionList? : boolean
    noHairlines? : boolean
    noHairlinesMd? : boolean
    noHairlinesIos? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onTabShow? : Function
    onTabHide? : Function
  }
}
declare class F7Block extends React.Component<F7Block.Props, {}> {
  onTabShow(e : any) : unknown
  onTabHide(e : any) : unknown
}
export default F7Block;