import React from 'react';

namespace F7AccordionItem {
  export interface Props {
    slot? : string
    id? : string | number
    opened? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onAccordionOpen? : Function
    onAccordionOpened? : Function
    onAccordionClose? : Function
    onAccordionClosed? : Function
  }
}
class F7AccordionItem extends React.Component<F7AccordionItem.Props, {}> {
  onOpen(event : any) : unknown
  onOpened(event : any) : unknown
  onClose(event : any) : unknown
  onClosed(event : any) : unknown
}
export default F7AccordionItem;