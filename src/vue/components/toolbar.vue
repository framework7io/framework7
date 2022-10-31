<template>
  <div ref="elRef" :class="classes">
    <slot name="before-inner" />
    <div v-if="inner" className="toolbar-inner"><slot /></div>
    <slot v-else />
    <slot name="after-inner" />
  </div>
</template>
<script>
import { computed, ref, provide, onMounted, onBeforeUnmount } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7 } from '../shared/f7.js';
import { useTheme } from '../shared/use-theme.js';

export default {
  name: 'f7-toolbar',
  props: {
    tabbar: Boolean,
    icons: Boolean,
    scrollable: Boolean,
    hidden: Boolean,
    outline: { type: Boolean, default: true },
    position: {
      type: String,
      default: undefined,
    },
    topMd: {
      type: Boolean,
      default: undefined,
    },
    topIos: {
      type: Boolean,
      default: undefined,
    },
    top: {
      type: Boolean,
      default: undefined,
    },
    bottomMd: {
      type: Boolean,
      default: undefined,
    },
    bottomIos: {
      type: Boolean,
      default: undefined,
    },
    bottom: {
      type: Boolean,
      default: undefined,
    },
    inner: {
      type: Boolean,
      default: true,
    },
    ...colorProps,
  },
  emits: ['toolbar:hide', 'toolbar:show'],
  setup(props, { emit }) {
    const elRef = ref(null);
    const theme = useTheme();

    const onHide = (toolbarEl) => {
      if (elRef.value !== toolbarEl) return;
      emit('toolbar:hide');
    };
    const onShow = (toolbarEl) => {
      if (elRef.value !== toolbarEl) return;
      emit('toolbar:show');
    };
    const hide = (animate) => {
      if (!f7) return;
      f7.toolbar.hide(elRef.value, animate);
    };
    const show = (animate) => {
      if (!f7) return;
      f7.toolbar.show(elRef.value, animate);
    };

    onMounted(() => {
      if (props.tabbar && f7 && elRef.value) {
        f7.toolbar.setHighlight(elRef.value);
      }
      f7.on('toolbarShow', onShow);
      f7.on('toolbarHide', onHide);
    });

    onBeforeUnmount(() => {
      f7.off('toolbarShow', onShow);
      f7.off('toolbarHide', onHide);
    });

    const TabbarContext = computed(() => ({
      tabbarHasIcons: props.icons,
    }));

    provide('TabbarContext', TabbarContext);

    const classes = computed(() => {
      const {
        tabbar,
        bottomMd,
        bottomIos,
        bottom,
        position,
        topMd,
        topIos,
        top,
        icons,
        scrollable,
        hidden,
        outline,
      } = props;
      return classNames(
        'toolbar',
        {
          tabbar,
          'toolbar-bottom':
            (theme.value && theme.value.md && bottomMd) ||
            (theme.value && theme.value.ios && bottomIos) ||
            bottom ||
            position === 'bottom',
          'toolbar-top':
            (theme.value && theme.value.md && topMd) ||
            (theme.value && theme.value.ios && topIos) ||
            top ||
            position === 'top',
          'tabbar-icons': icons,
          'tabbar-scrollable': scrollable,
          'toolbar-hidden': hidden,
          'no-outline': !outline,
        },
        colorClasses(props),
      );
    });

    return {
      classes,
      elRef,
      hide,
      show,
    };
  },
};
</script>
