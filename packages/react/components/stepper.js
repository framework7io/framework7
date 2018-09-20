import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Stepper extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      this.onInputBound = this.onInput.bind(this);
      this.onMinusClickBound = this.onMinusClick.bind(this);
      this.onPlusClickBound = this.onPlusClick.bind(this);
    })();
  }

  increment() {
    if (!this.f7Stepper) return;
    this.f7Stepper.increment();
  }

  decrement() {
    if (!this.f7Stepper) return;
    this.f7Stepper.decrement();
  }

  setValue(newValue) {
    const self = this;
    if (self.f7Stepper && self.f7Stepper.setValue) self.f7Stepper.setValue(newValue);
  }

  getValue() {
    const self = this;

    if (self.f7Stepper && self.f7Stepper.getValue) {
      return self.f7Stepper.getValue();
    }

    return undefined;
  }

  onInput(event) {
    const stepper = this.f7Stepper;
    this.dispatchEvent('input', event, stepper);
  }

  onMinusClick(event) {
    const stepper = this.f7Stepper;
    this.dispatchEvent('stepper:minusclick stepperMinusClick', event, stepper);
  }

  onPlusClick(event) {
    const stepper = this.f7Stepper;
    this.dispatchEvent('stepper:plusclick stepperPlusClick', event, stepper);
  }

  get classes() {
    const self = this;
    const props = self.props;
    const {
      round,
      roundIos,
      roundMd,
      fill,
      fillIos,
      fillMd,
      big,
      bigIos,
      bigMd,
      small,
      smallIos,
      smallMd,
      raised,
      disabled
    } = props;
    return Utils.classNames(self.props.className, 'stepper', {
      disabled,
      'stepper-round': round,
      'stepper-round-ios': roundIos,
      'stepper-round-md': roundMd,
      'stepper-fill': fill,
      'stepper-fill-ios': fillIos,
      'stepper-fill-md': fillMd,
      'stepper-big': big,
      'stepper-big-ios': bigIos,
      'stepper-big-md': bigMd,
      'stepper-small': small,
      'stepper-small-ios': smallIos,
      'stepper-small-md': smallMd,
      'stepper-raised': raised
    }, Mixins.colorClasses(props));
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      input,
      buttonsOnly,
      inputType,
      value,
      inputReadonly,
      min,
      max,
      step,
      id,
      style
    } = props;
    let inputWrapEl;
    let valueEl;

    if (input && !buttonsOnly) {
      let inputEl;
      {
        inputEl = React.createElement('input', {
          type: inputType,
          min: inputType === 'number' ? min : undefined,
          max: inputType === 'number' ? max : undefined,
          step: inputType === 'number' ? step : undefined,
          value: value,
          readOnly: inputReadonly,
          onInput: self.onInput.bind(self)
        });
      }
      inputWrapEl = React.createElement('div', {
        className: 'stepper-input-wrap'
      }, inputEl);
    }

    if (!input && !buttonsOnly) {
      valueEl = React.createElement('div', {
        className: 'stepper-value'
      }, value);
    }

    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: self.classes
    }, React.createElement('div', {
      className: 'stepper-button-minus',
      onClick: self.onMinusClickBound
    }), inputWrapEl, valueEl, React.createElement('div', {
      className: 'stepper-button-plus',
      onClick: self.onPlusClickBound
    }));
  }

  componentWillUnmount() {
    if (!this.props.init) return;

    if (this.f7Stepper && this.f7Stepper.destroy) {
      this.f7Stepper.destroy();
    }
  }

  componentDidMount() {
    const self = this;
    if (!self.props.init) return;
    self.$f7ready(f7 => {
      const {
        min,
        max,
        value,
        step,
        formatValue,
        autorepeat,
        autorepeatDynamic,
        wraps,
        manualInputMode,
        decimalPoint,
        buttonsEndInputMode
      } = self.props;
      const el = self.refs.el;
      if (!el) return;
      self.f7Stepper = f7.stepper.create(Utils.noUndefinedProps({
        el,
        min,
        max,
        value,
        step,
        formatValue,
        autorepeat,
        autorepeatDynamic,
        wraps,
        manualInputMode,
        decimalPoint,
        buttonsEndInputMode,
        on: {
          change(stepper, newValue) {
            self.dispatchEvent('stepper:change stepperChange', newValue);
          }

        }
      }));
    });
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7Stepper, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  init: {
    type: Boolean,
    default: true
  },
  value: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  formatValue: Function,
  input: {
    type: Boolean,
    default: true
  },
  inputType: {
    type: String,
    default: 'text'
  },
  inputReadonly: {
    type: Boolean,
    default: false
  },
  autorepeat: {
    type: Boolean,
    default: false
  },
  autorepeatDynamic: {
    type: Boolean,
    default: false
  },
  wraps: {
    type: Boolean,
    default: false
  },
  manualInputMode: {
    type: Boolean,
    default: false
  },
  decimalPoint: {
    type: Number,
    default: 4
  },
  buttonsEndInputMode: {
    type: Boolean,
    default: true
  },
  disabled: Boolean,
  buttonsOnly: Boolean,
  round: Boolean,
  roundMd: Boolean,
  roundIos: Boolean,
  fill: Boolean,
  fillMd: Boolean,
  fillIos: Boolean,
  big: Boolean,
  bigMd: Boolean,
  bigIos: Boolean,
  small: Boolean,
  smallMd: Boolean,
  smallIos: Boolean,
  raised: Boolean
}, Mixins.colorProps));

F7Stepper.displayName = 'f7-stepper';
export default F7Stepper;