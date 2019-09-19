import * as React from 'react';

declare namespace F7Tab {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    tabActive? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onTabShow? : (...args: any[]) => void
    onTabHide? : (...args: any[]) => void
  }
}
declare class F7Tab extends React.Component<F7Tab.Props, {}> {
  show(animate? : any) : unknown
  onTabShow(el? : any) : unknown
  onTabHide(el? : any) : unknown
}
export default F7Tab;