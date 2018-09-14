import React from 'react';

namespace F7Radio {
  export interface Props {
    slot? : string
    id? : string | number
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
    onChange? : Function
  }
}
class F7Radio extends React.Component<F7Radio.Props, {}> {
  onChange(event : any) : unknown
}
export default F7Radio;