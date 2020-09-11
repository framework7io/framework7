<template>
  <a ref="elRef" :class="classes" :target="target" @click="onClick">
    <slot />
    <span v-if="label" class="fab-label">{{ label }}</span>
  </a>
</template>
<script>
import { computed, ref } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { useTooltip } from '../shared/use-tooltip';

export default {
  name: 'f7-fab-button',
  props: {
    fabClose: Boolean,
    label: String,
    target: String,
    tooltip: String,
    tooltipTrigger: String,
    ...colorProps,
  },
  emits: ['click'],
  setup(props, { emit }) {
    const elRef = ref(null);

    const onClick = (e) => {
      emit('click', e);
    };

    useTooltip(elRef, props);

    const classes = computed(() =>
      classNames(
        {
          'fab-close': props.fabClose,
          'fab-label-button': props.label,
        },
        colorClasses(props),
      ),
    );
    return { classes, onClick, elRef };
  },
};
</script>
