<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';
  import { modalStateClasses } from '../shared/modal-state-classes.js';

  let {
    class: className,
    style = '',
    opened = undefined,
    animate = undefined,
    targetEl = undefined,
    backdrop = undefined,
    backdropEl = undefined,
    closeByBackdropClick = undefined,
    closeByOutsideClick = undefined,
    closeOnEscape = undefined,
    containerEl = undefined,
    verticalPosition = undefined,
    children,
    ...restProps
  } = $props();

  let el = $state(null);
  let f7Popover;

  let isOpened = $state(opened);
  let isClosing = $state(false);

  export function instance() {
    return f7Popover;
  }

  const classes = $derived(
    classNames(
      className,
      'popover',
      modalStateClasses({ isOpened, isClosing }),
      colorClasses(restProps),
    ),
  );

  function onOpen(instance) {
    isOpened = true;
    isClosing = false;
    restProps.onPopoverOpen?.(instance);
    restProps.onpopoveropen?.(instance);
    opened = true;
  }
  function onOpened(instance) {
    restProps.onPopoverOpened?.(instance);
    restProps.onpopoveropened?.(instance);
  }
  function onClose(instance) {
    isOpened = false;
    isClosing = true;
    restProps.onPopoverClose?.(instance);
    restProps.onpopoverclose?.(instance);
  }
  function onClosed(instance) {
    isClosing = false;
    restProps.onPopoverClosed?.(instance);
    restProps.onpopoverclosed?.(instance);
    opened = false;
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

  $effect(() => watchOpened(opened));

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
    if (targetEl) params.targetEl = targetEl;

    if (typeof animate !== 'undefined') params.animate = animate;
    if (typeof closeByBackdropClick !== 'undefined')
      params.closeByBackdropClick = closeByBackdropClick;
    if (typeof closeByOutsideClick !== 'undefined')
      params.closeByOutsideClick = closeByOutsideClick;
    if (typeof closeOnEscape !== 'undefined') params.closeOnEscape = closeOnEscape;
    if (typeof backdrop !== 'undefined') params.backdrop = backdrop;
    if (typeof backdropEl !== 'undefined') params.backdropEl = backdropEl;
    if (typeof containerEl !== 'undefined') params.containerEl = containerEl;
    if (typeof verticalPosition !== 'undefined') params.verticalPosition = verticalPosition;

    f7ready(() => {
      f7Popover = app.f7.popover.create(params);
      if (opened) {
        f7Popover.open(targetEl, false);
      }
    });
  });

  onDestroy(() => {
    if (f7Popover) f7Popover.destroy();
    f7Popover = null;
  });
</script>

<div class={classes} bind:this={el} {style} {...restProps}>
  <div class="popover-inner">
    {@render children?.(f7Popover)}
  </div>
</div>
