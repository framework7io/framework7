import React from 'react';

namespace F7Input {
  export interface Props {
    slot? : string
    type? : string
    name? : string
    value? : string | number | Array<any>
    defaultValue? : string | number | Array<any>
    placeholder? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    inputid? : string | number
    className? : string
    style? : React.CSSProperties
    size? : string | number
    accept? : string | number
    autocomplete? : string
    autocorrect? : string
    autocapitalize? : string
    spellcheck? : string
    autofocus? : boolean
    autosave? : string
    checked? : boolean
    disabled? : boolean
    max? : string | number
    min? : string | number
    step? : string | number
    maxlength? : string | number
    minlength? : string | number
    multiple? : boolean
    readonly? : boolean
    required? : boolean
    inputStyle? : string
    pattern? : string
    validate? : boolean | string
    tabindex? : string | number
    resizable? : boolean
    clearButton? : boolean
    noFormStoreData? : boolean
    noStoreData? : boolean
    ignoreStoreData? : boolean
    errorMessage? : string
    errorMessageForce? : boolean
    info? : string
    wrap? : boolean  | true
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onTextareaResize? : Function
    onInputNotEmpty? : Function
    onInputEmpty? : Function
    onInputClear? : Function
    onInput? : Function
    onFocus? : Function
    onBlur? : Function
    onChange? : Function
  }
}
class F7Input extends React.Component<F7Input.Props, {}> {
  onTextareaResize(event : any) : unknown
  onInputNotEmpty(event : any) : unknown
  onInputEmpty(event : any) : unknown
  onInputClear(event : any) : unknown
  onInput(event : any) : unknown
  onFocus(event : any) : unknown
  onBlur(event : any) : unknown
  onChange(event : any) : unknown
}
export default F7Input;
