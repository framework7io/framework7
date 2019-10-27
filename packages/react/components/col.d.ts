import * as React from 'react';

declare namespace F7Col {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    tag? : string
    width? : number | string
    xsmall? : number | string
    small? : number | string
    medium? : number | string
    large? : number | string
    xlarge? : number | string
    resizable? : boolean
    resizableFixed? : boolean
    resizableAbsolute? : boolean
    resizableHandler? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onClick? : (event?: any) => void
    onGridResize? : (...args: any[]) => void
  }
}
declare class F7Col extends React.Component<F7Col.Props, {}> {
  onClick(event? : any) : unknown
  onResize(el? : any) : unknown
}
export default F7Col;