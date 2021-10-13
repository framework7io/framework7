<template>
  <label :class="classes">
    <input
      ref="inputElRef"
      type="checkbox"
      :name="name"
      :value="value"
      :disabled="disabled"
      :readonly="readonly"
      :checked="checked"
      @change="onChange"
    />
    <i class="icon-checkbox" />
    <slot />
  </label>
</template>
<script>
import { ref, computed, onMounted, watch } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';

export default {
  name: 'f7-checkbox',
  props: {
    checked: Boolean,
    indeterminate: Boolean,
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

    onMounted(() => {
      if (inputElRef.value) {
        inputElRef.value.indeterminate = !!props.indeterminate;
      }
    });

    watch(
      () => props.indeterminate,
      (newValue) => {
        if (inputElRef.value) {
          inputElRef.value.indeterminate = !!newValue;
        }
      },
    );

    const classes = computed(() =>
      classNames(
        {
          checkbox: true,
          disabled: props.disabled,
        },
        colorClasses(props),
      ),
    );

    return { inputElRef, classes, onChange };
  },
};
</script>
