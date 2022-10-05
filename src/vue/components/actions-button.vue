<template>
  <div ref="elRef" :class="classes" @click="onClick">
    <div v-if="hasMedia" class="actions-button-media">
      <slot name="media" />
    </div>
    <div class="actions-button-text">
      <slot />
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7 } from '../shared/f7.js';

export default {
  name: 'f7-actions-button',
  props: {
    strong: Boolean,
    close: {
      type: Boolean,
      default: true,
    },
    ...colorProps,
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const elRef = ref(null);

    const onClick = (e) => {
      if (elRef.value && props.close && f7) {
        f7.actions.close(f7.$(elRef.value).parents('.actions-modal'));
      }
      emit('click', e);
    };

    const hasMedia = computed(() => slots && !!slots.media);

    const classes = computed(() =>
      classNames(
        {
          'actions-button': true,
          'actions-button-strong': props.strong,
        },
        colorClasses(props),
      ),
    );
    return { classes, elRef, hasMedia, onClick };
  },
};
</script>
