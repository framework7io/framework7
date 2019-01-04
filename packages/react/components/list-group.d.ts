import * as React from 'react';

declare namespace F7ListGroup {
  interface Props {
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
declare class F7ListGroup extends React.Component<F7ListGroup.Props, {}> {
  
}
export default F7ListGroup;