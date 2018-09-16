import React from 'react';

namespace F7BlockFooter {
  export interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
class F7BlockFooter extends React.Component<F7BlockFooter.Props, {}> {
  
}
export default F7BlockFooter;
