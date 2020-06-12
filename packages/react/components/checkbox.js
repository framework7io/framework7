import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Checkbox extends React.Component {
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

  get classes() {
    const self = this;
    const props = self.props;
    const {
      className,
      disabled
    } = props;
    return Utils.classNames(className, {
      checkbox: true,
      disabled
    }, Mixins.colorClasses(props));
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
      style
    } = props;
    let inputEl;
    {
      inputEl = React.createElement('input', {
        ref: __reactNode => {
          this.__reactRefs['inputEl'] = __reactNode;
        },
        type: 'checkbox',
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
      className: 'icon-checkbox'
    });
    return React.createElement('label', {
      id: id,
      style: style,
      className: self.classes
    }, inputEl, iconEl, this.slots['default']);
  }

  componentDidUpdate() {
    const self = this;
    const {
      inputEl
    } = self.refs;
    const {
      indeterminate
    } = self.props;

    if (inputEl) {
      inputEl.indeterminate = indeterminate;
    }
  }

  componentDidMount() {
    const self = this;
    const {
      inputEl
    } = self.refs;
    const {
      indeterminate
    } = self.props;

    if (indeterminate && inputEl) {
      inputEl.indeterminate = true;
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

__reactComponentSetProps(F7Checkbox, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  checked: Boolean,
  indeterminate: Boolean,
  name: [Number, String],
  value: [Number, String, Boolean],
  disabled: Boolean,
  readonly: Boolean,
  defaultChecked: Boolean
}, Mixins.colorProps));

F7Checkbox.displayName = 'f7-checkbox';
export default F7Checkbox;