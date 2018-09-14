import React from 'react';

namespace F7ActionsGroup {
  export interface Props {
    slot? : string
    id? : string | number
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
class F7ActionsGroup extends React.Component<F7ActionsGroup.Props, {}> {
  
}
export default F7ActionsGroup;