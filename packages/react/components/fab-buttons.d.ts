import * as React from 'react';

declare namespace F7FabButtons {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    position? : string
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7FabButtons extends React.Component<F7FabButtons.Props, {}> {
  
}
export default F7FabButtons;