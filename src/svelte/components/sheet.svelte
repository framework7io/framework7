<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7, f7ready } from '../shared/f7';
  import { modalStateClasses } from '../shared/modal-state-classes';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let opened = undefined;
  export let animate = undefined;
  export let top = undefined;
  export let bottom = undefined;
  export let position = undefined;
  export let backdrop = undefined;
  export let backdropEl = undefined;
  export let closeByBackdropClick = undefined;
  export let closeByOutsideClick = undefined;
  export let closeOnEscape = undefined;
  export let push = undefined;
  export let swipeToClose = undefined;
  export let swipeToStep = undefined;
  export let swipeHandler = undefined;
  export let containerEl = undefined;

  let el;
  let innerEl;
  let f7Sheet;

  const state = {
    isOpened: opened,
    isClosing: false,
  };

  export function instance() {
    return f7Sheet;
  }

  $: positionComputed = (() => {
    if (position) return position;
    if (top) return 'top';
    if (bottom) return 'bottom';
    return 'bottom';
  })();

  $: classes = classNames(
    className,
    'sheet-modal',
    `sheet-modal-${positionComputed}`,
    {
      'sheet-modal-push': push,
    },
    modalStateClasses(state),
    colorClasses($$props),
  );

  function onOpen(instance) {
    Object.assign(state, {
      isOpened: true,
      isClosing: false,
    });
    emit('sheetOpen', [instance]);
    opened = true;
  }
  function onOpened(instance) {
    emit('sheetOpened', [instance]);
  }
  function onClose(instance) {
    Object.assign(state, {
      isOpened: false,
      isClosing: true,
    });
    emit('sheetClose', [instance]);
  }
  function onClosed(instance) {
    Object.assign(state, {
      isClosing: false,
    });
    emit('sheetClosed', [instance]);
    opened = false;
  }
  function onStepProgress(instance, progress) {
    emit('sheetStepProgress', [instance, progress]);
  }
  function onStepOpen(instance) {
    emit('sheetStepOpen', [instance]);
  }
  function onStepClose(instance) {
    emit('sheetStepClose', [instance]);
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

  $: watchOpened(opened);

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

    f7ready(() => {
      if (el && innerEl) {
        const dom7 = f7.$;
        const fixedEls = dom7(innerEl).children('.navbar, .toolbar, .tabbar, .searchbar');
        if (fixedEls.length) {
          dom7(el).prepend(fixedEls);
        }
      }
      f7Sheet = f7.sheet.create(params);
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

<div class={classes} bind:this={el} {...restProps($$restProps)}>
  <slot name="fixed" />
  <div class="sheet-modal-inner" bind:this={innerEl}>
    <slot />
    <slot name="static" />
  </div>
</div>
