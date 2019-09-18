import * as React from 'react';

declare namespace F7Block {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    inset? : boolean
    xsmallInset? : boolean
    smallInset? : boolean
    mediumInset? : boolean
    largeInset? : boolean
    xlargeInset? : boolean
    strong? : boolean
    tabs? : boolean
    tab? : boolean
    tabActive? : boolean
    accordionList? : boolean
    noHairlines? : boolean
    noHairlinesMd? : boolean
    noHairlinesIos? : boolean
    noHairlinesAurora? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onTabShow? : (...args: any[]) => void
    onTabHide? : (...args: any[]) => void
  }
}
declare class F7Block extends React.Component<F7Block.Props, {}> {
  onTabShow(el? : any) : unknown
  onTabHide(el? : any) : unknown
}
export default F7Block;