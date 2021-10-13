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
  name: 'f7-actions-group',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = computed(() => classNames('actions-group', colorClasses(props)));
    return { classes };
  },
};
</script>
