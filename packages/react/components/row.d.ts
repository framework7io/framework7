import React from 'react';

namespace F7Row {
  export interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
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
class F7Row extends React.Component<F7Row.Props, {}> {
  onClick(e : any) : unknown
}
export default F7Row;
