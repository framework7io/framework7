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
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var input = props.input,
        buttonsOnly = props.buttonsOnly,
        inputType = props.inputType,
        value = props.value,
        inputReadonly = props.inputReadonly,
        min = props.min,
        max = props.max,
        step = props.step,
        id = props.id,
        style = props.style,
        name = props.name,
        inputId = props.inputId;
    var inputWrapEl;
    var valueEl;

    if (input && !buttonsOnly) {
      var inputEl;
      {
        inputEl = _h('input', {
          ref: 'inputEl',
          domProps: {
            readOnly: inputReadonly,
            value: value
          },
          on: {
            input: self.onInput,
            change: self.onChange
          },
          attrs: {
            name: name,
            id: inputId,
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
      ref: 'minusEl',
      class: 'stepper-button-minus'
    }), inputWrapEl, valueEl, _h('div', {
      ref: 'plusEl',
      class: 'stepper-button-plus'
    })]);
  },
  computed: {
    classes: function classes() {
      var self = this;
      var props = self.props;
      var round = props.round,
          roundIos = props.roundIos,
          roundMd = props.roundMd,
          roundAurora = props.roundAurora,
          fill = props.fill,
          fillIos = props.fillIos,
          fillMd = props.fillMd,
          fillAurora = props.fillAurora,
          large = props.large,
          largeIos = props.largeIos,
          largeMd = props.largeMd,
          largeAurora = props.largeAurora,
          small = props.small,
          smallIos = props.smallIos,
          smallMd = props.smallMd,
          smallAurora = props.smallAurora,
          raised = props.raised,
          raisedMd = props.raisedMd,
          raisedIos = props.raisedIos,
          raisedAurora = props.raisedAurora,
          disabled = props.disabled;
      return Utils.classNames(self.props.className, 'stepper', {
        disabled: disabled,
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
    },
    props: function props() {
      return __vueComponentProps(this);
    }
  },
  created: function created() {
    Utils.bindMethods(this, ['onInput', 'onMinusClick', 'onPlusClick']);
  },
  mounted: function mounted() {
    var self = this;
    var _self$$refs = self.$refs,
        minusEl = _self$$refs.minusEl,
        plusEl = _self$$refs.plusEl;

    if (minusEl) {
      minusEl.addEventListener('click', self.onMinusClick);
    }

    if (plusEl) {
      plusEl.addEventListener('click', self.onPlusClick);
    }

    if (!self.props.init) return;
    self.$f7ready(function (f7) {
      var _self$props = self.props,
          min = _self$props.min,
          max = _self$props.max,
          value = _self$props.value,
          step = _self$props.step,
          formatValue = _self$props.formatValue,
          autorepeat = _self$props.autorepeat,
          autorepeatDynamic = _self$props.autorepeatDynamic,
          wraps = _self$props.wraps,
          manualInputMode = _self$props.manualInputMode,
          decimalPoint = _self$props.decimalPoint,
          buttonsEndInputMode = _self$props.buttonsEndInputMode;
      var el = self.$refs.el;
      if (!el) return;
      self.f7Stepper = f7.stepper.create(Utils.noUndefinedProps({
        el: el,
        min: min,
        max: max,
        value: value,
        step: step,
        formatValue: formatValue,
        autorepeat: autorepeat,
        autorepeatDynamic: autorepeatDynamic,
        wraps: wraps,
        manualInputMode: manualInputMode,
        decimalPoint: decimalPoint,
        buttonsEndInputMode: buttonsEndInputMode,
        on: {
          change: function change(stepper, newValue) {
            self.dispatchEvent('stepper:change stepperChange', newValue);
          }
        }
      }));
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    var _self$$refs2 = self.$refs,
        minusEl = _self$$refs2.minusEl,
        plusEl = _self$$refs2.plusEl;

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
    increment: function increment() {
      if (!this.f7Stepper) return;
      this.f7Stepper.increment();
    },
    decrement: function decrement() {
      if (!this.f7Stepper) return;
      this.f7Stepper.decrement();
    },
    setValue: function setValue(newValue) {
      var self = this;
      if (self.f7Stepper && self.f7Stepper.setValue) self.f7Stepper.setValue(newValue);
    },
    getValue: function getValue() {
      var self = this;

      if (self.f7Stepper && self.f7Stepper.getValue) {
        return self.f7Stepper.getValue();
      }

      return undefined;
    },
    onInput: function onInput(event) {
      var stepper = this.f7Stepper;
      this.dispatchEvent('input', event, stepper);
    },
    onChange: function onChange(event) {
      var stepper = this.f7Stepper;
      this.dispatchEvent('change', event, stepper);
    },
    onMinusClick: function onMinusClick(event) {
      var stepper = this.f7Stepper;
      this.dispatchEvent('stepper:minusclick stepperMinusClick', event, stepper);
    },
    onPlusClick: function onPlusClick(event) {
      var stepper = this.f7Stepper;
      this.dispatchEvent('stepper:plusclick stepperPlusClick', event, stepper);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  }
};