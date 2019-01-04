import * as React from 'react';

declare namespace F7SkeletonText {
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
declare class F7SkeletonText extends React.Component<F7SkeletonText.Props, {}> {
  
}
export default F7SkeletonText;