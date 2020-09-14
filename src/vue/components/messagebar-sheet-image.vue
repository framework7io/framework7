<template>
  <label :class="classes" :style="styles">
    <input type="checkbox" :checked="checked" @change="onChange" />
    <i class="icon icon-checkbox" />
    <slot />
  </label>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';

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
    const styles = computed(() => ({
      backgroundImage: props.image && `url(${props.image})`,
    }));
    return { classes, styles, onChange };
  },
};
</script>
