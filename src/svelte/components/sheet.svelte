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
    top = undefined,
    bottom = undefined,
    position = undefined,
    backdrop = undefined,
    backdropEl = undefined,
    closeByBackdropClick = undefined,
    closeByOutsideClick = undefined,
    closeOnEscape = undefined,
    push = undefined,
    swipeToClose = undefined,
    swipeToStep = undefined,
    swipeHandler = undefined,
    containerEl = undefined,
    breakpoints = undefined,
    backdropBreakpoint = undefined,
    pushBreakpoint = undefined,
    children,
    fixedContent,
    staticContent,
    ...restProps
  } = $props();

  let el = $state(null);
  let innerEl = $state(null);
  let f7Sheet;

  let isOpened = $state(false);
  let isClosing = $state(false);
  let swipeStep = $state(false);
  let breakpoint = $state(false);

  export function instance() {
    return f7Sheet;
  }

  const positionComputed = $derived.by(() => {
    if (position) return position;
    if (top) return 'top';
    if (bottom) return 'bottom';
    return 'bottom';
  });

  const classes = $derived(
    classNames(
      className,
      'sheet-modal',
      `sheet-modal-${positionComputed}`,
      {
        'sheet-modal-push': push,
        'modal-in-swipe-step': swipeStep,
        'modal-in-breakpoint': breakpoint,
      },

      modalStateClasses({
        isOpened,
        isClosing,
        swipeStep,
        breakpoint,
      }),
      colorClasses(restProps),
    ),
  );

  function onOpen(instance) {
    isOpened = true;
    isClosing = false;
    restProps.onSheetOpen?.(instance);
    restProps.onsheetopen?.(instance);
    opened = true;
  }
  function onOpened(instance) {
    restProps.onSheetOpened?.(instance);
    restProps.onsheetopened?.(instance);
  }
  function onClose(instance) {
    isOpened = false;
    isClosing = true;
    restProps.onSheetClose?.(instance);
    restProps.onsheetclose?.(instance);
  }
  function onClosed(instance) {
    isClosing = false;
    restProps.onSheetClosed?.(instance);
    restProps.onsheetclosed?.(instance);
    opened = false;
  }
  function onBreakpoint(instance, breakpoint) {
    restProps.onSheetBreakpoint?.(instance, breakpoint);
    restProps.onsheetbreakpoint?.(instance, breakpoint);
  }
  function onStepProgress(instance, progress) {
    restProps.onSheetStepProgress?.(instance, progress);
    restProps.onsheetstepprogress?.(instance, progress);
  }
  function onStepOpen(instance) {
    restProps.onSheetStepOpen?.(instance);
    restProps.onsheetstepopen?.(instance);
  }
  function onStepClose(instance) {
    restProps.onSheetStepClose?.(instance);
    restProps.onsheetstepclose?.(instance);
  }

  let initialWatched = false;
  function watchOpened(openedPassed) {
    if (!initialWatched) {
      initialWatched = true;
      return;
    }
    if (!f7Sheet) return;
    if (openedPassed) f7Sheet.open();
    else f7Sheet.close();
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
        stepOpen: onStepOpen,
        stepClose: onStepClose,
        stepProgress: onStepProgress,
        breakpoint: (s, value) => {
          if (value > 0 && value < 1) {
            breakpoint = true;
          } else {
            breakpoint = false;
          }
          onBreakpoint(s, value);
        },
        // eslint-disable-next-line
        _swipeStep(isSwipeStep) {
          swipeStep = isSwipeStep;
        },
      },
    };
    if (typeof backdrop !== 'undefined') params.backdrop = backdrop;
    if (typeof animate !== 'undefined') params.animate = animate;
    if (typeof backdropEl !== 'undefined') params.backdropEl = backdropEl;
    if (typeof closeByBackdropClick !== 'undefined')
      params.closeByBackdropClick = closeByBackdropClick;
    if (typeof closeByOutsideClick !== 'undefined')
      params.closeByOutsideClick = closeByOutsideClick;
    if (typeof closeOnEscape !== 'undefined') params.closeOnEscape = closeOnEscape;
    if (typeof swipeToClose !== 'undefined') params.swipeToClose = swipeToClose;
    if (typeof swipeToStep !== 'undefined') params.swipeToStep = swipeToStep;
    if (typeof swipeHandler !== 'undefined') params.swipeHandler = swipeHandler;
    if (typeof containerEl !== 'undefined') params.containerEl = containerEl;
    if (typeof breakpoints !== 'undefined') params.breakpoints = breakpoints;
    if (typeof backdropBreakpoint !== 'undefined') params.backdropBreakpoint = backdropBreakpoint;
    if (typeof pushBreakpoint !== 'undefined') params.pushBreakpoint = pushBreakpoint;

    f7ready(() => {
      if (el && innerEl) {
        const dom7 = app.f7.$;
        const fixedEls = dom7(innerEl).children('.navbar, .toolbar, .tabbar, .searchbar');
        if (fixedEls.length) {
          dom7(el).prepend(fixedEls);
        }
      }
      f7Sheet = app.f7.sheet.create(params);
      if (opened) {
        f7Sheet.open(false);
      }
    });
  });

  onDestroy(() => {
    if (f7Sheet) f7Sheet.destroy();
    f7Sheet = null;
  });
</script>

<div class={classes} bind:this={el} {style} {...restProps}>
  {@render fixedContent?.(f7Sheet)}
  <div class="sheet-modal-inner" bind:this={innerEl}>
    {@render children?.(f7Sheet)}
    {@render staticContent?.(f7Sheet)}
  </div>
</div>
