import * as React from 'react';

declare namespace F7NavTitle {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    title? : string
    subtitle? : string
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
declare class F7NavTitle extends React.Component<F7NavTitle.Props, {}> {
  
}
export default F7NavTitle;