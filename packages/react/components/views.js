import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Views extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      tabs
    } = props;
    const classes = Utils.classNames(className, 'views', {
      tabs
    }, Mixins.colorClasses(props));
    return React.createElement('div', {
      id: id,
      style: style,
      className: classes
    }, this.slots['default']);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

}

__reactComponentSetProps(F7Views, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  tabs: Boolean
}, Mixins.colorProps));

F7Views.displayName = 'f7-views';
export default F7Views;