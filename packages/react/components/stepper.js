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
      Utils.bindMethods(this, ['onInput', 'onMinusClick', 'onPlusClick']);
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

  onChange(event) {
    const stepper = this.f7Stepper;
    this.dispatchEvent('change', event, stepper);
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
      roundAurora,
      fill,
      fillIos,
      fillMd,
      fillAurora,
      large,
      largeIos,
      largeMd,
      largeAurora,
      small,
      smallIos,
      smallMd,
      smallAurora,
      raised,
      raisedMd,
      raisedIos,
      raisedAurora,
      disabled
    } = props;
    return Utils.classNames(self.props.className, 'stepper', {
      disabled,
      'stepper-round': round,
      'stepper-round-ios': roundIos,
      'stepper-round-md': roundMd,
      'stepper-round-aurora': roundAurora,
      'stepper-fill': fill,
      'stepper-fill-ios': fillIos,
      'stepper-fill-md': fillMd,
      'stepper-fill-aurora': fillAurora,
      'stepper-large': large,
      'stepper-large-ios': largeIos,
      'stepper-large-md': largeMd,
      'stepper-large-aurora': largeAurora,
      'stepper-small': small,
      'stepper-small-ios': smallIos,
      'stepper-small-md': smallMd,
      'stepper-small-aurora': smallAurora,
      'stepper-raised': raised,
      'stepper-raised-ios': raisedIos,
      'stepper-raised-md': raisedMd,
      'stepper-raised-aurora': raisedAurora
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
      style,
      name,
      inputId
    } = props;
    let inputWrapEl;
    let valueEl;

    if (input && !buttonsOnly) {
      let inputEl;
      {
        inputEl = React.createElement('input', {
          ref: __reactNode => {
            this.__reactRefs['inputEl'] = __reactNode;
          },
          name: name,
          id: inputId,
          type: inputType,
          min: inputType === 'number' ? min : undefined,
          max: inputType === 'number' ? max : undefined,
          step: inputType === 'number' ? step : undefined,
          onInput: self.onInput,
          onChange: self.onChange,
          value: value,
          readOnly: inputReadonly
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
      ref: __reactNode => {
        this.__reactRefs['minusEl'] = __reactNode;
      },
      className: 'stepper-button-minus'
    }), inputWrapEl, valueEl, React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['plusEl'] = __reactNode;
      },
      className: 'stepper-button-plus'
    }));
  }

  componentWillUnmount() {
    const self = this;
    const {
      minusEl,
      plusEl
    } = self.refs;

    if (minusEl) {
      minusEl.removeEventListener('click', self.onMinusClick);
    }

    if (plusEl) {
      plusEl.removeEventListener('click', self.onPlusClick);
    }

    if (!self.props.init) return;

    if (self.f7Stepper && self.f7Stepper.destroy) {
      self.f7Stepper.destroy();
    }
  }

  componentDidMount() {
    const self = this;
    const {
      minusEl,
      plusEl
    } = self.refs;

    if (minusEl) {
      minusEl.addEventListener('click', self.onMinusClick);
    }

    if (plusEl) {
      plusEl.addEventListener('click', self.onPlusClick);
    }

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
  name: String,
  inputId: String,
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
  roundAurora: Boolean,
  fill: Boolean,
  fillMd: Boolean,
  fillIos: Boolean,
  fillAurora: Boolean,
  large: Boolean,
  largeMd: Boolean,
  largeIos: Boolean,
  largeAurora: Boolean,
  small: Boolean,
  smallMd: Boolean,
  smallIos: Boolean,
  smallAurora: Boolean,
  raised: Boolean,
  raisedMd: Boolean,
  raisedIos: Boolean,
  raisedAurora: Boolean
}, Mixins.colorProps));

F7Stepper.displayName = 'f7-stepper';
export default F7Stepper;