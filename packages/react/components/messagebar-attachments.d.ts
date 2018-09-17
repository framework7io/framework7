import React from 'react';

namespace F7MessagebarAttachments {
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
class F7MessagebarAttachments extends React.Component<F7MessagebarAttachments.Props, {}> {
  
}
export default F7MessagebarAttachments;
