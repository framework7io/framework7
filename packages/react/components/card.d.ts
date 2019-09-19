import * as React from 'react';

declare namespace F7Card {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    title? : string | number
    content? : string | number
    footer? : string | number
    outline? : boolean
    expandable? : boolean
    expandableAnimateWidth? : boolean
    expandableOpened? : boolean
    animate? : boolean
    hideNavbarOnOpen? : boolean
    hideToolbarOnOpen? : boolean
    hideStatusbarOnOpen? : boolean
    swipeToClose? : boolean
    closeByBackdropClick? : boolean
    backdrop? : boolean
    backdropEl? : string
    noShadow? : boolean
    noBorder? : boolean
    padding? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onCardBeforeOpen? : (el?: any, prevent?: any) => void
    onCardOpen? : (el?: any) => void
    onCardOpened? : (el?: any, pageEl?: any) => void
    onCardClose? : (el?: any) => void
    onCardClosed? : (el?: any, pageEl?: any) => void
  }
}
declare class F7Card extends React.Component<F7Card.Props, {}> {
  open() : unknown
  close() : unknown
  onBeforeOpen(el? : any, prevent? : any) : unknown
  onOpen(el? : any) : unknown
  onOpened(el? : any, pageEl? : any) : unknown
  onClose(el? : any) : unknown
  onClosed(el? : any, pageEl? : any) : unknown
}
export default F7Card;