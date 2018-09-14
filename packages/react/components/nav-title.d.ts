import React from 'react';

namespace F7NavTitle {
  export interface Props {
    slot? : string
    id? : string | number
    title? : string
    subtitle? : string
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
class F7NavTitle extends React.Component<F7NavTitle.Props, {}> {
  
}
export default F7NavTitle;