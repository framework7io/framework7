import React from 'react';

declare namespace F7SwipeoutActions {
  export interface Props {
    slot? : string
    id? : string | number
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
declare class F7SwipeoutActions extends React.Component<F7SwipeoutActions.Props, {}> {
  
}
export default F7SwipeoutActions;