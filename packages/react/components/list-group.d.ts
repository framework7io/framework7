import React from 'react';

declare namespace F7ListGroup {
  export interface Props {
    slot? : string
    id? : string | number
    mediaList? : boolean
    sortable? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7ListGroup extends React.Component<F7ListGroup.Props, {}> {
  
}
export default F7ListGroup;