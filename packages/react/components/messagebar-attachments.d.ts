import * as React from 'react';

declare namespace F7MessagebarAttachments {
  interface Props {
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
declare class F7MessagebarAttachments extends React.Component<F7MessagebarAttachments.Props, {}> {
  
}
export default F7MessagebarAttachments;