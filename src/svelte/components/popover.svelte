<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app, f7ready } from '../shared/f7.js';
  import { modalStateClasses } from '../shared/modal-state-classes.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let style = '';
  export let opened = undefined;
  export let animate = undefined;
  export let targetEl = undefined;
  export let arrow = undefined;
  export let backdrop = undefined;
  export let backdropEl = undefined;
  export let closeByBackdropClick = undefined;
  export let closeByOutsideClick = undefined;
  export let closeOnEscape = undefined;
  export let containerEl = undefined;
  export let verticalPosition = undefined;

  let el;
  let f7Popover;

  const state = {
    isOpened: opened,
    isClosing: false,
  };

  export function instance() {
    return f7Popover;
  }

  $: classes = classNames(className, 'popover', modalStateClasses(state), colorClasses($$props));

  function onOpen(instance) {
    Object.assign(state, {
      isOpened: true,
      isClosing: false,
    });
    emit('popoverOpen', [instance]);
    opened = true;
  }
  function onOpened(instance) {
    emit('popoverOpened', [instance]);
  }
  function onClose(instance) {
    Object.assign(state, {
      isOpened: false,
      isClosing: true,
    });
    emit('popoverClose', [instance]);
  }
  function onClosed(instance) {
    Object.assign(state, {
      isClosing: false,
    });
    emit('popoverClosed', [instance]);
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
    if (targetEl) params.targetEl = targetEl;

    if (typeof animate !== 'undefined') params.animate = animate;
    if (typeof closeByBackdropClick !== 'undefined')
      params.closeByBackdropClick = closeByBackdropClick;
    if (typeof closeByOutsideClick !== 'undefined')
      params.closeByOutsideClick = closeByOutsideClick;
    if (typeof closeOnEscape !== 'undefined') params.closeOnEscape = closeOnEscape;
    if (typeof arrow !== 'undefined') params.arrow = arrow;
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

<div class={classes} bind:this={el} {style} {...restProps($$restProps)}>
  {#if arrow !== false}
    <div class="popover-arrow" />
  {/if}
  <div class="popover-inner">
    <slot popover={f7Popover} />
  </div>
</div>
