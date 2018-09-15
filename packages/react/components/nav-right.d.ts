import React from 'react';

declare namespace F7NavRight {
  export interface Props {
    slot? : string
    id? : string | number
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
declare class F7NavRight extends React.Component<F7NavRight.Props, {}> {
  
}
export default F7NavRight;