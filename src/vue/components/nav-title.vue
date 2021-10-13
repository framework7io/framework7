<template>
  <div :class="classes">
    <slot />
    {{ title }}
    <span v-if="subtitle" class="subtitle">{{ subtitle }}</span>
  </div>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';

export default {
  name: 'f7-nav-title',
  props: {
    title: String,
    subtitle: String,
    sliding: Boolean,
    ...colorProps,
  },
  setup(props) {
    const classes = computed(() =>
      classNames(
        'title',
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
