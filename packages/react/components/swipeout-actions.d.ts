import React from 'react';

namespace F7SwipeoutActions {
  export interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    left? : boolean
    right? : boolean
    side? : string
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
class F7SwipeoutActions extends React.Component<F7SwipeoutActions.Props, {}> {
  
}
export default F7SwipeoutActions;
