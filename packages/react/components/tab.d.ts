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
    onTabShow? : (event?: any) => void
    onTabHide? : (event?: any) => void
  }
}
declare class F7Tab extends React.Component<F7Tab.Props, {}> {
  show(animate? : any) : unknown
  onTabShow(event? : any) : unknown
  onTabHide(event? : any) : unknown
}
export default F7Tab;