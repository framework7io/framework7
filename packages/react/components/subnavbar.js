import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Subnavbar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      inner,
      title,
      style,
      id,
      className,
      sliding
    } = props;
    const classes = Utils.classNames(className, 'subnavbar', {
      sliding
    }, Mixins.colorClasses(props));
    return React.createElement('div', {
      className: classes,
      id: id,
      style: style
    }, inner ? React.createElement('div', {
      className: 'subnavbar-inner'
    }, title && React.createElement('div', {
      className: 'title'
    }, title), this.slots['default']) : this.slots['default']);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

}

__reactComponentSetProps(F7Subnavbar, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  sliding: Boolean,
  title: String,
  inner: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7Subnavbar.displayName = 'f7-subnavbar';
export default F7Subnavbar;