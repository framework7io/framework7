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
  name: 'f7-fab-buttons',
  props: {
    position: {
      type: String,
      default: 'top',
    },
    ...colorProps,
  },
  setup(props) {
    const classes = computed(() =>
      classNames('fab-buttons', `fab-buttons-${props.position}`, colorClasses(props)),
    );
    return { classes };
  },
};
</script>
