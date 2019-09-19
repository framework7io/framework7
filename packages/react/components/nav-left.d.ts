import * as React from 'react';

declare namespace F7NavLeft {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    backLink? : boolean | string
    backLinkUrl? : string
    backLinkForce? : boolean
    backLinkShowText? : boolean
    sliding? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onBackClick? : (event?: any) => void
    onClickBack? : (event?: any) => void
  }
}
declare class F7NavLeft extends React.Component<F7NavLeft.Props, {}> {
  onBackClick(event? : any) : unknown
}
export default F7NavLeft;