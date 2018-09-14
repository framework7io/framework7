import React from 'react';

namespace F7Badge {
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
class F7Badge extends React.Component<F7Badge.Props, {}> {
  
}
export default F7Badge;