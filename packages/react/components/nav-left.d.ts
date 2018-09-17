import React from 'react';

namespace F7NavLeft {
  export interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    backLink? : boolean | string
    backLinkUrl? : string
    backLinkForce? : boolean
    sliding? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onBackClick? : Function
    onClickBack? : Function
  }
}
class F7NavLeft extends React.Component<F7NavLeft.Props, {}> {
  onBackClick(e : any) : unknown
}
export default F7NavLeft;
