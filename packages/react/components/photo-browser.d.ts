import * as React from 'react';
import { PhotoBrowser as PhotoBrowserNamespace } from 'framework7/components/photo-browser/photo-browser';

declare namespace F7PhotoBrowser {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    init? : boolean
    params? : Object
    photos? : Array<any>
    exposition? : boolean
    expositionHideCaptions? : boolean
    type? : string
    navbar? : boolean
    toolbar? : boolean
    theme? : string
    captionsTheme? : string
    iconsColor? : string
    swipeToClose? : boolean
    backLinkText? : string
    navbarOfText? : string
    swiper? : Object
    url? : string
    routableModals? : boolean
    virtualSlides? : boolean
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
    onPhotoBrowserOpen? : (...args: any[]) => void
    onPhotoBrowserClose? : (...args: any[]) => void
    onPhotoBrowserOpened? : (...args: any[]) => void
    onPhotoBrowserClosed? : (...args: any[]) => void
    onPhotoBrowserSwipeToClose? : (...args: any[]) => void
  }
}
declare class F7PhotoBrowser extends React.Component<F7PhotoBrowser.Props, {}> {
  open(index? : any) : unknown
  close() : unknown
  expositionToggle() : unknown
  expositionEnable() : unknown
  expositionDisable() : unknown
  f7PhotoBrowser: PhotoBrowserNamespace.PhotoBrowser
}
export default F7PhotoBrowser;