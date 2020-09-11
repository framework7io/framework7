<template>
  <div :class="classes">
    <span v-if="theme && theme.md" class="preloader-inner">
      <span class="preloader-inner-gap" />
      <span class="preloader-inner-left">
        <span class="preloader-inner-half-circle" />
      </span>
      <span class="preloader-inner-right">
        <span class="preloader-inner-half-circle" />
      </span>
    </span>
    <span v-else-if="theme && theme.ios" class="preloader-inner">
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
    </span>
    <span v-else-if="theme && theme.aurora" class="preloader-inner">
      <span class="preloader-inner-circle"></span>
    </span>
    <span v-else-if="!theme" class="preloader-inner"></span>
  </div>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { useTheme } from '../shared/use-theme';

export default {
  name: 'f7-preloader',
  props: {
    size: [Number, String],
    ...colorProps,
  },
  setup(props) {
    const theme = useTheme();
    const classes = computed(() => classNames('preloader', colorClasses(props)));
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
