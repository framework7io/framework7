<template>
  <div ref="elRef" :class="classes">
    <div class="stepper-button-minus" @click="onMinusClick" />
    <div v-if="input && !buttonsOnly" class="stepper-input-wrap">
      <input
        :id="inputId"
        :name="name"
        :type="inputType"
        :min="inputType === 'number' ? min : undefined"
        :max="inputType === 'number' ? max : undefined"
        :step="inputType === 'number' ? step : undefined"
        :value="value"
        :readonly="inputReadonly"
        @input="onInput"
        @change="onChange"
      />
    </div>
    <div v-if="!input && !buttonsOnly" class="stepper-value">{{ value }}</div>
    <div class="stepper-button-plus" @click="onPlusClick" />
  </div>
</template>
<script>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { classNames, noUndefinedProps } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';

export default {
  name: 'f7-stepper',
  props: {
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
    name: String,
    inputId: String,
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
    raisedMd: Boolean,
    raisedIos: Boolean,
    ...colorProps,
  },
  emits: [
    'input',
    'change',
    'stepper:minusclick',
    'stepper:plusclick',
    'stepper:change',
    'update:value',
  ],
  setup(props, { emit }) {
    let f7Stepper = null;
    const elRef = ref(null);

    const increment = () => {
      if (!f7Stepper) return;
      f7Stepper.increment();
    };
    const decrement = () => {
      if (!f7Stepper) return;
      f7Stepper.decrement();
    };
    const setValue = (newValue) => {
      if (f7Stepper && f7Stepper.setValue) f7Stepper.setValue(newValue);
    };
    const getValue = () => {
      if (f7Stepper && f7Stepper.getValue) {
        return f7Stepper.getValue();
      }
      return undefined;
    };
    const onInput = (event) => {
      emit('input', event, f7Stepper);
    };
    const onChange = (event) => {
      emit('change', event, f7Stepper);
    };
    const onMinusClick = (event) => {
      emit('stepper:minusclick', event, f7Stepper);
    };
    const onPlusClick = (event) => {
      emit('stepper:plusclick', event, f7Stepper);
    };

    watch(
      () => props.value,
      (newValue) => {
        if (!f7Stepper) return;
        f7Stepper.setValue(newValue);
      },
    );

    onMounted(() => {
      f7ready(() => {
        if (!props.init || !elRef.value) return;
        f7Stepper = f7.stepper.create(
          noUndefinedProps({
            el: elRef.value,
            min: props.min,
            max: props.max,
            value: props.value,
            step: props.step,
            formatValue: props.formatValue,
            autorepeat: props.autorepeat,
            autorepeatDynamic: props.autorepeatDynamic,
            wraps: props.wraps,
            manualInputMode: props.manualInputMode,
            decimalPoint: props.decimalPoint,
            buttonsEndInputMode: props.buttonsEndInputMode,
            on: {
              change(stepper, newValue) {
                emit('stepper:change', newValue);
                emit('update:value', newValue);
              },
            },
          }),
        );
      });
    });

    onBeforeUnmount(() => {
      if (f7Stepper && f7Stepper.destroy) {
        f7Stepper.destroy();
      }
      f7Stepper = null;
    });

    const classes = computed(() =>
      classNames(
        'stepper',
        {
          disabled: props.disabled,
          'stepper-round': props.round,
          'stepper-round-ios': props.roundIos,
          'stepper-round-md': props.roundMd,
          'stepper-fill': props.fill,
          'stepper-fill-ios': props.fillIos,
          'stepper-fill-md': props.fillMd,
          'stepper-large': props.large,
          'stepper-large-ios': props.largeIos,
          'stepper-large-md': props.largeMd,
          'stepper-small': props.small,
          'stepper-small-ios': props.smallIos,
          'stepper-small-md': props.smallMd,
          'stepper-raised': props.raised,
          'stepper-raised-ios': props.raisedIos,
          'stepper-raised-md': props.raisedMd,
        },
        colorClasses(props),
      ),
    );

    return {
      elRef,
      classes,
      increment,
      decrement,
      setValue,
      getValue,
      onInput,
      onChange,
      onMinusClick,
      onPlusClick,
    };
  },
};
</script>
