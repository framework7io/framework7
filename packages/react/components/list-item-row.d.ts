import React from 'react';

namespace F7ListItemRow {
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
class F7ListItemRow extends React.Component<F7ListItemRow.Props, {}> {
  
}
export default F7ListItemRow;