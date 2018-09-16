import React from 'react';

namespace F7MessagesTitle {
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
class F7MessagesTitle extends React.Component<F7MessagesTitle.Props, {}> {
  
}
export default F7MessagesTitle;
