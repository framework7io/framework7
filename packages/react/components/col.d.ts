import * as React from 'react';

declare namespace F7Col {
  export interface Props {
    slot? : string
    id? : string | number
    tag? : string  | 'div'
    width? : number | string  | 'auto'
    tabletWidth? : number | string
    desktopWidth? : number | string
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onClick? : Function
  }
}
declare class F7Col extends React.Component<F7Col.Props, {}> {
  onClick(e : any) : unknown
}
export default F7Col;