import React from 'react';
import Utils from '../utils/utils';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7SwiperSlide extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const classes = Utils.classNames(this.props.className, 'swiper-slide');
    return React.createElement('div', {
      id: this.props.id,
      style: this.props.style,
      className: classes
    }, this.props.zoom ? React.createElement('div', { className: 'swiper-zoom-container' }, this.slots['default']) : this.slots['default']);
  }
  get slots() {
    return __reactComponentSlots(this);
  }
}
__reactComponentSetProps(F7SwiperSlide, { zoom: Boolean });
export default F7SwiperSlide;