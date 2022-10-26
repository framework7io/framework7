<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { restProps } from '../shared/rest-props.js';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, noUndefinedProps, createEmitter } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let side = undefined;
  export let effect = undefined;
  // svelte-ignore unused-export-let
  export let cover = false;
  export let reveal = false;
  export let push = false;
  export let floating = false;
  export let left = false;
  export let right = false;
  export let opened = false;
  export let resizable = false;

  export let backdrop = true;
  export let backdropEl = undefined;
  export let containerEl = undefined;
  export let closeByBackdropClick = undefined;
  export let visibleBreakpoint = undefined;
  export let collapsedBreakpoint = undefined;
  export let swipe = false;
  export let swipeNoFollow = false;
  export let swipeOnlyClose = false;
  export let swipeActiveArea = 0;
  export let swipeThreshold = 0;

  export let f7Slot = 'fixed';

  let el;
  let f7Panel;

  const state = {
    isOpened: false,
    isClosing: false,
    isCollapsed: false,
    isBreakpoint: false,
  };

  export function instance() {
    return f7Panel;
  }

  // eslint-disable-next-line
  $: sideComputed = side || (left ? 'left' : right ? 'right' : 'left');
  // eslint-disable-next-line
  $: effectComputed =
    effect || (reveal ? 'reveal' : push ? 'push' : floating ? 'floating' : 'cover');
  $: classes = classNames(
    className,
    'panel',
    {
      'panel-in': state.isOpened && !state.isClosing && !state.isBreakpoint,
      'panel-in-breakpoint': state.isBreakpoint,
      'panel-in-collapsed': state.isCollapsed,
      'panel-resizable': resizable,
      [`panel-${sideComputed}`]: sideComputed,
      [`panel-${effectComputed}`]: effectComputed,
    },
    colorClasses($$props),
  );

  let resizableOld = resizable;
  let initialWatchedResizable = false;
  function watchResizable(r) {
    if (!initialWatchedResizable) {
      initialWatchedResizable = true;
      return;
    }
    if (f7Panel && r && !resizableOld) {
      f7Panel.enableResizable();
    } else if (f7Panel && !r && resizableOld) {
      f7Panel.disableResizable();
    }
    resizableOld = r;
  }
  $: watchResizable(resizable);

  let openedOld = opened;
  let initialWatchedOpened = false;
  function watchOpened(o) {
    if (!initialWatchedOpened) {
      initialWatchedOpened = true;
      return;
    }
    if (f7Panel && o && !openedOld) {
      f7Panel.open();
    } else if (f7Panel && !o && openedOld) {
      f7Panel.close();
    }
    openedOld = o;
  }
  $: watchOpened(opened);

  function onOpen(...args) {
    Object.assign(state, {
      isOpened: true,
      isClosing: false,
    });

    emit('panelOpen', args);
    opened = true;
  }
  function onOpened(...args) {
    emit('panelOpened', args);
  }
  function onClose(...args) {
    Object.assign(state, {
      isOpened: false,
      isClosing: true,
    });
    emit('panelClose', args);
  }
  function onClosed(...args) {
    Object.assign(state, {
      isClosing: false,
    });
    emit('panelClosed', args);
    opened = false;
  }
  function onBackdropClick(...args) {
    emit('panelBackdropClick', args);
  }
  function onSwipe(...args) {
    emit('panelSwipe', args);
  }
  function onSwipeOpen(...args) {
    emit('panelSwipeOpen', args);
  }
  function onBreakpoint(...args) {
    Object.assign(state, {
      isBreakpoint: true,
      isCollapsed: false,
    });
    emit('panelBreakpoint', args);
  }
  function onCollapsedBreakpoint(...args) {
    Object.assign(state, {
      isBreakpoint: false,
      isCollapsed: true,
    });
    emit('panelCollapsedBreakpoint', args);
  }
  function onResize(...args) {
    emit('panelResize', args);
  }

  onMount(() => {
    f7ready(() => {
      const dom7 = app.f7.$;
      if (dom7('.panel-backdrop').length === 0) {
        dom7('<div class="panel-backdrop"></div>').insertBefore(el);
      }
      const params = noUndefinedProps({
        el,
        resizable,
        backdrop,
        backdropEl,
        containerEl,
        closeByBackdropClick,
        visibleBreakpoint,
        collapsedBreakpoint,
        swipe,
        swipeNoFollow,
        swipeOnlyClose,
        swipeActiveArea,
        swipeThreshold,
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
      f7Panel = app.f7.panel.create(params);
      if (opened) {
        f7Panel.open(false);
      }
    });
  });

  onDestroy(() => {
    if (f7Panel && f7Panel.destroy) {
      f7Panel.destroy();
    }
    f7Panel = null;
  });
</script>

<div bind:this={el} class={classes} data-f7-slot={f7Slot} {...restProps($$restProps)}>
  <slot panel={f7Panel} />
  {#if resizable}
    <div class="panel-resize-handler" />
  {/if}
</div>
