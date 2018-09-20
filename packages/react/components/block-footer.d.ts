import * as React from 'react';

declare namespace F7BlockFooter {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7BlockFooter extends React.Component<F7BlockFooter.Props, {}> {
  
}
export default F7BlockFooter;