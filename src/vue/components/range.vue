<template>
  <div ref="elRef" :class="classes">
    <input v-if="input" id="inputId" type="range" :name="name" />
    <slot />
  </div>
</template>
<script>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { classNames, noUndefinedProps } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { f7ready, f7 } from '../shared/f7';

export default {
  name: 'f7-range',
  props: {
    init: {
      type: Boolean,
      default: true,
    },
    value: {
      type: [Number, Array, String],
      default: 0,
    },
    min: {
      type: [Number, String],
      default: 0,
    },
    max: {
      type: [Number, String],
      default: 100,
    },
    step: {
      type: [Number, String],
      default: 1,
    },
    label: {
      type: Boolean,
      default: false,
    },
    dual: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    verticalReversed: {
      type: Boolean,
      default: false,
    },
    draggableBar: {
      type: Boolean,
      default: true,
    },
    formatLabel: Function,
    scale: {
      type: Boolean,
      default: false,
    },
    scaleSteps: {
      type: Number,
      default: 5,
    },
    scaleSubSteps: {
      type: Number,
      default: 0,
    },
    formatScaleLabel: Function,
    limitKnobPosition: {
      type: Boolean,
      default: undefined,
    },
    name: String,
    input: Boolean,
    inputId: String,
    disabled: Boolean,
    ...colorProps,
  },
  emits: ['range:change', 'range:changed'],
  setup(props, { emit }) {
    const f7Range = ref(null);
    const elRef = ref(null);

    const setValue = (newValue) => {
      if (f7Range.value && f7Range.value.setValue) f7Range.value.setValue(newValue);
    };
    const getValue = () => {
      if (f7Range.value && f7Range.value.getValue) {
        return f7Range.value.getValue();
      }
      return undefined;
    };

    watch(
      () => props.value,
      (newValue) => {
        if (!f7Range.value) return;
        const rangeValue = f7Range.value.value;
        if (Array.isArray(newValue) && Array.isArray(rangeValue)) {
          if (rangeValue[0] !== newValue[0] || rangeValue[1] !== newValue[1]) {
            f7Range.value.setValue(newValue);
          }
        } else {
          f7Range.value.setValue(newValue);
        }
      },
    );

    onMounted(() => {
      f7ready(() => {
        if (!props.init || !elRef.value) return;
        f7Range.value = f7.range.create(
          noUndefinedProps({
            el: elRef.value,
            ...props,
            on: {
              change(range, val) {
                emit('range:change', val);
              },
              changed(range, val) {
                emit('range:changed', val);
              },
            },
          }),
        );
      });
    });

    onBeforeUnmount(() => {
      if (f7Range.value && f7Range.value.destroy) f7Range.value.destroy();
      f7Range.value = null;
    });

    const classes = computed(() =>
      classNames(
        'range-slider',
        {
          'range-slider-horizontal': !props.vertical,
          'range-slider-vertical': props.vertical,
          'range-slider-vertical-reversed': props.vertical && props.verticalReversed,
          disabled: props.disabled,
        },
        colorClasses(props),
      ),
    );

    return {
      classes,
      setValue,
      getValue,
    };
  },
};
</script>
