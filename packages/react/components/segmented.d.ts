import * as React from 'react';

declare namespace F7Segmented {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    raised? : boolean
    raisedIos? : boolean
    raisedMd? : boolean
    raisedAurora? : boolean
    round? : boolean
    roundIos? : boolean
    roundMd? : boolean
    roundAurora? : boolean
    tag? : string
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