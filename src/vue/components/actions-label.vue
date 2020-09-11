<template>
  <div :class="classes" @click="onClick">
    <slot />
  </div>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-actions-label',
  props: {
    bold: Boolean,
    ...colorProps,
  },
  emits: ['click'],
  setup(props, { emit }) {
    const onClick = (e) => {
      emit('click', e);
    };
    const classes = computed(() =>
      classNames(
        'actions-label',
        {
          'actions-button-bold': props.bold,
        },
        colorClasses(props),
      ),
    );
    return { classes, onClick };
  },
};
</script>
