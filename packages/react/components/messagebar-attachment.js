import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7MessagebarAttachment extends React.Component {
  constructor(props, context) {
    super(props, context);

    (() => {
      this.onClickBound = this.onClick.bind(this);
      this.onDeleteClickBound = this.onDeleteClick.bind(this);
    })();
  }

  onClick(event) {
    this.dispatchEvent('attachment:click attachmentClick', event);
  }

  onDeleteClick(event) {
    this.dispatchEvent('attachment:delete attachmentDelete', event);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      deletable,
      image,
      className,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'messagebar-attachment', Mixins.colorClasses(props));
    return React.createElement('div', {
      id: id,
      style: style,
      className: classes,
      onClick: self.onClickBound
    }, image && React.createElement('img', {
      src: image
    }), deletable && React.createElement('span', {
      className: 'messagebar-attachment-delete',
      onClick: self.onDeleteClickBound
    }), this.slots['default']);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

}

__reactComponentSetProps(F7MessagebarAttachment, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  image: String,
  deletable: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7MessagebarAttachment.displayName = 'f7-messagebar-attachment';
export default F7MessagebarAttachment;