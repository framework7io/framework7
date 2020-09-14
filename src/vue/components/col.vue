<template>
  <component :is="tag" ref="elRef" :class="classes">
    <slot />
    <span v-if="resizable && resizableHandler" class="resize-handler" />
  </component>
</template>
<script>
import { ref, computed, onBeforeUnmount, onMounted } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { f7ready, f7 } from '../shared/f7';

export default {
  name: 'f7-col',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    width: {
      type: [Number, String],
      default: 'auto',
    },
    xsmall: { type: [Number, String] },
    small: { type: [Number, String] },
    medium: { type: [Number, String] },
    large: { type: [Number, String] },
    xlarge: { type: [Number, String] },
    resizable: Boolean,
    resizableFixed: Boolean,
    resizableAbsolute: Boolean,
    resizableHandler: {
      type: Boolean,
      default: true,
    },
    ...colorProps,
  },
  emits: ['grid:resize'],
  setup(props, { emit }) {
    const elRef = ref(null);

    const onResize = (el) => {
      if (el === elRef.value) {
        emit('grid:resize');
      }
    };

    onMounted(() => {
      f7ready(() => {
        f7.on('gridResize', onResize);
      });
    });
    onBeforeUnmount(() => {
      f7.off('gridResize', onResize);
    });

    const classes = computed(() =>
      classNames(
        {
          col: props.width === 'auto',
          [`col-${props.width}`]: props.width !== 'auto',
          [`xsmall-${props.xsmall}`]: props.xsmall,
          [`small-${props.small}`]: props.small,
          [`medium-${props.medium}`]: props.medium,
          [`large-${props.large}`]: props.large,
          [`xlarge-${props.xlarge}`]: props.xlarge,
          resizable: props.resizable,
          'resizable-fixed': props.resizableFixed,
          'resizable-absolute': props.resizableAbsolute,
        },
        colorClasses(props),
      ),
    );
    return { classes, elRef };
  },
};
</script>
