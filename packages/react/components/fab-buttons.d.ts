import React from 'react';

namespace F7FabButtons {
  export interface Props {
    slot? : string
    id? : string | number
    position? : string  | 'top'
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
class F7FabButtons extends React.Component<F7FabButtons.Props, {}> {
  
}
export default F7FabButtons;