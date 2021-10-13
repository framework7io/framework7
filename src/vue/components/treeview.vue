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
  name: 'f7-treeview',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = computed(() => classNames('treeview', colorClasses(props)));
    return { classes };
  },
};
</script>
