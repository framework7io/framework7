import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7ListGroup extends React.Component {
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
      mediaList,
      sortable,
      sortableTapHold,
      sortableMoveElements
    } = props;
    const classes = Utils.classNames(className, 'list-group', {
      'media-list': mediaList,
      sortable,
      'sortable-tap-hold': sortableTapHold
    }, Mixins.colorClasses(props));
    return React.createElement('div', {
      id: id,
      style: style,
      className: classes,
      'data-sortable-move-elements': typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined
    }, React.createElement('ul', null, this.slots['default']));
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

}

__reactComponentSetProps(F7ListGroup, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  mediaList: Boolean,
  sortable: Boolean,
  sortableTapHold: Boolean,
  sortableMoveElements: {
    type: Boolean,
    default: undefined
  }
}, Mixins.colorProps));

F7ListGroup.displayName = 'f7-list-group';
export default F7ListGroup;