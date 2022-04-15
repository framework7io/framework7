<template>
  <label :class="classes">
    <input
      ref="inputElRef"
      type="radio"
      :name="name"
      :value="value"
      :disabled="disabled"
      :readonly="readonly"
      :checked="checked"
      @change="onChange"
    />
    <i class="icon-radio" />
    <slot />
  </label>
</template>
<script>
import { ref, computed } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';

export default {
  name: 'f7-radio',
  props: {
    checked: Boolean,
    name: [Number, String],
    value: {
      type: [Number, String, Boolean],
      default: undefined,
    },
    disabled: Boolean,
    readonly: Boolean,
    ...colorProps,
  },
  emits: ['update:checked', 'change'],
  setup(props, { emit }) {
    const inputElRef = ref(null);

    const onChange = (event) => {
      emit('update:checked', event.target.checked);
      emit('change', event);
    };

    const classes = computed(() =>
      classNames(
        {
          radio: true,
          disabled: props.disabled,
        },
        colorClasses(props),
      ),
    );

    return { inputElRef, classes, onChange };
  },
};
</script>
