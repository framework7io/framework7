import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const SwiperProps = Utils.extend({
  params: Object,
  pagination: Boolean,
  scrollbar: Boolean,
  navigation: Boolean,
  init: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps);
class F7Swiper extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const self = this;
    let paginationEl;
    let scrollbarEl;
    let buttonNextEl;
    let buttonPrevEl;
    if (self.paginationComputed) {
      paginationEl = React.createElement('div', { className: 'swiper-pagination' });
    }
    if (self.scrollbarComputed) {
      scrollbarEl = React.createElement('div', { className: 'swiper-scrollbar' });
    }
    if (self.navigationComputed) {
      buttonNextEl = React.createElement('div', { className: 'swiper-button-next' });
      buttonPrevEl = React.createElement('div', { className: 'swiper-button-prev' });
    }
    return React.createElement('div', {
      id: self.props.id,
      style: self.props.style,
      ref: 'el',
      className: self.classes
    }, this.slots['before-wrapper'], React.createElement('div', { className: 'swiper-wrapper' }, this.slots['default']), paginationEl, scrollbarEl, buttonPrevEl, buttonNextEl, this.slots['after-wrapper']);
  }
  get classes() {
    return Utils.classNames(this.props.className, 'swiper-container', Mixins.colorClasses(this));
  }
  get paginationComputed() {
    const self = this;
    if (self.props.pagination === true || self.props.params && self.props.params.pagination && !self.props.params.pagination.el) {
      return true;
    }
    return false;
  }
  get scrollbarComputed() {
    const self = this;
    if (self.props.scrollbar === true || self.props.params && self.props.params.scrollbar && !self.props.params.scrollbar.el) {
      return true;
    }
    return false;
  }
  get navigationComputed() {
    const self = this;
    if (self.props.navigation === true || self.props.params && self.props.params.navigation && !self.props.params.navigation.nextEl && !self.props.params.navigation.prevEl) {
      return true;
    }
    return false;
  }
  componentWillUnmount() {
    const self = this;
    if (!self.props.init)
      return;
    if (self.swiper && self.swiper.destroy)
      self.swiper.destroy();
  }
  componentDidUpdate() {
    const self = this;
    if (!self.initialUpdate) {
      self.initialUpdate = true;
      return;
    }
    if (self.swiper && self.swiper.update)
      self.swiper.update();
  }
  componentDidMount() {
    const self = this;
    if (!self.props.init)
      return;
    self.$f7ready(f7 => {
      const newParams = {
        pagination: {},
        navigation: {},
        scrollbar: {}
      };
      const {params, pagination, navigation, scrollbar} = self.props;
      if (params)
        Utils.extend(newParams, params);
      if (pagination && !newParams.pagination.el)
        newParams.pagination.el = '.swiper-pagination';
      if (navigation && !newParams.navigation.nextEl && !newParams.navigation.prevEl) {
        newParams.navigation.nextEl = '.swiper-button-next';
        newParams.navigation.prevEl = '.swiper-button-prev';
      }
      if (scrollbar && !newParams.scrollbar.el)
        newParams.scrollbar.el = '.swiper-scrollbar';
      self.swiper = f7.swiper.create(this.refs.el, newParams);
    });
  }
  get slots() {
    return __reactComponentSlots(this);
  }
}
__reactComponentSetProps(F7Swiper, SwiperProps);
export default F7Swiper;