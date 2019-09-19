import * as React from 'react';

declare namespace F7ActionsButton {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    bold? : boolean
    close? : boolean
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
declare class F7ActionsButton extends React.Component<F7ActionsButton.Props, {}> {
  onClick(event? : any) : unknown
}
export default F7ActionsButton;