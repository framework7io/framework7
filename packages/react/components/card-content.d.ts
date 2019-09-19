import * as React from 'react';

declare namespace F7CardContent {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    padding? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7CardContent extends React.Component<F7CardContent.Props, {}> {
  
}
export default F7CardContent;