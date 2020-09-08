<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-accordion-content',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = classNames('accordion-item-content', colorClasses(props));
    return { classes };
  },
};
</script>
