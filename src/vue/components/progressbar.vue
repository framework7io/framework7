<template>
  <span ref="elRef" :class="classes" :data-progress="progress">
    <span :style="transformStyle" />
  </span>
</template>
<script>
import { computed, ref } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7 } from '../shared/f7.js';

export default {
  name: 'f7-progressbar',
  props: {
    progress: Number,
    infinite: Boolean,
    ...colorProps,
  },
  setup(props) {
    const elRef = ref(null);

    const set = (newProgress, speed) => {
      if (!f7) return;
      f7.progressbar.set(elRef.value, newProgress, speed);
    };

    const transformStyle = computed(() => ({
      transform: props.progress ? `translate3d(${-100 + props.progress}%, 0, 0)` : '',
      WebkitTransform: props.progress ? `translate3d(${-100 + props.progress}%, 0, 0)` : '',
    }));

    const classes = computed(() =>
      classNames(
        'progressbar',
        {
          'progressbar-infinite': props.infinite,
        },
        colorClasses(props),
      ),
    );
    return { classes, set, transformStyle, elRef };
  },
};
</script>
