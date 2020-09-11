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
  name: 'f7-nav-right',
  props: {
    sliding: Boolean,
    ...colorProps,
  },
  setup(props) {
    const classes = computed(() =>
      classNames(
        'right',
        {
          sliding: props.sliding,
        },
        colorClasses(props),
      ),
    );
    return { classes };
  },
};
</script>
