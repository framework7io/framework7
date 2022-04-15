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
  name: 'f7-messagebar-sheet',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = computed(() => classNames('messagebar-sheet', colorClasses(props)));
    return { classes };
  },
};
</script>
