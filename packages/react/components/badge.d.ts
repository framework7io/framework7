import * as React from 'react';
import { Tooltip as TooltipNamespace } from 'framework7/components/tooltip/tooltip';

declare namespace F7Badge {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    tooltip? : string
    tooltipTrigger? : string
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7Badge extends React.Component<F7Badge.Props, {}> {
  f7Tooltip: TooltipNamespace.Tooltip
}
export default F7Badge;