import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Tabs extends React.Component {
  constructor(props, context) {
    super(props, context);
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
        className: Utils.classNames(wrapClasses, classes)
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

  get slots() {
    return __reactComponentSlots(this.props);
  }

}

__reactComponentSetProps(F7Tabs, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  animated: Boolean,
  swipeable: Boolean,
  routable: Boolean
}, Mixins.colorProps));

F7Tabs.displayName = 'f7-tabs';
export default F7Tabs;