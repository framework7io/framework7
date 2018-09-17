import React from 'react';

namespace F7Swiper {
  export interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    params? : Object
    pagination? : boolean
    scrollbar? : boolean
    navigation? : boolean
    init? : boolean  | true
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    
  }
}
class F7Swiper extends React.Component<F7Swiper.Props, {}> {
  
}
export default F7Swiper;
