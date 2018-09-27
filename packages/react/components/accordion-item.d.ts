import * as React from 'react';

declare namespace F7AccordionItem {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    opened? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onAccordionOpen? : (event?: any) => void
    onAccordionOpened? : (event?: any) => void
    onAccordionClose? : (event?: any) => void
    onAccordionClosed? : (event?: any) => void
  }
}
declare class F7AccordionItem extends React.Component<F7AccordionItem.Props, {}> {
  onOpen(event? : any) : unknown
  onOpened(event? : any) : unknown
  onClose(event? : any) : unknown
  onClosed(event? : any) : unknown
}
export default F7AccordionItem;