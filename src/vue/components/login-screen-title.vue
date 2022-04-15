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
  name: 'f7-login-screen-title',
  props: {
    ...colorProps,
  },
  setup(props) {
    const classes = computed(() => classNames('login-screen-title', colorClasses(props)));
    return { classes };
  },
};
</script>
