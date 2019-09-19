import * as React from 'react';

declare namespace F7Appbar {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    noShadow? : boolean
    noHairline? : boolean
    inner? : boolean
    innerClass? : string
    innerClassName? : string
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7Appbar extends React.Component<F7Appbar.Props, {}> {
  
}
export default F7Appbar;