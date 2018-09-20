import * as React from 'react';

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
}
export default F7FabButton;