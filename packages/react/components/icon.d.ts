import * as React from 'react';

declare namespace F7Icon {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    material? : string
    f7? : string
    ion? : string
    fa? : string
    icon? : string
    ifMd? : string
    ifIos? : string
    ios? : string
    md? : string
    tooltip? : string
    size? : string | number
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7Icon extends React.Component<F7Icon.Props, {}> {
  
}
export default F7Icon;