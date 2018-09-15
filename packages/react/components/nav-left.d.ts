import React from 'react';

declare namespace F7NavLeft {
  export interface Props {
    slot? : string
    id? : string | number
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
declare class F7NavLeft extends React.Component<F7NavLeft.Props, {}> {
  onBackClick(e : any) : unknown
}
export default F7NavLeft;