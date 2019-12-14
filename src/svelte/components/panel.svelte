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
  function watchResizable(r) {
    if (f7Panel && r && !resizableOld) {
      f7Panel.enableResizable();
    } else if (f7Panel && !r && resizableOld) {
      f7Panel.disableResizable();
    }
    resizableOld = r;
  }
  $: watchResizable(resizable);

  let openedOld = opened;
  function watchOpened(o) {
    if (f7Panel && o && !openedOld) {
      f7Panel.open();
    } else if (f7Panel && !o && openedOld) {
      f7Panel.close();
    }
    openedOld = o;
  }
  $: watchOpened(opened);

  function onOpen(event) {
    dispatch('panel:open', event);
  }
  function onOpened(event) {
    dispatch('panel:opened', event);
  }
  function onClose(event) {
    dispatch('panel:close', event);
  }
  function onClosed(event) {
    dispatch('panel:closed', event);
  }
  function onBackdropClick(event) {
    dispatch('panel:backdrop-click', event);
  }
  function onSwipe(event) {
    dispatch('panel:swipe', event);
  }
  function onSwipeOpen(event) {
    dispatch('panel:swipeopen', event);
  }
  function onBreakpoint(event) {
    dispatch('panel:breakpoint', event);
  }
  function onCollapsedBreakpoint(event) {
    dispatch('panel:collapsedbreakpoint', event);
  }
  function onResize(event) {
    dispatch('panel:resize', event);
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
      const $ = f7.instance.$;
      if ($('.panel-backdrop').length === 0) {
        $('<div class="panel-backdrop"></div>').insertBefore(el);
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
