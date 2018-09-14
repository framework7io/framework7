import React from 'react';

namespace F7Navbar {
  export interface Props {
    slot? : string
    id? : string | number
    backLink? : boolean | string
    backLinkUrl? : string
    backLinkForce? : boolean
    sliding? : boolean  | true
    title? : string
    subtitle? : string
    hidden? : boolean
    noShadow? : boolean
    noHairline? : boolean
    inner? : boolean  | true
    innerClass? : string
    innerClassName? : string
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onBackClick? : Function
    onClickBack? : Function
  }
}
class F7Navbar extends React.Component<F7Navbar.Props, {}> {
  hide(animate : any) : unknown
  show(animate : any) : unknown
  size() : unknown
  onBackClick(e : any) : unknown
}
export default F7Navbar;