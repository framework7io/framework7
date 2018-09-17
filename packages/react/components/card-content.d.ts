import * as React from 'react';

declare namespace F7CardContent {
  export interface Props {
    slot? : string
    id? : string | number
    padding? : boolean  | true
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean

  }
}
declare class F7CardContent extends React.Component<F7CardContent.Props, {}> {

}
export default F7CardContent;
