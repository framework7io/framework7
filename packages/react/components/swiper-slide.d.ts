import * as React from 'react';

declare namespace F7SwiperSlide {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    zoom? : boolean
    
  }
}
declare class F7SwiperSlide extends React.Component<F7SwiperSlide.Props, {}> {
  
}
export default F7SwiperSlide;