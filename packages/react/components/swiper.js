import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Swiper extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }

  get paginationComputed() {
    const self = this;
    const {
      pagination,
      params
    } = self.props;

    if (pagination === true || params && params.pagination && !params.pagination.el) {
      return true;
    }

    return false;
  }

  get scrollbarComputed() {
    const self = this;
    const {
      scrollbar,
      params
    } = self.props;

    if (scrollbar === true || params && params.scrollbar && !params.scrollbar.el) {
      return true;
    }

    return false;
  }

  get navigationComputed() {
    const self = this;
    const {
      navigation,
      params
    } = self.props;

    if (navigation === true || params && params.navigation && !params.navigation.nextEl && !params.navigation.prevEl) {
      return true;
    }

    return false;
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      className
    } = props;
    let paginationEl;
    let scrollbarEl;
    let buttonNextEl;
    let buttonPrevEl;

    if (self.paginationComputed) {
      paginationEl = React.createElement('div', {
        ref: __reactNode => {
          this.__reactRefs['paginationEl'] = __reactNode;
        },
        className: 'swiper-pagination'
      });
    }

    if (self.scrollbarComputed) {
      scrollbarEl = React.createElement('div', {
        ref: __reactNode => {
          this.__reactRefs['scrollbarEl'] = __reactNode;
        },
        className: 'swiper-scrollbar'
      });
    }

    if (self.navigationComputed) {
      buttonNextEl = React.createElement('div', {
        ref: __reactNode => {
          this.__reactRefs['nextEl'] = __reactNode;
        },
        className: 'swiper-button-next'
      });
      buttonPrevEl = React.createElement('div', {
        ref: __reactNode => {
          this.__reactRefs['prevEl'] = __reactNode;
        },
        className: 'swiper-button-prev'
      });
    }

    const classes = Utils.classNames(className, 'swiper-container', Mixins.colorClasses(props));
    return React.createElement('div', {
      id: id,
      style: style,
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      className: classes
    }, this.slots['before-wrapper'], React.createElement('div', {
      className: 'swiper-wrapper'
    }, this.slots['default']), paginationEl, scrollbarEl, buttonPrevEl, buttonNextEl, this.slots['after-wrapper']);
  }

  componentWillUnmount() {
    const self = this;
    if (!self.props.init) return;
    if (self.swiper && self.swiper.destroy) self.swiper.destroy();
  }

  componentDidMount() {
    const self = this;
    if (!self.props.init) return;
    self.$f7ready(f7 => {
      const newParams = {
        pagination: {},
        navigation: {},
        scrollbar: {}
      };
      const {
        params,
        pagination,
        navigation,
        scrollbar
      } = self.props;
      if (params) Utils.extend(newParams, params);
      if (pagination && !newParams.pagination.el) newParams.pagination.el = self.refs.paginationEl;

      if (navigation && !newParams.navigation.nextEl && !newParams.navigation.prevEl) {
        newParams.navigation.nextEl = self.refs.nextEl;
        newParams.navigation.prevEl = self.refs.prevEl;
      }

      if (scrollbar && !newParams.scrollbar.el) newParams.scrollbar.el = self.refs.scrollbarEl;
      self.swiper = f7.swiper.create(self.refs.el, newParams);
    });
  }

  componentDidUpdate() {
    const self = this;

    if (!self.initialUpdate) {
      self.initialUpdate = true;
      return;
    }

    if (self.swiper && self.swiper.update) self.swiper.update();
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7Swiper, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  params: Object,
  pagination: Boolean,
  scrollbar: Boolean,
  navigation: Boolean,
  init: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7Swiper.displayName = 'f7-swiper';
export default F7Swiper;