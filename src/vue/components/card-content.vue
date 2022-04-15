<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';

export default {
  name: 'f7-card-content',
  props: {
    padding: {
      type: Boolean,
      default: true,
    },
    ...colorProps,
  },
  setup(props) {
    const classes = computed(() =>
      classNames(
        'card-content',
        {
          'card-content-padding': props.padding,
        },
        colorClasses(props),
      ),
    );
    return { classes };
  },
};
</script>
