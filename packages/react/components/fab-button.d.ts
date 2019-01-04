import * as React from 'react';
import { Tooltip as TooltipNamespace } from 'framework7/components/tooltip/tooltip';

declare namespace F7FabButton {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    fabClose? : boolean
    label? : string
    target? : string
    tooltip? : string
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onClick? : (event?: any) => void
  }
}
declare class F7FabButton extends React.Component<F7FabButton.Props, {}> {
  onClick(event? : any) : unknown
  f7Tooltip: TooltipNamespace.Tooltip
}
export default F7FabButton;