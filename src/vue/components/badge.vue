<template>
  <span :class="classes" ref="elRef">
    <slot />
  </span>
</template>
<script>
import { compile, computed, ref } from 'vue';
import { classNames, getExtraAttrs } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { useTooltip } from '../shared/use-tooltip';

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
