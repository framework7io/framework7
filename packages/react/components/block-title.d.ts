import React from 'react';

namespace F7BlockTitle {
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
class F7BlockTitle extends React.Component<F7BlockTitle.Props, {}> {
  
}
export default F7BlockTitle;
