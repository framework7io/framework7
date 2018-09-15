import React from 'react';

declare namespace F7Badge {
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
declare class F7Badge extends React.Component<F7Badge.Props, {}> {
  
}
export default F7Badge;