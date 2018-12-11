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
      Utils.bindMethods(this, ['onClick']);
    })();
  }

  onClick(event) {
    this.dispatchEvent('click', event);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      tag,
      noGap
    } = props;
    const RowTag = tag;
    const classes = Utils.classNames(className, 'row', {
      'no-gap': noGap
    }, Mixins.colorClasses(props));
    return React.createElement(RowTag, {
      id: id,
      style: style,
      className: classes,
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      }
    }, this.slots['default']);
  }

  componentWillUnmount() {
    this.refs.el.removeEventListener('click', this.onClick);
  }

  componentDidMount() {
    this.refs.el.addEventListener('click', this.onClick);
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
  }
}, Mixins.colorProps));

F7Row.displayName = 'f7-row';
export default F7Row;