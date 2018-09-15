import React from 'react';

declare namespace F7CardFooter {
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
declare class F7CardFooter extends React.Component<F7CardFooter.Props, {}> {
  
}
export default F7CardFooter;