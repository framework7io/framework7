import * as React from 'react';

declare namespace F7NavRight {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    sliding? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7NavRight extends React.Component<F7NavRight.Props, {}> {
  
}
export default F7NavRight;