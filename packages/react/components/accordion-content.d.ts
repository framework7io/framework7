import * as React from 'react';

declare namespace F7AccordionContent {
  export interface Props {
    slot? : string
    id? : string | number
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean

  }
}
declare class F7AccordionContent extends React.Component<F7AccordionContent.Props, {}> {

}
export default F7AccordionContent;
