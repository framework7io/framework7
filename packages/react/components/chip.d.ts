import React from 'react';

declare namespace F7Chip {
  export interface Props {
    slot? : string
    id? : string | number
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
    onClick? : Function
    onDelete? : Function
  }
}
declare class F7Chip extends React.Component<F7Chip.Props, {}> {
  onClick(event : any) : unknown
  onDeleteClick(event : any) : unknown
}
export default F7Chip;