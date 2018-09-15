import React from 'react';

declare namespace F7Stepper {
  export interface Props {
    slot? : string
    id? : string | number
    init? : boolean  | true
    value? : number  | 0
    min? : number  | 0
    max? : number  | 100
    step? : number  | 1
    formatValue? : Function
    input? : boolean  | true
    inputType? : string  | 'text'
    inputReadonly? : boolean  | false
    autorepeat? : boolean  | false
    autorepeatDynamic? : boolean  | false
    wraps? : boolean  | false
    manualInputMode? : boolean  | false
    decimalPoint? : number  | 4
    buttonsEndInputMode? : boolean  | true
    disabled? : boolean
    buttonsOnly? : boolean
    round? : boolean
    roundMd? : boolean
    roundIos? : boolean
    fill? : boolean
    fillMd? : boolean
    fillIos? : boolean
    big? : boolean
    bigMd? : boolean
    bigIos? : boolean
    small? : boolean
    smallMd? : boolean
    smallIos? : boolean
    raised? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onStepperChange? : Function
    onInput? : Function
    onStepperMinusClick? : Function
    onStepperPlusClick? : Function
  }
}
declare class F7Stepper extends React.Component<F7Stepper.Props, {}> {
  increment() : unknown
  decrement() : unknown
  setValue(newValue : any) : unknown
  getValue() : unknown
  onInput(e : any) : unknown
  onMinusClick(e : any) : unknown
  onPlusClick(e : any) : unknown
}
export default F7Stepper;