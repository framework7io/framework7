import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7Toggle extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }
  toggle() {
    const self = this;
    if (self.f7Toggle && self.f7Toggle.toggle)
      self.f7Toggle.toggle();
  }
  onChange(e) {
    const self = this;
    self.dispatchEvent('change', e);
  }
  render() {
    const self = this;
    const labelClasses = Utils.classNames('toggle', self.props.className, { disabled: self.props.disabled }, Mixins.colorClasses(self));
    return React.createElement('label', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: self.props.id,
      style: self.props.style,
      className: labelClasses
    }, React.createElement('input', {
      type: 'checkbox',
      name: self.props.name,
      disabled: self.props.disabled,
      readOnly: self.props.readonly,
      checked: self.props.checked,
      defaultChecked: self.props.defaultChecked,
      value: self.props.value,
      onChange: self.onChange.bind(self)
    }), React.createElement('span', { className: 'toggle-icon' }));
  }
  componentWillUnmount() {
    const self = this;
    if (self.f7Toggle && self.f7Toggle.destroy && self.f7Toggle.$el)
      self.f7Toggle.destroy();
  }
  componentDidMount() {
    const self = this;
    if (!self.props.init)
      return;
    self.$f7ready(f7 => {
      self.f7Toggle = f7.toggle.create({
        el: self.refs.el,
        on: {
          change(toggle) {
            self.dispatchEvent('toggle:change toggleChange', toggle.checked);
          }
        }
      });
    });
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
  get refs() {
    return this.__reactRefs;
  }
  set refs(refs) {
  }
  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.checked', prevProps, prevState, newValue => {
      const self = this;
      if (!self.f7Toggle)
        return;
      self.f7Toggle.checked = newValue;
    });
  }
}
__reactComponentSetProps(F7Toggle, {
  id: [
    String,
    Number
  ],
  init: {
    type: Boolean,
    default: true
  },
  checked: Boolean,
  defaultChecked: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  name: String,
  value: [
    String,
    Number,
    Array
  ],
  ...Mixins.colorProps
});
export default F7Toggle;