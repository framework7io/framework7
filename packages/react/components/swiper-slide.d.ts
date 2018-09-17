import * as React from 'react';

declare namespace F7SwiperSlide {
  export interface Props {
    slot? : string
    id? : string | number
    zoom? : boolean
    
  }
}
declare class F7SwiperSlide extends React.Component<F7SwiperSlide.Props, {}> {
  
}
export default F7SwiperSlide;