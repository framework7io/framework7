import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7MessagebarAttachment extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onClick', 'onDeleteClick']);
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
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, image && React.createElement('img', {
      src: image
    }), deletable && React.createElement('span', {
      ref: __reactNode => {
        this.__reactRefs['deleteEl'] = __reactNode;
      },
      className: 'messagebar-attachment-delete'
    }), this.slots['default']);
  }

  componentWillUnmount() {
    this.refs.el.removeEventListener('click', this.onClick);

    if (this.refs.deleteEl) {
      this.refs.deleteEl.removeEventListener('click', this.onDeleteClick);
    }
  }

  componentDidMount() {
    this.refs.el.addEventListener('click', this.onClick);

    if (this.refs.deleteEl) {
      this.refs.deleteEl.addEventListener('click', this.onDeleteClick);
    }
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

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