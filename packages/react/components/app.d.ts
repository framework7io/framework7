import * as React from 'react';

declare namespace F7App {
  export interface Props {
    slot? : string
    id? : string | number
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
declare class F7App extends React.Component<F7App.Props, {}> {
  
}
export default F7App;