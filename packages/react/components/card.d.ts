import * as React from 'react';

declare namespace F7Card {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    title? : string | number
    content? : string | number
    footer? : string | number
    outline? : boolean
    padding? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
declare class F7Card extends React.Component<F7Card.Props, {}> {
  
}
export default F7Card;