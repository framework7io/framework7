import * as React from 'react';

declare namespace F7Chip {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    media? : string
    text? : string | number
    deleteable? : boolean
    mediaBgColor? : string
    mediaTextColor? : string
    outline? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    icon? : string
    iconMaterial? : string
    iconF7? : string
    iconIos? : string
    iconMd? : string
    iconAurora? : string
    iconColor? : string
    iconSize? : string | number
    onClick? : (event?: any) => void
    onDelete? : (event?: any) => void
  }
}
declare class F7Chip extends React.Component<F7Chip.Props, {}> {
  onClick(event? : any) : unknown
  onDeleteClick(event? : any) : unknown
}
export default F7Chip;