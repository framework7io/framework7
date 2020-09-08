<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-messagebar-title',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = classNames('messagebar-title', colorClasses(props));
    return { classes };
  },
};
</script>
