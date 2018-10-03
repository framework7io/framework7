import * as React from 'react';

declare namespace F7Col {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    tag? : string
    width? : number | string
    tabletWidth? : number | string
    desktopWidth? : number | string
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
declare class F7Col extends React.Component<F7Col.Props, {}> {
  onClick(event? : any) : unknown
}
export default F7Col;