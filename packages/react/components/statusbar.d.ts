import React from 'react';

namespace F7Statusbar {
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
class F7Statusbar extends React.Component<F7Statusbar.Props, {}> {
  
}
export default F7Statusbar;
