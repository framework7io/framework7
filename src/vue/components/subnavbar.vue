<template>
  <div :class="classes">
    <div v-if="inner" class="subnavbar-inner">
      <div v-if="title" class="subnavbar-title">{{ title }}</div>
      <slot />
    </div>
    <slot v-else />
  </div>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';

export default {
  name: 'f7-subnavbar',
  props: {
    sliding: Boolean,
    title: String,
    inner: {
      type: Boolean,
      default: true,
    },
    ...colorProps,
  },
  setup(props) {
    const classes = computed(() =>
      classNames(
        'subnavbar',
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
