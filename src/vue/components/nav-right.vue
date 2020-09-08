<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-nav-right',
  props: {
    sliding: Boolean,
    ...colorProps,
  },
  setup(props) {
    const { sliding } = props;
    const classes = classNames(
      'right',
      {
        sliding,
      },
      colorClasses(props),
    );
    return { classes };
  },
};
</script>
