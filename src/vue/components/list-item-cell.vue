<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-list-item-cell',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = classNames('item-cell', colorClasses(props));
    return { classes };
  },
};
</script>
