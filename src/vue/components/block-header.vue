<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-block-header',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = computed(() => classNames('block-header', colorClasses(props)));
    return { classes };
  },
};
</script>
