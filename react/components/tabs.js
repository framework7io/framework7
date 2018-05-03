import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const TabsProps = Utils.extend({
  animated: Boolean,
  swipeable: Boolean,
  routable: Boolean
}, Mixins.colorProps);
class F7Tabs extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const self = this;
    const {animated, swipeable, id, style} = self.props;
    if (animated || swipeable) {
      return React.createElement('div', { className: self.classes }, React.createElement('div', { className: 'tabs' }, this.slots['default']));
    }
    return React.createElement('div', {
      id: id,
      style: style,
      className: Utils.classNames('tabs', this.classes)
    }, this.slots['default']);
  }
  get classes() {
    return Utils.classNames(this.props.className, {
      'tabs-animated-wrap': this.props.animated,
      'tabs-swipeable-wrap': this.props.swipeable,
      'tabs-routable': this.props.routable
    }, Mixins.colorClasses(this));
  }
  get slots() {
    return __reactComponentSlots(this);
  }
}
__reactComponentSetProps(F7Tabs, TabsProps);
export default F7Tabs;