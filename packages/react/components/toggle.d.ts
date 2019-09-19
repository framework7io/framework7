import * as React from 'react';
import { Toggle as ToggleNamespace } from 'framework7/components/toggle/toggle';

declare namespace F7Toggle {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    init? : boolean
    checked? : boolean
    defaultChecked? : boolean
    disabled? : boolean
    readonly? : boolean
    name? : string
    value? : string | number | Array<any>
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onToggleChange? : (checked?: any) => void
    onChange? : (event?: any) => void
  }
}
declare class F7Toggle extends React.Component<F7Toggle.Props, {}> {
  toggle() : unknown
  onChange(event? : any) : unknown
  f7Toggle: ToggleNamespace.Toggle
}
export default F7Toggle;