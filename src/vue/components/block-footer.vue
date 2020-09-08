<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-block-footer',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = classNames('block-footer', colorClasses(props));
    return { classes };
  },
};
</script>
