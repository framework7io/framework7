import React from 'react';

namespace F7MessagebarSheetItem {
  export interface Props {
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
class F7MessagebarSheetItem extends React.Component<F7MessagebarSheetItem.Props, {}> {
  
}
export default F7MessagebarSheetItem;
