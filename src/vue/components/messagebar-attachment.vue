<template>
  <div :class="classes" @click="onClick">
    <img v-if="image" :src="image" />
    <span v-if="deletable" class="messagebar-attachment-delete" @click="onDeleteClick" />
    <slot />
  </div>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';

export default {
  name: 'f7-messagebar-attachment',
  props: {
    image: String,
    deletable: {
      type: Boolean,
      default: true,
    },
    ...colorProps,
  },
  emits: ['attachment:click', 'attachment:delete'],
  setup(props, { emit }) {
    const onClick = (event) => {
      emit('attachment:click', event);
    };
    const onDeleteClick = (event) => {
      emit('attachment:delete', event);
    };
    const classes = computed(() => classNames('messagebar-attachment', colorClasses(props)));
    return {
      classes,
      onClick,
      onDeleteClick,
    };
  },
};
</script>
