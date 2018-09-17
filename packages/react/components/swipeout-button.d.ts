import React from 'react';

namespace F7SwipeoutButton {
  export interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    text? : string
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
    onClick? : Function
  }
}
class F7SwipeoutButton extends React.Component<F7SwipeoutButton.Props, {}> {
  onClick(event : any) : unknown
}
export default F7SwipeoutButton;
