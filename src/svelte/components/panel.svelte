<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, noUndefinedProps } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';

  let {
    class: className,
    side = undefined,
    effect: effectProp = undefined,
    cover = false,
    reveal = false,
    push = false,
    floating = false,
    left = false,
    right = false,
    opened = false,
    resizable = false,
    backdrop = true,
    backdropEl = undefined,
    containerEl = undefined,
    closeByBackdropClick = undefined,
    visibleBreakpoint = undefined,
    collapsedBreakpoint = undefined,
    swipe = false,
    swipeNoFollow = false,
    swipeOnlyClose = false,
    swipeActiveArea = 0,
    swipeThreshold = 0,
    f7Slot = 'fixed',
    children,
    ...restProps
  } = $props();

  let el = $state(null);
  let f7Panel = $state(null);

  let isOpened = $state(false);
  let isClosing = $state(false);
  let isCollapsed = $state(false);
  let isBreakpoint = $state(false);

  export function instance() {
    return f7Panel;
  }

  const sideComputed = $derived(side || (left ? 'left' : right ? 'right' : 'left'));
  const effectComputed = $derived(
    effectProp || (reveal ? 'reveal' : push ? 'push' : floating ? 'floating' : 'cover'),
  );
  const classes = $derived(
    classNames(
      className,
      'panel',
      {
        'panel-in': isOpened && !isClosing && !isBreakpoint,
        'panel-out': isClosing,
        'panel-in-breakpoint': isBreakpoint,
        'panel-in-collapsed': isCollapsed,
        'panel-resizable': resizable,
        [`panel-${sideComputed}`]: sideComputed,
        [`panel-${effectComputed}`]: effectComputed,
      },
      colorClasses(restProps),
    ),
  );

  let resizableOld = $state(resizable);
  let initialWatchedResizable = $state(false);
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
  $effect(() => watchResizable(resizable));

  let openedOld = $state(opened);
  let initialWatchedOpened = $state(false);
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
  $effect(() => watchOpened(opened));

  function onOpen(...args) {
    isOpened = true;
    isClosing = false;
    restProps.onPanelOpen?.(args);
    restProps.onpanelopen?.(args);
    opened = true;
  }
  function onOpened(...args) {
    restProps.onPanelOpened?.(args);
    restProps.onpanelopened?.(args);
  }
  function onClose(...args) {
    isOpened = false;
    isClosing = true;
    restProps.onPanelClose?.(args);
    restProps.onpanelclose?.(args);
  }
  function onClosed(...args) {
    isClosing = false;
    restProps.onPanelClosed?.(args);
    restProps.onpanelclosed?.(args);
    opened = false;
  }
  function onBackdropClick(...args) {
    restProps.onPanelBackdropClick?.(args);
    restProps.onpanelbackdropclick?.(args);
  }
  function onSwipe(...args) {
    restProps.onPanelSwipe?.(args);
    restProps.onpanelswipe?.(args);
  }
  function onSwipeOpen(...args) {
    restProps.onPanelSwipeOpen?.(args);
    restProps.onpanelswipeopen?.(args);
  }
  function onBreakpoint(...args) {
    isBreakpoint = true;
    isCollapsed = false;
    restProps.onPanelBreakpoint?.(args);
    restProps.onpanelbreakpoint?.(args);
  }
  function onCollapsedBreakpoint(...args) {
    isBreakpoint = false;
    isCollapsed = true;
    restProps.onPanelCollapsedBreakpoint?.(args);
    restProps.onpanelcollapsedbreakpoint?.(args);
  }
  function onResize(...args) {
    restProps.onPanelResize?.(args);
    restProps.onpanelresize?.(args);
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

<div bind:this={el} class={classes} data-f7-slot={f7Slot} {...restProps}>
  {@render children?.(f7Panel)}
  {#if resizable}
    <div class="panel-resize-handler"></div>
  {/if}
</div>
