import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

/* phenome-dts-imports
import { Stepper as StepperNamespace } from 'framework7/components/stepper/stepper';
*/

/* phenome-dts-instance
f7Stepper: StepperNamespace.Stepper
*/

export default {
  name: 'f7-stepper',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    init: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    formatValue: Function,
    input: {
      type: Boolean,
      default: true,
    },
    inputType: {
      type: String,
      default: 'text',
    },
    inputReadonly: {
      type: Boolean,
      default: false,
    },
    autorepeat: {
      type: Boolean,
      default: false,
    },
    autorepeatDynamic: {
      type: Boolean,
      default: false,
    },
    wraps: {
      type: Boolean,
      default: false,
    },
    manualInputMode: {
      type: Boolean,
      default: false,
    },
    decimalPoint: {
      type: Number,
      default: 4,
    },
    buttonsEndInputMode: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
    buttonsOnly: Boolean,

    round: Boolean,
    roundMd: Boolean,
    roundIos: Boolean,
    fill: Boolean,
    fillMd: Boolean,
    fillIos: Boolean,
    large: Boolean,
    largeMd: Boolean,
    largeIos: Boolean,
    small: Boolean,
    smallMd: Boolean,
    smallIos: Boolean,
    raised: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      input, buttonsOnly, inputType, value, inputReadonly, min, max, step, id, style,
    } = props;

    let inputWrapEl;
    let valueEl;
    if (input && !buttonsOnly) {
      let inputEl;
      if (process.env.COMPILER === 'react') {
        inputEl = (
          <input
            ref="inputEl"
            type={inputType}
            min={inputType === 'number' ? min : undefined}
            max={inputType === 'number' ? max : undefined}
            step={inputType === 'number' ? step : undefined}
            onInput={self.onInput}
            value={value}
            readOnly={inputReadonly}
            onInput={self.onInput}
          />
        );
      }
      if (process.env.COMPILER === 'vue') {
        inputEl = (
          <input
            ref="inputEl"
            type={inputType}
            min={inputType === 'number' ? min : undefined}
            max={inputType === 'number' ? max : undefined}
            step={inputType === 'number' ? step : undefined}
            onInput={self.onInput}
            domProps={{
              readOnly: inputReadonly,
              value,
            }}
          />
        );
      }
      inputWrapEl = (
        <div className="stepper-input-wrap">
          {inputEl}
        </div>
      );
    }
    if (!input && !buttonsOnly) {
      valueEl = (
        <div className="stepper-value">{value}</div>
      );
    }
    return (
      <div ref="el" id={id} style={style} className={self.classes}>
        <div ref="minusEl" className="stepper-button-minus" />
        {inputWrapEl}
        {valueEl}
        <div ref="plusEl" className="stepper-button-plus" />
      </div>
    );
  },
  computed: {
    classes() {
      const self = this;
      const props = self.props;
      const {
        round,
        roundIos,
        roundMd,
        fill,
        fillIos,
        fillMd,
        large,
        largeIos,
        largeMd,
        small,
        smallIos,
        smallMd,
        raised,
        disabled,
      } = props;

      return Utils.classNames(
        self.props.className,
        'stepper',
        {
          disabled,
          'stepper-round': round,
          'stepper-round-ios': roundIos,
          'stepper-round-md': roundMd,
          'stepper-fill': fill,
          'stepper-fill-ios': fillIos,
          'stepper-fill-md': fillMd,
          'stepper-large': large,
          'stepper-large-ios': largeIos,
          'stepper-large-md': largeMd,
          'stepper-small': small,
          'stepper-small-ios': smallIos,
          'stepper-small-md': smallMd,
          'stepper-raised': raised,
        },
        Mixins.colorClasses(props),
      );
    },
  },
  componentDidCreate() {
    Utils.bindMethods(this, [
      'onInput',
      'onMinusClick',
      'onPlusClick',
    ]);
  },
  componentDidMount() {
    const self = this;
    const { minusEl, plusEl } = self.refs;
    if (minusEl) {
      minusEl.addEventListener('click', self.onMinusClick);
    }
    if (plusEl) {
      plusEl.addEventListener('click', self.onPlusClick);
    }
    if (!self.props.init) return;
    self.$f7ready((f7) => {
      const {
        min, max, value, step, formatValue, autorepeat, autorepeatDynamic, wraps, manualInputMode, decimalPoint, buttonsEndInputMode,
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
          },
        },
      }));
    });
  },
  componentWillUnmount() {
    const self = this;
    const { minusEl, plusEl } = self.refs;
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
  },
  methods: {
    increment() {
      if (!this.f7Stepper) return;
      this.f7Stepper.increment();
    },
    decrement() {
      if (!this.f7Stepper) return;
      this.f7Stepper.decrement();
    },
    setValue(newValue) {
      const self = this;
      if (self.f7Stepper && self.f7Stepper.setValue) self.f7Stepper.setValue(newValue);
    },
    getValue() {
      const self = this;
      if (self.f7Stepper && self.f7Stepper.getValue) {
        return self.f7Stepper.getValue();
      }
      return undefined;
    },
    onInput(event) {
      const stepper = this.f7Stepper;
      this.dispatchEvent('input', event, stepper);
    },
    onMinusClick(event) {
      const stepper = this.f7Stepper;
      this.dispatchEvent('stepper:minusclick stepperMinusClick', event, stepper);
    },
    onPlusClick(event) {
      const stepper = this.f7Stepper;
      this.dispatchEvent('stepper:plusclick stepperPlusClick', event, stepper);
    },
  },
};
