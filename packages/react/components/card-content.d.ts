import React from 'react';

namespace F7CardContent {
  export interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    padding? : boolean  | true
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
class F7CardContent extends React.Component<F7CardContent.Props, {}> {
  
}
export default F7CardContent;
