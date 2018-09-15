import React from 'react';

declare namespace F7BlockFooter {
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
declare class F7BlockFooter extends React.Component<F7BlockFooter.Props, {}> {
  
}
export default F7BlockFooter;