<template>
  <div :class="classes">
    <div class="menu-inner">
      <slot />
    </div>
  </div>
</template>
<script>
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-menu',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = classNames('menu', colorClasses(props));
    return { classes };
  },
};
</script>
