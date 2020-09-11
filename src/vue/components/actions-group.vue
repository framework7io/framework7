<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { computed } from 'vue';

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
