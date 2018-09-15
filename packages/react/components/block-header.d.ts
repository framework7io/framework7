import React from 'react';

declare namespace F7BlockHeader {
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
declare class F7BlockHeader extends React.Component<F7BlockHeader.Props, {}> {
  
}
export default F7BlockHeader;