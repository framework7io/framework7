import * as React from 'react';

declare namespace F7MessagebarSheetImage {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    image? : string
    checked? : boolean
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onChecked? : (event?: any) => void
    onUnchecked? : (event?: any) => void
    onChange? : (event?: any) => void
  }
}
declare class F7MessagebarSheetImage extends React.Component<F7MessagebarSheetImage.Props, {}> {
  onChange(event? : any) : unknown
}
export default F7MessagebarSheetImage;