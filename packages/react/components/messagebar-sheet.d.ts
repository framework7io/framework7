import * as React from 'react';

declare namespace F7MessagebarSheet {
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
declare class F7MessagebarSheet extends React.Component<F7MessagebarSheet.Props, {}> {
  
}
export default F7MessagebarSheet;