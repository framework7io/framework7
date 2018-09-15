import * as React from 'react';

declare namespace F7Segmented {
  export interface Props {
    slot? : string
    id? : string | number
    raised? : boolean
    round? : boolean
    tag? : string  | 'div'
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7Segmented extends React.Component<F7Segmented.Props, {}> {
  
}
export default F7Segmented;