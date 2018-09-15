import React from 'react';

declare namespace F7Toolbar {
  export interface Props {
    slot? : string
    id? : string | number
    bottomMd? : boolean
    tabbar? : boolean
    labels? : boolean
    scrollable? : boolean
    hidden? : boolean
    noShadow? : boolean
    noHairline? : boolean
    inner? : boolean  | true
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
  hide(animate : any) : unknown
  show(animate : any) : unknown
}
export default F7Toolbar;