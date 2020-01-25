import * as React from 'react';

declare namespace F7MenuDropdown {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    contentHeight? : string
    position? : string
    left? : boolean
    center? : boolean
    right? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7MenuDropdown extends React.Component<F7MenuDropdown.Props, {}> {
  
}
export default F7MenuDropdown;