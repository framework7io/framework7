<template>
  <div ref="elRef" :class="classes">
    <div v-if="hasMedia" :class="mediaClasses">
      <f7-use-icon v-if="icon" :icon="icon" />
      {{ media }}
      <slot name="media" />
    </div>
    <div v-if="hasLabel" class="chip-label">
      {{ text }}
      <slot name="text" />
      <slot />
    </div>
    <a v-if="deleteable" class="chip-delete" @click="onDeleteClick" />
  </div>
</template>
<script>
import { ref, computed } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps, iconProps } from '../shared/mixins.js';
import { useTooltip } from '../shared/use-tooltip.js';
import { useIcon } from '../shared/use-icon.js';
import f7UseIcon from './use-icon.js';

export default {
  name: 'f7-chip',
  components: {
    f7UseIcon,
  },
  props: {
    media: String,
    text: [String, Number],
    deleteable: Boolean,
    mediaBgColor: String,
    mediaTextColor: String,
    outline: Boolean,
    tooltip: String,
    tooltipTrigger: String,
    ...iconProps,
    ...colorProps,
  },
  emits: ['delete'],
  setup(props, { slots, emit }) {
    const elRef = ref(null);

    const onDeleteClick = (event) => {
      emit('delete', event);
    };

    useTooltip(elRef, props);

    const icon = computed(() => useIcon(props));

    const mediaClasses = computed(() =>
      classNames(
        'chip-media',
        props.mediaTextColor && `text-color-${props.mediaTextColor}`,
        props.mediaBgColor && `bg-color-${props.mediaBgColor}`,
      ),
    );

    const classes = computed(() =>
      classNames(
        'chip',
        {
          'chip-outline': props.outline,
        },
        colorClasses(props),
      ),
    );

    const hasLabel = computed(() => {
      return props.text || (slots && (slots.text || slots.default));
    });

    const hasMedia = computed(() => {
      return props.media || icon.value || (slots && slots.media);
    });

    return { classes, icon, mediaClasses, elRef, hasLabel, hasMedia, onDeleteClick };
  },
};
</script>
