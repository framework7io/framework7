import * as React from 'react';

declare namespace F7PhotoBrowser {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    init? : boolean  | true
    params? : Object
    photos? : Array<any>
    exposition? : boolean  | true
    expositionHideCaptions? : boolean  | false
    type? : string
    navbar? : boolean  | true
    toolbar? : boolean  | true
    theme? : string
    captionsTheme? : string
    iconsColor? : string
    swipeToClose? : boolean  | true
    backLinkText? : string
    navbarOfText? : string
    swiper? : Object
    url? : string
    routableModals? : boolean  | true
    virtualSlides? : boolean  | true
    view? : string | Object
    renderNavbar? : Function
    renderToolbar? : Function
    renderCaption? : Function
    renderObject? : Function
    renderLazyPhoto? : Function
    renderPhoto? : Function
    renderPage? : Function
    renderPopup? : Function
    renderStandalone? : Function
    onPhotoBrowserOpen? : (...args?: any[]) => void
    onPhotoBrowserClose? : (...args?: any[]) => void
    onPhotoBrowserOpened? : (...args?: any[]) => void
    onPhotoBrowserClosed? : (...args?: any[]) => void
    onPhotoBrowserSwipeToClose? : (...args?: any[]) => void
  }
}
declare class F7PhotoBrowser extends React.Component<F7PhotoBrowser.Props, {}> {
  open(index? : any) : unknown
  close() : unknown
  expositionToggle() : unknown
  expositionEnable() : unknown
  expositionDisable() : unknown
}
export default F7PhotoBrowser;