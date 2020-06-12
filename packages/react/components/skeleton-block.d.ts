import * as React from 'react';

declare namespace F7SkeletonBlock {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    width? : number | string
    height? : number | string
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
declare class F7SkeletonBlock extends React.Component<F7SkeletonBlock.Props, {}> {
  
}
export default F7SkeletonBlock;