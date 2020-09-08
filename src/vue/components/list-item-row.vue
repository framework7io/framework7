<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-list-item-row',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = classNames('item-row', colorClasses(props));
    return { classes };
  },
};
</script>
