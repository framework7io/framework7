import React from 'react';

namespace F7ListItemContent {
  export interface Props {
    slot? : string
    id? : string | number
    title? : string | number
    text? : string | number
    media? : string
    subtitle? : string | number
    header? : string | number
    footer? : string | number
    after? : string | number
    badge? : string | number
    badgeColor? : string
    mediaList? : boolean
    mediaItem? : boolean
    itemInput? : boolean
    itemInputWithInfo? : boolean
    inlineLabel? : boolean
    checkbox? : boolean
    checked? : boolean
    defaultChecked? : boolean
    radio? : boolean
    name? : string
    value? : string | number | Array<any>
    readonly? : boolean
    required? : boolean
    disabled? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onClick? : Function
    onChange? : Function
  }
}
class F7ListItemContent extends React.Component<F7ListItemContent.Props, {}> {
  checkHasInputState() : unknown
  onClick(event : any) : unknown
  onChange(event : any) : unknown
}
export default F7ListItemContent;