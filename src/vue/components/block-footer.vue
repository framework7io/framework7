<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { classNames } from '../shared/utils';
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
