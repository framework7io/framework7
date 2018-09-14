import React from 'react';

namespace F7ListItemCell {
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
class F7ListItemCell extends React.Component<F7ListItemCell.Props, {}> {
  
}
export default F7ListItemCell;