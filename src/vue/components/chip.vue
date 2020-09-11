<template>
  <div :class="classes" ref="elRef">
    <div v-if="hasMedia" :class="mediaClasses">
      <f7-icon v-if="icon" v-bind="icon.props">
        <f7-badge v-if="icon.badge" v-bind="icon.badge.props">{{ icon.badge.content }}</f7-badge>
      </f7-icon>
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
import { classNames } from '../shared/utils';
import { colorClasses, colorProps, iconProps } from '../shared/mixins';
import { useTooltip } from '../shared/use-tooltip';
import { useIcon } from '../shared/use-icon';

import f7Icon from './icon';
import f7Badge from './badge';

export default {
  name: 'f7-login-screen-title',
  components: {
    f7Icon,
    f7Badge,
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
