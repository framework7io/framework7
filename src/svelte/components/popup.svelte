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
  export let tabletFullscreen = undefined;
  export let opened = undefined;
  export let animate = undefined;
  export let backdrop = undefined;
  export let backdropEl = undefined;
  export let closeByBackdropClick = undefined;
  export let closeOnEscape = undefined;
  export let swipeToClose = false;
  export let swipeHandler = undefined;
  export let push = undefined;
  export let containerEl = undefined;

  let el;
  let f7Popup;

  const state = {
    isOpened: opened,
    isClosing: false,
  };

  export function instance() {
    return f7Popup;
  }

  $: classes = classNames(
    className,
    'popup',
    {
      'popup-tablet-fullscreen': tabletFullscreen,
      'popup-push': push,
    },
    modalStateClasses(state),
    colorClasses($$props),
  );

  function onSwipeStart(instance) {
    emit('popupSwipeStart', [instance]);
  }
  function onSwipeMove(instance) {
    emit('popupSwipeMove', [instance]);
  }
  function onSwipeEnd(instance) {
    emit('popupSwipeEnd', [instance]);
  }
  function onSwipeClose(instance) {
    emit('popupSwipeClose', [instance]);
  }

  function onOpen(instance) {
    Object.assign(state, {
      isOpened: true,
      isClosing: false,
    });
    emit('popupOpen', [instance]);
    opened = true;
  }
  function onOpened(instance) {
    emit('popupOpened', [instance]);
  }
  function onClose(instance) {
    Object.assign(state, {
      isOpened: false,
      isClosing: true,
    });
    emit('popupClose', [instance]);
  }
  function onClosed(instance) {
    Object.assign(state, {
      isClosing: false,
    });
    emit('popupClosed', [instance]);
    opened = false;
  }

  let initialWatched = false;
  function watchOpened(openedPassed) {
    if (!initialWatched) {
      initialWatched = true;
      return;
    }
    if (!f7Popup) return;
    if (openedPassed) f7Popup.open();
    else f7Popup.close();
  }

  $: watchOpened(opened);

  onMount(() => {
    const popupParams = {
      el,
      on: {
        swipeStart: onSwipeStart,
        swipeMove: onSwipeMove,
        swipeEnd: onSwipeEnd,
        swipeClose: onSwipeClose,
        open: onOpen,
        opened: onOpened,
        close: onClose,
        closed: onClosed,
      },
    };
    if (typeof closeByBackdropClick !== 'undefined')
      popupParams.closeByBackdropClick = closeByBackdropClick;
    if (typeof closeOnEscape !== 'undefined') popupParams.closeOnEscape = closeOnEscape;
    if (typeof animate !== 'undefined') popupParams.animate = animate;
    if (typeof backdrop !== 'undefined') popupParams.backdrop = backdrop;
    if (typeof backdropEl !== 'undefined') popupParams.backdropEl = backdropEl;
    if (typeof swipeToClose !== 'undefined') popupParams.swipeToClose = swipeToClose;
    if (typeof swipeHandler !== 'undefined') popupParams.swipeHandler = swipeHandler;
    if (typeof containerEl !== 'undefined') popupParams.containerEl = containerEl;

    f7ready(() => {
      f7Popup = app.f7.popup.create(popupParams);
      if (opened) {
        f7Popup.open(false, true);
      }
    });
  });
  onDestroy(() => {
    if (f7Popup) f7Popup.destroy();
    f7Popup = null;
  });
</script>

<div class={classes} bind:this={el} {style} {...restProps($$restProps)}>
  <slot popup={f7Popup} />
</div>
