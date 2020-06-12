import * as React from 'react';
import { Range as RangeNamespace } from 'framework7/components/range/range';

declare namespace F7Range {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    init? : boolean
    value? : number | Array<any> | string
    min? : number | string
    max? : number | string
    step? : number | string
    label? : boolean
    dual? : boolean
    vertical? : boolean
    verticalReversed? : boolean
    draggableBar? : boolean
    formatLabel? : Function
    scale? : boolean
    scaleSteps? : number
    scaleSubSteps? : number
    formatScaleLabel? : Function
    limitKnobPosition? : boolean
    name? : string
    input? : boolean
    inputId? : string
    disabled? : boolean
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
  f7Range: RangeNamespace.Range
}
export default F7Range;