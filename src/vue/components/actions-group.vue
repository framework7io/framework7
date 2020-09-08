<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-actions-group',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = classNames('actions-group', colorClasses(props));
    return { classes };
  },
};
</script>
