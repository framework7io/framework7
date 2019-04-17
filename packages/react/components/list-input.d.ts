import * as React from 'react';

declare namespace F7ListInput {
  interface Props {
    slot? : string
    id? : string | number
    style? : React.CSSProperties
    className? : string
    sortable? : boolean
    media? : string
    dropdown? : string | boolean
    wrap? : boolean
    input? : boolean
    type? : string
    name? : string
    value? : string | number | Array<any> | Date | Object
    defaultValue? : string | number | Array<any>
    readonly? : boolean
    required? : boolean
    disabled? : boolean
    placeholder? : string
    inputId? : string | number
    size? : string | number
    accept? : string | number
    autocomplete? : string
    autocorrect? : string
    autocapitalize? : string
    spellcheck? : string
    autofocus? : boolean
    autosave? : string
    max? : string | number
    min? : string | number
    step? : string | number
    maxlength? : string | number
    minlength? : string | number
    multiple? : boolean
    pattern? : string
    validate? : boolean | string
    validateOnBlur? : boolean
    tabindex? : string | number
    resizable? : boolean
    clearButton? : boolean
    noFormStoreData? : boolean
    noStoreData? : boolean
    ignoreStoreData? : boolean
    errorMessage? : string
    errorMessageForce? : boolean
    info? : string
    outline? : boolean
    label? : string | number
    inlineLabel? : boolean
    floatingLabel? : boolean
    calendarParams? : Object
    colorPickerParams? : Object
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    inputStyle? : React.CSSProperties
    onCalendarChange? : (calendarValue?: any) => void
    onColorPickerChange? : (colorPickerValue?: any) => void
    onTextareaResize? : (event?: any) => void
    onInputNotEmpty? : (event?: any) => void
    onInputEmpty? : (event?: any) => void
    onInputClear? : (event?: any) => void
    onInput? : (event?: any) => void
    onFocus? : (event?: any) => void
    onBlur? : (event?: any) => void
    onChange? : (event?: any) => void
  }
}
declare class F7ListInput extends React.Component<F7ListInput.Props, {}> {
  domValue() : unknown
  inputHasValue() : unknown
  validateInput(inputEl? : any) : unknown
  onTextareaResize(event? : any) : unknown
  onInputNotEmpty(event? : any) : unknown
  onInputEmpty(event? : any) : unknown
  onInputClear(event? : any) : unknown
  onInput(event? : any) : unknown
  onFocus(event? : any) : unknown
  onBlur(event? : any) : unknown
  onChange(event? : any) : unknown
}
export default F7ListInput;