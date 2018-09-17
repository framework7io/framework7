import React from 'react';

namespace F7ListGroup {
  export interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
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
class F7ListGroup extends React.Component<F7ListGroup.Props, {}> {
  
}
export default F7ListGroup;
