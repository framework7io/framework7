import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Col extends React.Component {
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
      width,
      xsmall,
      small,
      medium,
      large,
      xlarge,
      resizable,
      resizableFixed,
      resizableAbsolute,
      resizableHandler
    } = props;
    const ColTag = tag;
    const classes = Utils.classNames(className, {
      col: width === 'auto',
      [`col-${width}`]: width !== 'auto',
      [`xsmall-${xsmall}`]: xsmall,
      [`small-${small}`]: small,
      [`medium-${medium}`]: medium,
      [`large-${large}`]: large,
      [`xlarge-${xlarge}`]: xlarge,
      resizable,
      'resizable-fixed': resizableFixed,
      'resizable-absolute': resizableAbsolute
    }, Mixins.colorClasses(props));
    return React.createElement(ColTag, {
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

__reactComponentSetProps(F7Col, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  tag: {
    type: String,
    default: 'div'
  },
  width: {
    type: [Number, String],
    default: 'auto'
  },
  xsmall: {
    type: [Number, String]
  },
  small: {
    type: [Number, String]
  },
  medium: {
    type: [Number, String]
  },
  large: {
    type: [Number, String]
  },
  xlarge: {
    type: [Number, String]
  },
  resizable: Boolean,
  resizableFixed: Boolean,
  resizableAbsolute: Boolean,
  resizableHandler: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7Col.displayName = 'f7-col';
export default F7Col;