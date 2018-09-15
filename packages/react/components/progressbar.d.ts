import React from 'react';

declare namespace F7Progressbar {
  export interface Props {
    slot? : string
    id? : string | number
    progress? : number
    infinite? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7Progressbar extends React.Component<F7Progressbar.Props, {}> {
  set(progress : any, speed : any) : unknown
}
export default F7Progressbar;