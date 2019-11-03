import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Menu extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      className,
      style
    } = props;
    return React.createElement('div', {
      className: Utils.classNames('menu', Mixins.colorClasses(props), className),
      id: id,
      style: style
    }, React.createElement('div', {
      className: 'menu-inner'
    }, this.slots['default']));
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

}

__reactComponentSetProps(F7Menu, Object.assign({
  id: [String, Number],
  className: String,
  style: Object
}, Mixins.colorProps));

F7Menu.displayName = 'f7-menu';
export default F7Menu;