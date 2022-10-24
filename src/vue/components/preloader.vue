<template>
  <div :class="classes" :style="style">
    <span v-if="theme && theme.md" class="preloader-inner">
      <svg viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="16" />
      </svg>
    </span>
    <span v-else-if="theme && theme.ios" class="preloader-inner">
      <span class="preloader-inner-line" />
      <span class="preloader-inner-line" />
      <span class="preloader-inner-line" />
      <span class="preloader-inner-line" />
      <span class="preloader-inner-line" />
      <span class="preloader-inner-line" />
      <span class="preloader-inner-line" />
      <span class="preloader-inner-line" />
    </span>
    <span v-else-if="!theme" class="preloader-inner" />
  </div>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { useTheme } from '../shared/use-theme.js';

export default {
  name: 'f7-preloader',
  props: {
    size: [Number, String],
    ...colorProps,
  },
  setup(props) {
    const theme = useTheme();
    const classes = computed(() =>
      classNames(
        'preloader',
        {
          preloader: true,
        },
        colorClasses(props),
      ),
    );
    const style = computed(() => {
      const preloaderStyle = {};
      let sizeComputed = props.size;
      if (sizeComputed && typeof sizeComputed === 'string' && sizeComputed.indexOf('px') >= 0) {
        sizeComputed = sizeComputed.replace('px', '');
      }
      if (sizeComputed) {
        preloaderStyle.width = `${sizeComputed}px`;
        preloaderStyle.height = `${sizeComputed}px`;
        preloaderStyle['--f7-preloader-size'] = `${sizeComputed}px`;
      }
      return preloaderStyle;
    });
    return { classes, style, theme };
  },
};
</script>
