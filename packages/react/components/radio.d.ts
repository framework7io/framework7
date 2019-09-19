import * as React from 'react';

declare namespace F7Radio {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    checked? : boolean
    name? : number | string
    value? : number | string | boolean
    disabled? : boolean
    readonly? : boolean
    defaultChecked? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onChange? : (event?: any) => void
  }
}
declare class F7Radio extends React.Component<F7Radio.Props, {}> {
  onChange(event? : any) : unknown
}
export default F7Radio;