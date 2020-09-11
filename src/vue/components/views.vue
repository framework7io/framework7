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
  name: 'f7-views',
  props: {
    tabs: Boolean,
    ...colorProps,
  },
  setup(props) {
    const classes = computed(() =>
      classNames(
        'views',
        {
          tabs: props.tabs,
        },
        colorClasses(props),
      ),
    );
    return { classes };
  },
};
</script>
