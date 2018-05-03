import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7Statusbar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return React.createElement('div', {
      id: this.props.id,
      style: this.props.style,
      className: this.classes
    });
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, 'statusbar', Mixins.colorClasses(self));
  }
}
__reactComponentSetProps(F7Statusbar, Mixins.colorProps);
export default F7Statusbar;