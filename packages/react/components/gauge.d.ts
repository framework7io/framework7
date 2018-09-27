import * as React from 'react';

declare namespace F7Gauge {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    type? : string  | 'circle'
    value? : number | string  | 0
    size? : number | string  | 200
    bgColor? : string  | 'transparent'
    borderBgColor? : string  | '#eeeeee'
    borderColor? : string  | '#000000'
    borderWidth? : number | string  | 10
    valueText? : number | string
    valueTextColor? : string  | '#000000'
    valueFontSize? : number | string  | 31
    valueFontWeight? : number | string  | 500
    labelText? : string
    labelTextColor? : string  | '#888888'
    labelFontSize? : number | string  | 14
    labelFontWeight? : number | string  | 400
    
  }
}
declare class F7Gauge extends React.Component<F7Gauge.Props, {}> {
  
}
export default F7Gauge;