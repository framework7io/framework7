<template>
  <div :class="classes" :medium="medium">
    <slot />
  </div>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';

export default {
  name: 'f7-block-title',
  props: {
    large: Boolean,
    medium: Boolean,
    ...colorProps,
  },
  setup(props) {
    const classes = computed(() => {
      const { large, medium } = props;
      return classNames(
        'block-title',
        {
          'block-title-large': large,
          'block-title-medium': medium,
        },
        colorClasses(props),
      );
    });

    return {
      classes,
    };
  },
};
</script>
