import React from 'react';

namespace F7Tab {
  export interface Props {
    slot? : string
    id? : string | number
    tabActive? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onTabShow? : Function
    onTabHide? : Function
  }
}
class F7Tab extends React.Component<F7Tab.Props, {}> {
  show(animate? : any) : unknown
  onTabShow(e : any) : unknown
  onTabHide(e : any) : unknown
}
export default F7Tab;
