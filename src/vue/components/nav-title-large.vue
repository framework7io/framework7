<template>
  <div :class="classes">
    <div class="title-large-text"><slot /></div>
  </div>
</template>
<script>
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-nav-title-large',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = classNames('title-large', colorClasses(props));
    return { classes };
  },
};
</script>
