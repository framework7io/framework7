<template>
  <a
    :href="href || '#'"
    :data-confirm="confirmText || undefined"
    :data-confirm-title="confirmTitle || undefined"
    :class="classes"
    @click="onClick"
  >
    {{ text }}
    <slot />
  </a>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';

export default {
  name: 'f7-swipeout-button',
  props: {
    text: String,
    confirmTitle: String,
    confirmText: String,
    overswipe: Boolean,
    close: Boolean,
    delete: Boolean,
    href: String,
    ...colorProps,
  },
  emits: ['click'],
  setup(props, { emit }) {
    const onClick = (e) => {
      emit('click', e);
    };
    const classes = computed(() =>
      classNames(
        {
          'swipeout-overswipe': props.overswipe,
          'swipeout-delete': props.delete,
          'swipeout-close': props.close,
        },
        colorClasses(props),
      ),
    );
    return {
      classes,
      onClick,
    };
  },
};
</script>
