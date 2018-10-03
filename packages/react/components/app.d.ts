import * as React from 'react';
import { Framework7Params } from 'framework7/components/app/app-class';
import { Router } from 'framework7/modules/router/router';

declare namespace F7App {
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
    params? : Framework7Params
    routes? : Router.RouteParameters[]
    
  }
}
declare class F7App extends React.Component<F7App.Props, {}> {
  
}
export default F7App;