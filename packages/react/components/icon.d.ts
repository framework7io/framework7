import * as React from 'react';
import { Tooltip as TooltipNamespace } from 'framework7/components/tooltip/tooltip';

declare namespace F7Icon {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    material? : string
    f7? : string
    ion? : string
    fa? : string
    icon? : string
    ios? : string
    aurora? : string
    md? : string
    tooltip? : string
    size? : string | number
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7Icon extends React.Component<F7Icon.Props, {}> {
  f7Tooltip: TooltipNamespace.Tooltip
}
export default F7Icon;