<template>
  <div :class="classes" @click="onClick">
    <slot />
  </div>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';

export default {
  name: 'f7-actions-label',
  props: {
    strong: Boolean,
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
          'actions-button-strong': props.strong,
        },
        colorClasses(props),
      ),
    );
    return { classes, onClick };
  },
};
</script>
