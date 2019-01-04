import * as React from 'react';

declare namespace F7Tabs {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    animated? : boolean
    swipeable? : boolean
    routable? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7Tabs extends React.Component<F7Tabs.Props, {}> {
  
}
export default F7Tabs;