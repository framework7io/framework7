import * as React from 'react';

declare namespace F7ListItemContent {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
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
    checkbox? : boolean
    checked? : boolean
    defaultChecked? : boolean
    indeterminate? : boolean
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
    onClick? : (event?: any) => void
    onChange? : (event?: any) => void
  }
}
declare class F7ListItemContent extends React.Component<F7ListItemContent.Props, {}> {
  onClick(event? : any) : unknown
  onChange(event? : any) : unknown
}
export default F7ListItemContent;