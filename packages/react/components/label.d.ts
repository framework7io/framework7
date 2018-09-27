import * as React from 'react';

declare namespace F7Label {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    floating? : boolean
    inline? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7Label extends React.Component<F7Label.Props, {}> {
  
}
export default F7Label;