import React from 'react';

namespace F7App {
  export interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    params? : Object
    routes? : Array<any>
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
class F7App extends React.Component<F7App.Props, {}> {
  
}
export default F7App;
