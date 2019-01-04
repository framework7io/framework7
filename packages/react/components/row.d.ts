import * as React from 'react';

declare namespace F7Row {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    noGap? : boolean
    tag? : string
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onClick? : (event?: any) => void
  }
}
declare class F7Row extends React.Component<F7Row.Props, {}> {
  onClick(event? : any) : unknown
}
export default F7Row;