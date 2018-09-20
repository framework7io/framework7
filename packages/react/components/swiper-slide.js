import React from 'react';
import Utils from '../utils/utils';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7SwiperSlide extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      zoom
    } = props;
    const classes = Utils.classNames(className, 'swiper-slide');
    return React.createElement('div', {
      id: id,
      style: style,
      className: classes
    }, zoom ? React.createElement('div', {
      className: 'swiper-zoom-container'
    }, this.slots['default']) : this.slots['default']);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

}

__reactComponentSetProps(F7SwiperSlide, {
  id: [String, Number],
  className: String,
  style: Object,
  zoom: Boolean
});

F7SwiperSlide.displayName = 'f7-swiper-slide';
export default F7SwiperSlide;