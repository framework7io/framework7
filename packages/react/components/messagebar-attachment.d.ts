import React from 'react';

declare namespace F7MessagebarAttachment {
  export interface Props {
    slot? : string
    id? : string | number
    image? : string
    deletable? : boolean  | true
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onAttachmentClick? : Function
    onAttachmentDelete? : Function
  }
}
declare class F7MessagebarAttachment extends React.Component<F7MessagebarAttachment.Props, {}> {
  onClick(e : any) : unknown
  onDeleteClick(e : any) : unknown
}
export default F7MessagebarAttachment;