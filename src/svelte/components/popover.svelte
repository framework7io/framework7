<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7, f7ready } from '../shared/f7';

  const dispatch = createEventDispatcher();

  let className = undefined;
  export { className as class };

  export let opened = undefined;
  export let animate = undefined;
  export let target = undefined;
  export let backdrop = undefined;
  export let backdropEl = undefined;
  export let closeByBackdropClick = undefined;
  export let closeByOutsideClick = undefined;
  export let closeOnEscape = undefined;

  let el;
  let f7Popover;

  export function instance() {
    return f7Popover;
  }

  $: classes = classNames(className, 'popover', colorClasses($$props));

  function onOpen(instance) {
    dispatch('popoverOpen', [instance]);
    if (typeof $$props.onPopoverOpen === 'function') $$props.onPopoverOpen(instance);
  }
  function onOpened(instance) {
    dispatch('popoverOpened', [instance]);
    if (typeof $$props.onPopoverOpened === 'function') $$props.onPopoverOpened(instance);
  }
  function onClose(instance) {
    dispatch('popoverClose', [instance]);
    if (typeof $$props.onPopoverClose === 'function') $$props.onPopoverClose(instance);
  }
  function onClosed(instance) {
    dispatch('popoverClosed', [instance]);
    if (typeof $$props.onPopoverClosed === 'function') $$props.onPopoverClosed(instance);
  }

  let initialWatched = false;
  function watchOpened(openedPassed) {
    if (!initialWatched) {
      initialWatched = true;
      return;
    }
    if (!f7Popover) return;
    if (openedPassed) f7Popover.open();
    else f7Popover.close();
  }

  $: watchOpened(opened);

  onMount(() => {
    const params = {
      el,
      on: {
        open: onOpen,
        opened: onOpened,
        close: onClose,
        closed: onClosed,
      },
    };
    if (target) params.targetEl = target;

    if (typeof animate !== 'undefined') params.animate = animate;
    if (typeof closeByBackdropClick !== 'undefined')
      params.closeByBackdropClick = closeByBackdropClick;
    if (typeof closeByOutsideClick !== 'undefined')
      params.closeByOutsideClick = closeByOutsideClick;
    if (typeof closeOnEscape !== 'undefined') params.closeOnEscape = closeOnEscape;
    if (typeof backdrop !== 'undefined') params.backdrop = backdrop;
    if (typeof backdropEl !== 'undefined') params.backdropEl = backdropEl;

    f7ready(() => {
      f7Popover = f7.popover.create(params);
      if (opened) {
        f7Popover.open(false);
      }
    });
  });

  onDestroy(() => {
    if (f7Popover) f7Popover.destroy();
    f7Popover = null;
  });
</script>

<div class={classes} bind:this={el} {...restProps($$restProps)}>
  <div class="popover-angle" />
  <div class="popover-inner">
    <slot />
  </div>
</div>
