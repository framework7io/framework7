import React from 'react';

declare namespace F7Preloader {
  export interface Props {
    slot? : string
    id? : string | number
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