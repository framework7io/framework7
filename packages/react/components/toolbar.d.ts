import * as React from 'react';

declare namespace F7Toolbar {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    tabbar? : boolean
    labels? : boolean
    scrollable? : boolean
    hidden? : boolean
    noShadow? : boolean
    noHairline? : boolean
    noBorder? : boolean
    position? : string
    topMd? : boolean
    topIos? : boolean
    topAurora? : boolean
    top? : boolean
    bottomMd? : boolean
    bottomIos? : boolean
    bottomAurora? : boolean
    bottom? : boolean
    inner? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7Toolbar extends React.Component<F7Toolbar.Props, {}> {
  hide(animate? : any) : unknown
  show(animate? : any) : unknown
}
export default F7Toolbar;