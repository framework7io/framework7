import * as React from 'react';

declare namespace F7SwipeoutButton {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    text? : string
    confirmTitle? : string
    confirmText? : string
    overswipe? : boolean
    close? : boolean
    delete? : boolean
    href? : string
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onClick? : (event?: any) => void
  }
}
declare class F7SwipeoutButton extends React.Component<F7SwipeoutButton.Props, {}> {
  onClick(event? : any) : unknown
}
export default F7SwipeoutButton;