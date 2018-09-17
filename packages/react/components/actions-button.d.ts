import * as React from 'react';

declare namespace F7ActionsButton {
  export interface Props {
    slot? : string
    id? : string | number
    bold? : boolean
    close? : boolean  | true
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
declare class F7ActionsButton extends React.Component<F7ActionsButton.Props, {}> {
  onClick(event : any) : unknown
}
export default F7ActionsButton;