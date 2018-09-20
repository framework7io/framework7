import * as React from 'react';

declare namespace F7ActionsLabel {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    bold? : boolean
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
declare class F7ActionsLabel extends React.Component<F7ActionsLabel.Props, {}> {
  onClick(event? : any) : unknown
}
export default F7ActionsLabel;