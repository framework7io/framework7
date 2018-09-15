import React from 'react';

declare namespace F7MessagebarSheet {
  export interface Props {
    slot? : string
    id? : string | number
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