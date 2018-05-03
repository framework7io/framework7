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
  render() {
    const self = this;
    const {deletable, image, className, id, style} = self.props;
    const classes = Utils.classNames(className, 'messagebar-attachment', Mixins.colorClasses(self));
    return React.createElement('div', {
      id: id,
      style: style,
      className: classes,
      onClick: self.onClickBound
    }, image && React.createElement('img', { src: image }), deletable && React.createElement('span', {
      className: 'messagebar-attachment-delete',
      onClick: self.onDeleteClickBound
    }), this.slots['default']);
  }
  onClick(e) {
    this.dispatchEvent('attachment:click attachmentClick', e);
  }
  onDeleteClick(e) {
    this.dispatchEvent('attachment:delete attachmentDelete', e);
  }
  get slots() {
    return __reactComponentSlots(this);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
}
__reactComponentSetProps(F7MessagebarAttachment, {
  image: String,
  deletable: {
    type: Boolean,
    default: true
  },
  ...Mixins.colorProps
});
export default F7MessagebarAttachment;