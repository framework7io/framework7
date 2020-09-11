<template>
  <div :class="classes">
    <div class="menu-inner">
      <slot />
    </div>
  </div>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-menu',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = computed(() => classNames('menu', colorClasses(props)));
    return { classes };
  },
};
</script>
