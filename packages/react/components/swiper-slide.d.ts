import React from 'react';

namespace F7SwiperSlide {
  export interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    zoom? : boolean
    
  }
}
class F7SwiperSlide extends React.Component<F7SwiperSlide.Props, {}> {
  
}
export default F7SwiperSlide;
