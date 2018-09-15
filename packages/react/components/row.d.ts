import * as React from 'react';

declare namespace F7Row {
  export interface Props {
    slot? : string
    id? : string | number
    noGap? : boolean
    tag? : string  | 'div'
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
declare class F7Row extends React.Component<F7Row.Props, {}> {
  onClick(e : any) : unknown
}
export default F7Row;