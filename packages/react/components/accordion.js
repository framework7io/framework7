import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Accordion extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      accordionOpposite
    } = props;
    const classes = Utils.classNames(className, 'accordion-list', accordionOpposite && 'accordion-opposite', Mixins.colorClasses(props));
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

__reactComponentSetProps(F7Accordion, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  accordionOpposite: Boolean
}, Mixins.colorProps));

F7Accordion.displayName = 'f7-accordion';
export default F7Accordion;