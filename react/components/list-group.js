import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const ListGroupProps = Utils.extend({
  mediaList: Boolean,
  sortable: Boolean
}, Mixins.colorProps);
class F7ListGroup extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return React.createElement('div', {
      id: this.props.id,
      style: this.props.style,
      className: this.classes
    }, React.createElement('ul', null, this.slots['default']));
  }
  get classes() {
    const self = this;
    return Utils.classNames(this.props.className, 'list-group', Mixins.colorClasses(self));
  }
  get slots() {
    return __reactComponentSlots(this);
  }
}
__reactComponentSetProps(F7ListGroup, ListGroupProps);
export default F7ListGroup;