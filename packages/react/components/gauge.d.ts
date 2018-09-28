import * as React from 'react';

declare namespace F7Gauge {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    type? : string
    value? : number | string
    size? : number | string
    bgColor? : string
    borderBgColor? : string
    borderColor? : string
    borderWidth? : number | string
    valueText? : number | string
    valueTextColor? : string
    valueFontSize? : number | string
    valueFontWeight? : number | string
    labelText? : string
    labelTextColor? : string
    labelFontSize? : number | string
    labelFontWeight? : number | string
    
  }
}
declare class F7Gauge extends React.Component<F7Gauge.Props, {}> {
  
}
export default F7Gauge;