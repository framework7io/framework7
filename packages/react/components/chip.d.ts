import * as React from 'react';
import { Tooltip as TooltipNamespace } from 'framework7/components/tooltip/tooltip';

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
    tooltip? : string
    tooltipTrigger? : string
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
  f7Tooltip: TooltipNamespace.Tooltip
}
export default F7Chip;