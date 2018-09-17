import React from 'react';

namespace F7BlockHeader {
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
class F7BlockHeader extends React.Component<F7BlockHeader.Props, {}> {
  
}
export default F7BlockHeader;
