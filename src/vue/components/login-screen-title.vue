<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-login-screen-title',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = classNames('login-screen-title', colorClasses(props));
    return { classes };
  },
};
</script>
