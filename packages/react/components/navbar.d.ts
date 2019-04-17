import * as React from 'react';

declare namespace F7Navbar {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    backLink? : boolean | string
    backLinkUrl? : string
    backLinkForce? : boolean
    backLinkShowText? : boolean
    sliding? : boolean
    title? : string
    subtitle? : string
    hidden? : boolean
    noShadow? : boolean
    noHairline? : boolean
    inner? : boolean
    innerClass? : string
    innerClassName? : string
    large? : boolean
    titleLarge? : string
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onNavbarHide? : (...args: any[]) => void
    onNavbarShow? : (...args: any[]) => void
    onNavbarExpand? : (...args: any[]) => void
    onNavbarCollapse? : (...args: any[]) => void
    onBackClick? : (event?: any) => void
    onClickBack? : (event?: any) => void
  }
}
declare class F7Navbar extends React.Component<F7Navbar.Props, {}> {
  onHide(navbarEl? : any) : unknown
  onShow(navbarEl? : any) : unknown
  onExpand(navbarEl? : any) : unknown
  onCollapse(navbarEl? : any) : unknown
  hide(animate? : any) : unknown
  show(animate? : any) : unknown
  size() : unknown
  onBackClick(event? : any) : unknown
}
export default F7Navbar;