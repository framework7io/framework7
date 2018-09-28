import * as React from 'react';

declare namespace F7MessagebarAttachment {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    image? : string
    deletable? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onAttachmentClick? : (event?: any) => void
    onAttachmentDelete? : (event?: any) => void
  }
}
declare class F7MessagebarAttachment extends React.Component<F7MessagebarAttachment.Props, {}> {
  onClick(event? : any) : unknown
  onDeleteClick(event? : any) : unknown
}
export default F7MessagebarAttachment;