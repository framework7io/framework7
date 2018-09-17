import * as React from 'react';

declare namespace F7FabButton {
  export interface Props {
    slot? : string
    id? : string | number
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
    onClick? : Function
  }
}
declare class F7FabButton extends React.Component<F7FabButton.Props, {}> {
  onClick(event : any) : unknown
}
export default F7FabButton;