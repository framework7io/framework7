import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7NavTitle extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      className
    } = props;
    const classes = Utils.classNames(className, 'title-large', Mixins.colorClasses(props));
    const children = [];
    const slots = self.slots;

    if (slots && Object.keys(slots).length) {
      Object.keys(slots).forEach(key => {
        children.push(...slots[key]);
      });
    }

    return React.createElement('div', {
      id: id,
      style: style,
      className: classes
    }, React.createElement('div', {
      className: 'title-large-text'
    }, children));
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

}

__reactComponentSetProps(F7NavTitle, Object.assign({
  id: [String, Number],
  className: String,
  style: Object
}, Mixins.colorProps));

F7NavTitle.displayName = 'f7-nav-title';
export default F7NavTitle;