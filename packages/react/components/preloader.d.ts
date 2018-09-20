import * as React from 'react';

declare namespace F7Preloader {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    size? : number | string
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7Preloader extends React.Component<F7Preloader.Props, {}> {
  
}
export default F7Preloader;