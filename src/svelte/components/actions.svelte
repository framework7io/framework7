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
  export let grid = undefined;
  export let convertToPopover = undefined;
  export let forceToPopover = undefined;
  export let target = undefined;
  export let backdrop = undefined;
  export let backdropEl = undefined;
  export let closeByBackdropClick = undefined;
  export let closeByOutsideClick = undefined;
  export let closeOnEscape = undefined;
  export let containerEl = undefined;

  let el;
  let f7Actions;

  const state = {
    isOpened: opened,
    isClosing: false,
  };

  export function instance() {
    return f7Actions;
  }

  $: classes = classNames(
    className,
    'actions-modal',
    {
      'actions-grid': grid,
    },
    modalStateClasses(state),
    colorClasses($$props),
  );

  function onOpen(instance) {
    Object.assign(state, {
      isOpened: true,
      isClosing: false,
    });
    emit('actionsOpen', [instance]);
    opened = true;
  }
  function onOpened(instance) {
    emit('actionsOpened', [instance]);
  }
  function onClose(instance) {
    Object.assign(state, {
      isOpened: false,
      isClosing: true,
    });
    emit('actionsClose', [instance]);
  }
  function onClosed(instance) {
    Object.assign(state, {
      isClosing: false,
    });
    emit('actionsClosed', [instance]);
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

<div class={classes} bind:this={el} {style} {...restProps($$restProps)}>
  <slot actions={f7Actions} />
</div>
