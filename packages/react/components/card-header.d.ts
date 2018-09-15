import React from 'react';

declare namespace F7CardHeader {
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
declare class F7CardHeader extends React.Component<F7CardHeader.Props, {}> {
  
}
export default F7CardHeader;