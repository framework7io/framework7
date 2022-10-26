<template>
  <div ref="elRef" :class="classes">
    <slot />
    <div v-if="resizable" class="panel-resize-handler"></div>
  </div>
</template>
<script>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { classNames, noUndefinedProps } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';

export default {
  name: 'f7-panel',
  props: {
    side: String,
    effect: String,
    cover: Boolean,
    reveal: Boolean,
    push: Boolean,
    floating: Boolean,
    left: Boolean,
    right: Boolean,
    opened: Boolean,
    resizable: Boolean,
    backdrop: {
      type: Boolean,
      default: true,
    },
    backdropEl: {
      type: String,
      default: undefined,
    },
    containerEl: {
      type: String,
      default: undefined,
    },
    closeByBackdropClick: {
      type: Boolean,
      default: undefined,
    },
    visibleBreakpoint: {
      type: Number,
      default: undefined,
    },
    collapsedBreakpoint: {
      type: Number,
      default: undefined,
    },
    swipe: Boolean,
    swipeNoFollow: Boolean,
    swipeOnlyClose: Boolean,
    swipeActiveArea: {
      type: Number,
      default: 0,
    },
    swipeThreshold: {
      type: Number,
      default: 0,
    },
    ...colorProps,
  },
  emits: [
    'panel:open',
    'panel:opened',
    'panel:close',
    'panel:closed',
    'click',
    'panel:backdropclick',
    'panel:swipe',
    'panel:swipeopen',
    'panel:breakpoint',
    'panel:collapsedbreakpoint',
    'panel:resize',
    'update:opened',
  ],
  setup(props, { emit }) {
    let f7Panel = null;
    const elRef = ref(null);
    let isOpened = false;
    let isClosing = false;
    let isCollapsed = false;
    let isBreakpoint = false;

    const onOpen = (event) => {
      isOpened = true;
      isClosing = false;
      emit('panel:open', event);
      emit('update:opened', true);
    };
    const onOpened = (event) => {
      emit('panel:opened', event);
    };
    const onClose = (event) => {
      isOpened = false;
      isClosing = true;
      emit('panel:close', event);
    };
    const onClosed = (event) => {
      isClosing = false;
      emit('panel:closed', event);
      emit('update:opened', false);
    };
    const onBackdropClick = (event) => {
      emit('click', event);
      emit('panel:backdropclick', event);
    };
    const onSwipe = (event) => {
      emit('panel:swipe', event);
    };
    const onSwipeOpen = (event) => {
      emit('panel:swipeopen', event);
    };
    const onBreakpoint = (event) => {
      isBreakpoint = true;
      isCollapsed = false;
      emit('panel:breakpoint', event);
    };
    const onCollapsedBreakpoint = (event) => {
      isBreakpoint = false;
      isCollapsed = true;
      emit('panel:collapsedbreakpoint', event);
    };
    const onResize = (...args) => {
      emit('panel:resize', ...args);
    };

    watch(
      () => props.resizable,
      (newValue) => {
        if (!f7Panel) return;
        if (newValue) f7Panel.enableResizable();
        else f7Panel.disableResizable();
      },
    );
    watch(
      () => props.opened,
      (newValue) => {
        if (!f7Panel) return;
        if (newValue) {
          f7Panel.open();
        } else {
          f7Panel.close();
        }
      },
    );

    onMounted(() => {
      f7ready(() => {
        const $ = f7.$;
        if (!$) return;
        if ($('.panel-backdrop').length === 0) {
          $('<div class="panel-backdrop"></div>').insertBefore(elRef.value);
        }
        const params = noUndefinedProps({
          el: elRef.value,
          resizable: props.resizable,
          backdrop: props.backdrop,
          backdropEl: props.backdropEl,
          containerEl: props.containerEl,
          closeByBackdropClick: props.containerEl,
          visibleBreakpoint: props.visibleBreakpoint,
          collapsedBreakpoint: props.collapsedBreakpoint,
          swipe: props.swipe,
          swipeNoFollow: props.swipeNoFollow,
          swipeOnlyClose: props.swipeOnlyClose,
          swipeActiveArea: props.swipeActiveArea,
          swipeThreshold: props.swipeThreshold,
          on: {
            open: onOpen,
            opened: onOpened,
            close: onClose,
            closed: onClosed,
            backdropClick: onBackdropClick,
            swipe: onSwipe,
            swipeOpen: onSwipeOpen,
            collapsedBreakpoint: onCollapsedBreakpoint,
            breakpoint: onBreakpoint,
            resize: onResize,
          },
        });
        f7Panel = f7.panel.create(params);
        if (props.opened) {
          f7Panel.open(false);
        }
      });
    });

    onBeforeUnmount(() => {
      if (f7Panel && f7Panel.destroy) {
        f7Panel.destroy();
      }
      f7Panel = null;
    });

    const classes = computed(() => {
      const sideComputed = props.side || (props.left ? 'left' : 'right');
      const effectComputed =
        props.effect ||
        (props.reveal ? 'reveal' : props.push ? 'push' : props.floating ? 'floating' : 'cover'); // eslint-disable-line
      return classNames(
        'panel',
        {
          'panel-in': isOpened && !isClosing && !isBreakpoint,
          'panel-in-breakpoint': isBreakpoint,
          'panel-in-collapsed': isCollapsed,
          'panel-resizable': props.resizable,
          [`panel-${sideComputed}`]: sideComputed,
          [`panel-${effectComputed}`]: effectComputed,
        },
        colorClasses(props),
      );
    });

    return {
      elRef,
      classes,
    };
  },
};
</script>
