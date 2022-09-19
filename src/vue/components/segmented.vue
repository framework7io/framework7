<template>
  <component :is="tag" :class="classes">
    <slot />
    <span v-if="strong || strongIos || strongMd" class="segmented-highlight" />
  </component>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';

export default {
  name: 'f7-segmented',
  props: {
    raised: Boolean,
    raisedIos: Boolean,
    raisedMd: Boolean,
    round: Boolean,
    roundIos: Boolean,
    roundMd: Boolean,
    strong: Boolean,
    strongIos: Boolean,
    strongMd: Boolean,
    tag: {
      type: String,
      default: 'div',
    },
    ...colorProps,
  },
  setup(props) {
    const classes = computed(() =>
      classNames(
        {
          segmented: true,
          'segmented-raised': props.raised,
          'segmented-raised-ios': props.raisedIos,
          'segmented-raised-md': props.raisedMd,
          'segmented-round': props.round,
          'segmented-round-ios': props.roundIos,
          'segmented-round-md': props.roundMd,
          'segmented-strong': props.strong,
          'segmented-strong-ios': props.strongIos,
          'segmented-strong-md': props.strongMd,
        },
        colorClasses(props),
      ),
    );
    return { classes };
  },
};
</script>
