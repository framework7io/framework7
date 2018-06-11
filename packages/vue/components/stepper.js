import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-stepper',
  props: Object.assign({
    id: [String, Number],
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
      default: true
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
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
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
        inputEl = _h('input', {
          domProps: {
            readonly: inputReadonly,
            value
          },
          on: {
            input: self.onInput.bind(self)
          },
          attrs: {
            type: inputType,
            min: inputType === 'number' ? min : undefined,
            max: inputType === 'number' ? max : undefined,
            step: inputType === 'number' ? step : undefined
          }
        });
      }
      inputWrapEl = _h('div', {
        class: 'stepper-input-wrap'
      }, [inputEl]);
    }

    if (!input && !buttonsOnly) {
      valueEl = _h('div', {
        class: 'stepper-value'
      }, [value]);
    }

    return _h('div', {
      ref: 'el',
      style: style,
      class: self.classes,
      attrs: {
        id: id
      }
    }, [_h('div', {
      class: 'stepper-button-minus',
      on: {
        click: self.onMinusClickBound
      }
    }), inputWrapEl, valueEl, _h('div', {
      class: 'stepper-button-plus',
      on: {
        click: self.onPlusClickBound
      }
    })]);
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
    },

    props() {
      return __vueComponentProps(this);
    }

  },

  created() {
    this.onInputBound = this.onInput.bind(this);
    this.onMinusClickBound = this.onMinusClick.bind(this);
    this.onPlusClickBound = this.onPlusClick.bind(this);
  },

  mounted() {
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
        wraps
      } = self.props;
      const el = self.$refs.el;
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
        on: {
          change(stepper, newValue) {
            self.dispatchEvent('stepper:change stepperChange', newValue);
          }

        }
      }));
    });
  },

  beforeDestroy() {
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

    onInput(e) {
      this.dispatchEvent('input', e, this.f7Stepper);
    },

    onMinusClick(e) {
      this.dispatchEvent('stepper:minusclick stepperMinusClick', e, this.f7Stepper);
    },

    onPlusClick(e) {
      this.dispatchEvent('stepper:plusclick stepperPlusClick', e, this.f7Stepper);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  }
};