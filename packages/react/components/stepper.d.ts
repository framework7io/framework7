import * as React from 'react';
import { Stepper as StepperNamespace } from 'framework7/components/stepper/stepper';

declare namespace F7Stepper {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    init? : boolean
    value? : number
    min? : number
    max? : number
    step? : number
    formatValue? : Function
    name? : string
    inputId? : string
    input? : boolean
    inputType? : string
    inputReadonly? : boolean
    autorepeat? : boolean
    autorepeatDynamic? : boolean
    wraps? : boolean
    manualInputMode? : boolean
    decimalPoint? : number
    buttonsEndInputMode? : boolean
    disabled? : boolean
    buttonsOnly? : boolean
    round? : boolean
    roundMd? : boolean
    roundIos? : boolean
    roundAurora? : boolean
    fill? : boolean
    fillMd? : boolean
    fillIos? : boolean
    fillAurora? : boolean
    large? : boolean
    largeMd? : boolean
    largeIos? : boolean
    largeAurora? : boolean
    small? : boolean
    smallMd? : boolean
    smallIos? : boolean
    smallAurora? : boolean
    raised? : boolean
    raisedMd? : boolean
    raisedIos? : boolean
    raisedAurora? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onStepperChange? : (newValue?: any) => void
    onInput? : (event?: any, stepper?: any) => void
    onChange? : (event?: any, stepper?: any) => void
    onStepperMinusClick? : (event?: any, stepper?: any) => void
    onStepperPlusClick? : (event?: any, stepper?: any) => void
  }
}
declare class F7Stepper extends React.Component<F7Stepper.Props, {}> {
  increment() : unknown
  decrement() : unknown
  setValue(newValue? : any) : unknown
  getValue() : unknown
  onInput(event? : any) : unknown
  onChange(event? : any) : unknown
  onMinusClick(event? : any) : unknown
  onPlusClick(event? : any) : unknown
  f7Stepper: StepperNamespace.Stepper
}
export default F7Stepper;