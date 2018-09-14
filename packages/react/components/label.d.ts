import React from 'react';

namespace F7Label {
  export interface Props {
    slot? : string
    id? : string | number
    floating? : boolean
    inline? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
class F7Label extends React.Component<F7Label.Props, {}> {
  
}
export default F7Label;