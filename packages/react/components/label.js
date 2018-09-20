import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Label extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      inline,
      id,
      style,
      className,
      floating
    } = props;
    const classes = Utils.classNames(className, 'item-title', {
      'item-label-inline': inline,
      'item-label': !floating,
      'item-floating-label': floating
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

__reactComponentSetProps(F7Label, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  floating: Boolean,
  inline: Boolean
}, Mixins.colorProps));

F7Label.displayName = 'f7-label';
export default F7Label;