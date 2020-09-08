<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-messagebar-sheet',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = classNames('messagebar-sheet', colorClasses(props));
    return { classes };
  },
};
</script>
