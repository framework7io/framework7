import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Tabs extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      animated,
      swipeable,
      id,
      style,
      className,
      routable
    } = props;
    const classes = Utils.classNames(className, Mixins.colorClasses(props));
    const wrapClasses = Utils.classNames({
      'tabs-animated-wrap': animated,
      'tabs-swipeable-wrap': swipeable
    });
    const tabsClasses = Utils.classNames({
      tabs: true,
      'tabs-routable': routable
    });

    if (animated || swipeable) {
      return React.createElement('div', {
        id: id,
        style: style,
        className: Utils.classNames(wrapClasses, classes),
        ref: __reactNode => {
          this.__reactRefs['wrapEl'] = __reactNode;
        }
      }, React.createElement('div', {
        className: tabsClasses
      }, this.slots['default']));
    }

    return React.createElement('div', {
      id: id,
      style: style,
      className: Utils.classNames(tabsClasses, classes)
    }, this.slots['default']);
  }

  componentDidMount() {
    const self = this;
    const {
      swipeable,
      swiperParams
    } = self.props;
    if (!swipeable || !swiperParams) return;
    const wrapEl = self.refs.wrapEl;
    if (!wrapEl) return;
    wrapEl.f7SwiperParams = swiperParams;
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7Tabs, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  animated: Boolean,
  swipeable: Boolean,
  routable: Boolean,
  swiperParams: {
    type: Object,
    default: undefined
  }
}, Mixins.colorProps));

F7Tabs.displayName = 'f7-tabs';
export default F7Tabs;