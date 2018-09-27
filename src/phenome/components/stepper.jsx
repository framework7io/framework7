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
    big: Boolean,
    bigMd: Boolean,
    bigIos: Boolean,
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
            type={inputType}
            min={inputType === 'number' ? min : undefined}
            max={inputType === 'number' ? max : undefined}
            step={inputType === 'number' ? step : undefined}
            value={value}
            readOnly={inputReadonly}
            onInput={self.onInput.bind(self)}
          />
        );
      }
      if (process.env.COMPILER === 'vue') {
        inputEl = (
          <input
            type={inputType}
            min={inputType === 'number' ? min : undefined}
            max={inputType === 'number' ? max : undefined}
            step={inputType === 'number' ? step : undefined}
            onInput={self.onInput.bind(self)}
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
        <div className="stepper-button-minus" onClick={self.onMinusClickBound} />
        {inputWrapEl}
        {valueEl}
        <div className="stepper-button-plus" onClick={self.onPlusClickBound} />
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
        big,
        bigIos,
        bigMd,
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
          'stepper-big': big,
          'stepper-big-ios': bigIos,
          'stepper-big-md': bigMd,
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
    this.onInputBound = this.onInput.bind(this);
    this.onMinusClickBound = this.onMinusClick.bind(this);
    this.onPlusClickBound = this.onPlusClick.bind(this);
  },
  componentDidMount() {
    const self = this;
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
    if (!this.props.init) return;
    if (this.f7Stepper && this.f7Stepper.destroy) {
      this.f7Stepper.destroy();
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
