<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-views',
  props: {
    tabs: Boolean,
    ...colorProps,
  },
  setup(props) {
    const { tabs } = props;
    const classes = classNames(
      'views',
      {
        tabs,
      },
      colorClasses(props),
    );
    return { classes };
  },
};
</script>
