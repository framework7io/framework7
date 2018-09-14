import React from 'react';

namespace F7LoginScreenTitle {
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
class F7LoginScreenTitle extends React.Component<F7LoginScreenTitle.Props, {}> {
  
}
export default F7LoginScreenTitle;