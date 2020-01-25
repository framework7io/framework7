import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Radio extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onChange']);
    })();
  }

  onChange(event) {
    this.dispatchEvent('change', event);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      name,
      value,
      disabled,
      readonly,
      checked,
      defaultChecked,
      id,
      style,
      className
    } = props;
    let inputEl;
    {
      inputEl = React.createElement('input', {
        ref: __reactNode => {
          this.__reactRefs['inputEl'] = __reactNode;
        },
        type: 'radio',
        name: name,
        value: value,
        disabled: disabled,
        readOnly: readonly,
        checked: checked,
        defaultChecked: defaultChecked,
        onChange: self.onChange
      });
    }
    const iconEl = React.createElement('i', {
      className: 'icon-radio'
    });
    const classes = Utils.classNames(className, 'radio', {
      disabled
    }, Mixins.colorClasses(props));
    return React.createElement('label', {
      id: id,
      style: style,
      className: classes
    }, inputEl, iconEl, this.slots['default']);
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

__reactComponentSetProps(F7Radio, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  checked: Boolean,
  name: [Number, String],
  value: [Number, String, Boolean],
  disabled: Boolean,
  readonly: Boolean,
  defaultChecked: Boolean
}, Mixins.colorProps));

F7Radio.displayName = 'f7-radio';
export default F7Radio;