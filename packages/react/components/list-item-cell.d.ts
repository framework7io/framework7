import * as React from 'react';

declare namespace F7ListItemCell {
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
declare class F7ListItemCell extends React.Component<F7ListItemCell.Props, {}> {
  
}
export default F7ListItemCell;