import * as React from 'react';

declare namespace F7AccordionToggle {
  interface Props {
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
declare class F7AccordionToggle extends React.Component<F7AccordionToggle.Props, {}> {
  
}
export default F7AccordionToggle;