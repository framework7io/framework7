import * as React from 'react';

declare namespace F7Range {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    init? : boolean  | true
    value? : number | Array<any> | string  | 0
    min? : number | string  | 0
    max? : number | string  | 100
    step? : number | string  | 1
    label? : boolean  | false
    dual? : boolean  | false
    name? : string
    inputId? : string
    input? : boolean
    disabled? : boolean
    draggableBar? : boolean  | true
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onRangeChange? : (val?: any) => void
    onRangeChanged? : (val?: any) => void
  }
}
declare class F7Range extends React.Component<F7Range.Props, {}> {
  setValue(newValue? : any) : unknown
  getValue() : unknown
}
export default F7Range;