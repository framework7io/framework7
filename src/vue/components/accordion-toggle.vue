<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-accordion-toggle',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = classNames('accordion-item-toggle', colorClasses(props));
    return { classes };
  },
};
</script>
