<template>
  <span ref="elRef" :class="classes">
    <slot />
  </span>
</template>
<script>
import { computed, ref } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { useTooltip } from '../shared/use-tooltip.js';

export default {
  name: 'f7-badge',
  props: {
    tooltip: String,
    tooltipTrigger: String,
    ...colorProps,
  },
  setup(props) {
    const elRef = ref(null);

    useTooltip(elRef, props);

    const classes = computed(() => classNames('badge', colorClasses(props)));

    return {
      elRef,
      classes,
    };
  },
};
</script>
