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
  name: 'f7-swipeout-actions',
  props: {
    left: Boolean,
    right: Boolean,
    side: String,
    ...colorProps,
  },
  setup(props) {
    const side = computed(() => {
      let sideComputed = props.side;
      if (!sideComputed) {
        if (props.left) sideComputed = 'left';
        if (props.right) sideComputed = 'right';
      }
      return sideComputed;
    });
    const classes = computed(() =>
      classNames(`swipeout-actions-${side.value}`, colorClasses(props)),
    );

    return { classes };
  },
};
</script>
