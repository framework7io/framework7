import React from 'react';

namespace F7Card {
  export interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    title? : string | number
    content? : string | number
    footer? : string | number
    outline? : boolean
    padding? : boolean  | true
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
class F7Card extends React.Component<F7Card.Props, {}> {
  
}
export default F7Card;
