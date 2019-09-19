import * as React from 'react';

declare namespace F7BlockTitle {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    large? : boolean
    medium? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7BlockTitle extends React.Component<F7BlockTitle.Props, {}> {
  
}
export default F7BlockTitle;