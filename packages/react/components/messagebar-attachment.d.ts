import React from 'react';

namespace F7MessagebarAttachment {
  export interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
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
class F7MessagebarAttachment extends React.Component<F7MessagebarAttachment.Props, {}> {
  onClick(e : any) : unknown
  onDeleteClick(e : any) : unknown
}
export default F7MessagebarAttachment;
