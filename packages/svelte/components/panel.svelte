<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';
  import f7 from '../utils/f7';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let side = undefined;
  export let effect = undefined;
  export let cover = false;
  export let reveal = false;
  export let left = false;
  export let right = false;
  export let opened = false;
  export let resizable = false;

  export let backdrop = true;
  export let backdropEl = undefined;
  export let visibleBreakpoint = undefined;
  export let collapsedBreakpoint = undefined;
  export let swipe = false;
  export let swipeOnlyClose = false;
  export let swipeActiveArea = 0;
  export let swipeThreshold = 0;

  let el;
  let f7Panel;

  export function instance() {
    return f7Panel;
  }

  // eslint-disable-next-line
  $: sideComputed = side || (left ? 'left' : right ? 'right' : 'left');
  // eslint-disable-next-line
  $: effectComputed = effect || (reveal ? 'reveal' : cover ? 'cover' : 'cover');
  $: classes = Utils.classNames(
    className,
    'panel',
    {
      'panel-resizable': resizable,
      [`panel-${sideComputed}`]: sideComputed,
      [`panel-${effectComputed}`]: effectComputed,
    },
    Mixins.colorClasses($$props),
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
    dispatch('panelOpen', [...args]);
    if (typeof $$props.onPanelOpen === 'function') $$props.onPanelOpen(...args);
  }
  function onOpened(...args) {
    dispatch('panelOpened', [...args]);
    if (typeof $$props.onPanelOpened === 'function') $$props.onPanelOpened(...args);
  }
  function onClose(...args) {
    dispatch('panelClose', [...args]);
    if (typeof $$props.onPanelClose === 'function') $$props.onPanelClose(...args);
  }
  function onClosed(...args) {
    dispatch('panelClosed', [...args]);
    if (typeof $$props.onPanelClosed === 'function') $$props.onPanelClosed(...args);
  }
  function onBackdropClick(...args) {
    dispatch('panelBackdropClick', [...args]);
    if (typeof $$props.onPanelBackdropClick === 'function') $$props.onPanelBackdropClick(...args);
  }
  function onSwipe(...args) {
    dispatch('panelSwipe', [...args]);
    if (typeof $$props.onPanelSwipe === 'function') $$props.onPanelSwipe(...args);
  }
  function onSwipeOpen(...args) {
    dispatch('panelSwipeOpen', [...args]);
    if (typeof $$props.onPanelSwipeOpen === 'function') $$props.onPanelSwipeOpen(...args);
  }
  function onBreakpoint(...args) {
    dispatch('panelBreakpoint', [...args]);
    if (typeof $$props.onPanelBreakpoint === 'function') $$props.onPanelBreakpoint(...args);
  }
  function onCollapsedBreakpoint(...args) {
    dispatch('panelCollapsedBreakpoint', [...args]);
    if (typeof $$props.onPanelCollapsedBreakpoint === 'function') $$props.onPanelCollapsedBreakpoint(...args);
  }
  function onResize(...args) {
    dispatch('panelResize', [...args]);
    if (typeof $$props.onPanelResize === 'function') $$props.onPanelResize(...args);
  }

  export function open(animate) {
    if (!f7Panel) return;
    f7Panel.open(animate);
  }
  export function close(animate) {
    if (!f7Panel) return;
    f7Panel.close(animate);
  }
  export function toggle(animate) {
    if (!f7Panel) return;
    f7Panel.toggle(animate);
	} // eslint-disable-line

  onMount(() => {
    f7.ready(() => {
      const dom7 = f7.instance.$;
      if (dom7('.panel-backdrop').length === 0) {
        dom7('<div class="panel-backdrop"></div>').insertBefore(el);
      }
      const params = Utils.noUndefinedProps({
        el,
        resizable,
        backdrop,
        backdropEl,
        visibleBreakpoint,
        collapsedBreakpoint,
        swipe,
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
      f7Panel = f7.instance.panel.create(params);
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

<div bind:this={el} id={id} style={style} class={classes}>
  <slot />
  {#if resizable}
    <div class="panel-resize-handler"></div>
  {/if}
</div>
