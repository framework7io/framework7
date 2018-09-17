import React from 'react';

namespace F7ActionsLabel {
  export interface Props {
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
    onClick? : Function
  }
}
class F7ActionsLabel extends React.Component<F7ActionsLabel.Props, {}> {
  onClick(event : any) : unknown
}
export default F7ActionsLabel;
