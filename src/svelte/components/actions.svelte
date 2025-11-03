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
    grid = undefined,
    convertToPopover = undefined,
    forceToPopover = undefined,
    target = undefined,
    backdrop = undefined,
    backdropEl = undefined,
    closeByBackdropClick = undefined,
    closeByOutsideClick = undefined,
    closeOnEscape = undefined,
    containerEl = undefined,
    children,
    ...restProps
  } = $props();

  let el = $state(null);
  let f7Actions = $state(null);
  let isOpened = $state(opened);
  let isClosing = $state(false);

  export function instance() {
    return f7Actions;
  }

  const classes = $derived(
    classNames(
      className,
      'actions-modal',
      {
        'actions-grid': grid,
      },
      modalStateClasses({ isOpened, isClosing }),
      colorClasses(restProps),
    ),
  );

  function onOpen(instance) {
    isOpened = true;
    isClosing = false;
    restProps.onActionsOpen?.(instance);
    opened = true;
  }
  function onOpened(instance) {
    restProps.onActionsOpened?.(instance);
  }
  function onClose(instance) {
    isOpened = false;
    isClosing = true;
    restProps.onActionsClose?.(instance);
  }
  function onClosed(instance) {
    isClosing = false;
    restProps.onActionsClosed?.(instance);
    opened = false;
  }

  let initialWatched = false;
  function watchOpened(openedPassed) {
    if (!initialWatched) {
      initialWatched = true;
      return;
    }
    if (!f7Actions) return;
    if (openedPassed) f7Actions.open();
    else f7Actions.close();
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
    if (target) params.targetEl = target;

    if (typeof convertToPopover !== 'undefined') params.convertToPopover = convertToPopover;
    if (typeof forceToPopover !== 'undefined') params.forceToPopover = forceToPopover;
    if (typeof backdrop !== 'undefined') params.backdrop = backdrop;
    if (typeof backdropEl !== 'undefined') params.backdropEl = backdropEl;
    if (typeof closeByBackdropClick !== 'undefined')
      params.closeByBackdropClick = closeByBackdropClick;
    if (typeof closeByOutsideClick !== 'undefined')
      params.closeByOutsideClick = closeByOutsideClick;
    if (typeof closeOnEscape !== 'undefined') params.closeOnEscape = closeOnEscape;
    if (typeof animate !== 'undefined') params.animate = animate;
    if (typeof containerEl !== 'undefined') params.containerEl = containerEl;

    f7ready(() => {
      f7Actions = app.f7.actions.create(params);
      if (opened) {
        f7Actions.open(false);
      }
    });
  });

  onDestroy(() => {
    if (f7Actions) f7Actions.destroy();
    f7Actions = null;
  });
</script>

<div class={classes} bind:this={el} {style} {...restProps}>
  {@render children?.(f7Actions)}
</div>
