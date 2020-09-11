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
import { ref, computed, onMounted, onUpdated } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-checkbox',
  props: {
    checked: Boolean,
    indeterminate: Boolean,
    name: [Number, String],
    value: [Number, String, Boolean],
    disabled: Boolean,
    readonly: Boolean,
    ...colorProps,
  },
  emits: ['update:checked'],
  setup(props, { emit }) {
    const inputElRef = ref(null);

    const onChange = (event) => {
      emit('update:checked', event.target.checked);
    };

    onMounted(() => {
      if (inputElRef.value) {
        inputElRef.value.indeterminate = !!props.indeterminate;
      }
    });
    onUpdated(() => {
      if (inputElRef.value) {
        inputElRef.value.indeterminate = !!props.indeterminate;
      }
    });

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
