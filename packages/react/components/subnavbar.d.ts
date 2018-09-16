import React from 'react';

namespace F7Subnavbar {
  export interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    sliding? : boolean
    title? : string
    inner? : boolean  | true
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
class F7Subnavbar extends React.Component<F7Subnavbar.Props, {}> {
  
}
export default F7Subnavbar;
