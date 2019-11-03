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

    (() => {
      Utils.bindMethods(this, ['onChange']);
    })();
  }

  toggle() {
    const self = this;
    if (self.f7Toggle && self.f7Toggle.toggle) self.f7Toggle.toggle();
  }

  onChange(event) {
    const self = this;
    self.dispatchEvent('change', event);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      disabled,
      id,
      style,
      name,
      readonly,
      checked,
      defaultChecked,
      value
    } = props;
    const labelClasses = Utils.classNames('toggle', className, {
      disabled
    }, Mixins.colorClasses(props));
    let inputEl;
    {
      inputEl = React.createElement('input', {
        ref: __reactNode => {
          this.__reactRefs['inputEl'] = __reactNode;
        },
        type: 'checkbox',
        name: name,
        disabled: disabled,
        readOnly: readonly,
        checked: checked,
        defaultChecked: defaultChecked,
        value: value,
        onChange: self.onChange
      });
    }
    return React.createElement('label', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: labelClasses
    }, inputEl, React.createElement('span', {
      className: 'toggle-icon'
    }));
  }

  componentWillUnmount() {
    const self = this;
    if (self.f7Toggle && self.f7Toggle.destroy && self.f7Toggle.$el) self.f7Toggle.destroy();
  }

  componentDidMount() {
    const self = this;
    if (!self.props.init) return;
    self.$f7ready(f7 => {
      self.f7Toggle = f7.toggle.create({
        el: self.refs.el,
        on: {
          change(toggle) {
            const checked = toggle.checked;
            self.dispatchEvent('toggle:change toggleChange', checked);
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

  set refs(refs) {}

  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.checked', prevProps, prevState, newValue => {
      const self = this;
      if (!self.f7Toggle) return;
      self.f7Toggle.checked = newValue;
    });
  }

}

__reactComponentSetProps(F7Toggle, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  init: {
    type: Boolean,
    default: true
  },
  checked: Boolean,
  defaultChecked: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  name: String,
  value: [String, Number, Array]
}, Mixins.colorProps));

F7Toggle.displayName = 'f7-toggle';
export default F7Toggle;