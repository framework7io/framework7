import React from 'react';

namespace F7AccordionContent {
  export interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
class F7AccordionContent extends React.Component<F7AccordionContent.Props, {}> {
  
}
export default F7AccordionContent;
