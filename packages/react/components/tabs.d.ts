import React from 'react';

namespace F7Tabs {
  export interface Props {
    slot? : string
    id? : string | number
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
class F7Tabs extends React.Component<F7Tabs.Props, {}> {
  
}
export default F7Tabs;