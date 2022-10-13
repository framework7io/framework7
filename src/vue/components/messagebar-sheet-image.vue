<template>
  <label :class="classes">
    <input type="checkbox" :checked="checked" @change="onChange" />
    <i class="icon icon-checkbox" />
    <img v-if="image" :src="image" />
    <slot />
  </label>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';

export default {
  name: 'f7-messagebar-sheet-image',
  props: {
    image: String,
    checked: Boolean,
    ...colorProps,
  },
  emits: ['checked', 'unchecked', 'change', 'update:checked'],
  setup(props, { emit }) {
    const onChange = (event) => {
      if (event.target.checked) emit('checked', event);
      else emit('unchecked', event);
      emit('update:checked', event.target.checked);
      emit('change', event);
    };
    const classes = computed(() =>
      classNames('messagebar-sheet-image', 'checkbox', colorClasses(props)),
    );
    return { classes, onChange };
  },
};
</script>
