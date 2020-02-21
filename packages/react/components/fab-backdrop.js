import React from 'react';
import Utils from '../utils/utils';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7FabBackdrop extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'fab-backdrop');
    return React.createElement('div', {
      id: id,
      style: style,
      className: classes
    });
  }

}

__reactComponentSetProps(F7FabBackdrop, {
  id: [String, Number],
  className: String,
  style: Object
});

F7FabBackdrop.displayName = 'f7-fab-backdrop';
export default F7FabBackdrop;