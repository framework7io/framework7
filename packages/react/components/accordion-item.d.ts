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
    onAccordionBeforeOpen? : (prevent?: any) => void
    onAccordionOpen? : (...args: any[]) => void
    onAccordionOpened? : (...args: any[]) => void
    onAccordionBeforeClose? : (prevent?: any) => void
    onAccordionClose? : (...args: any[]) => void
    onAccordionClosed? : (...args: any[]) => void
  }
}
declare class F7AccordionItem extends React.Component<F7AccordionItem.Props, {}> {
  onBeforeOpen(el? : any, prevent? : any) : unknown
  onOpen(el? : any) : unknown
  onOpened(el? : any) : unknown
  onBeforeClose(el? : any, prevent? : any) : unknown
  onClose(el? : any) : unknown
  onClosed(el? : any) : unknown
}
export default F7AccordionItem;