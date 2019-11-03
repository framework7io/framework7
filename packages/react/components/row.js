import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Row extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onClick', 'onResize']);
    })();
  }

  onClick(event) {
    this.dispatchEvent('click', event);
  }

  onResize(el) {
    if (el === this.eventTargetEl) {
      this.dispatchEvent('grid:resize gridResize');
    }
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      tag,
      noGap,
      resizable,
      resizableFixed,
      resizableAbsolute,
      resizableHandler
    } = props;
    const RowTag = tag;
    const classes = Utils.classNames(className, 'row', {
      'no-gap': noGap,
      resizable,
      'resizable-fixed': resizableFixed,
      'resizable-absolute': resizableAbsolute
    }, Mixins.colorClasses(props));
    return React.createElement(RowTag, {
      id: id,
      style: style,
      className: classes,
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      }
    }, this.slots['default'], resizable && resizableHandler && React.createElement('span', {
      className: 'resize-handler'
    }));
  }

  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    if (!el || !self.$f7) return;
    el.removeEventListener('click', self.onClick);
    self.$f7.off('gridResize', self.onResize);
    delete self.eventTargetEl;
  }

  componentDidMount() {
    const self = this;
    self.eventTargetEl = self.refs.el;
    self.eventTargetEl.addEventListener('click', self.onClick);
    self.$f7ready(f7 => {
      f7.on('gridResize', self.onResize);
    });
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

__reactComponentSetProps(F7Row, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  noGap: Boolean,
  tag: {
    type: String,
    default: 'div'
  },
  resizable: Boolean,
  resizableFixed: Boolean,
  resizableAbsolute: Boolean,
  resizableHandler: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7Row.displayName = 'f7-row';
export default F7Row;