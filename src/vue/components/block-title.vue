<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-block-title',
  props: {
    large: Boolean,
    medium: Boolean,
    ...colorProps,
  },
  setup(props) {
    const { large, medium } = props;
    const classes = classNames(
      'block-title',
      {
        'block-title-large': large,
        'block-title-medium': medium,
      },
      colorClasses(props),
    );
    return { classes };
  },
};
</script>
