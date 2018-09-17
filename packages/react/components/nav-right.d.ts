import React from 'react';

namespace F7NavRight {
  export interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    sliding? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
class F7NavRight extends React.Component<F7NavRight.Props, {}> {
  
}
export default F7NavRight;
