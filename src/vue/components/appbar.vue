<template>
  <div :class="classes">
    <slot name="before-inner" />
    <div v-if="inner" :class="innerClasses">
      <slot />
    </div>
    <slot v-else />
    <slot name="after-inner" />
  </div>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-appbar',
  props: {
    noShadow: Boolean,
    noHairline: Boolean,
    inner: {
      type: Boolean,
      default: true,
    },
    innerClass: String,
    innerClassName: String,
    ...colorProps,
  },
  setup(props) {
    const classes = computed(() =>
      classNames(
        'appbar',
        {
          'no-shadow': props.noShadow,
          'no-hairline': props.noHairline,
        },
        colorClasses(props),
      ),
    );
    const innerClasses = computed(() =>
      classNames('appbar-inner', props.innerClass, props.innerClassName),
    );
    return { classes, innerClasses };
  },
};
</script>
