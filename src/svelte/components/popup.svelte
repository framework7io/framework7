<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';
  import { modalStateClasses } from '../shared/modal-state-classes.js';

  let {
    class: className,
    style = '',
    tabletFullscreen = undefined,
    opened = undefined,
    animate = undefined,
    backdrop = undefined,
    backdropEl = undefined,
    closeByBackdropClick = undefined,
    closeOnEscape = undefined,
    swipeToClose = false,
    swipeHandler = undefined,
    push = undefined,
    containerEl = undefined,
    children,
    ...restProps
  } = $props();

  let el = $state(null);
  let f7Popup;

  let isOpened = $state(opened);
  let isClosing = $state(false);

  export function instance() {
    return f7Popup;
  }

  const classes = $derived(
    classNames(
      className,
      'popup',
      {
        'popup-tablet-fullscreen': tabletFullscreen,
        'popup-push': push,
      },
      modalStateClasses({ isOpened, isClosing }),
      colorClasses(restProps),
    ),
  );

  function onSwipeStart(instance) {
    restProps.onPopupSwipeStart?.(instance);
    restProps.onpopupswipestart?.(instance);
  }
  function onSwipeMove(instance) {
    restProps.onPopupSwipeMove?.(instance);
    restProps.onpopupswipemove?.(instance);
  }
  function onSwipeEnd(instance) {
    restProps.onPopupSwipeEnd?.(instance);
    restProps.onpopupswipeend?.(instance);
  }
  function onSwipeClose(instance) {
    restProps.onPopupSwipeClose?.(instance);
    restProps.onpopupswipeclose?.(instance);
  }

  function onOpen(instance) {
    isOpened = true;
    isClosing = false;
    restProps.onPopupOpen?.(instance);
    restProps.onpopupopen?.(instance);
    opened = true;
  }
  function onOpened(instance) {
    restProps.onPopupOpened?.(instance);
    restProps.onpopupopened?.(instance);
  }
  function onClose(instance) {
    isOpened = false;
    isClosing = true;
    restProps.onPopupClose?.(instance);
    restProps.onpopupclose?.(instance);
  }
  function onClosed(instance) {
    isClosing = false;
    restProps.onPopupClosed?.(instance);
    restProps.onpopupclosed?.(instance);
    opened = false;
  }

  let initialWatched = $state(false);
  function watchOpened(openedPassed) {
    if (!initialWatched) {
      initialWatched = true;
      return;
    }
    if (!f7Popup) return;
    if (openedPassed) f7Popup.open();
    else f7Popup.close();
  }

  $effect(() => watchOpened(opened));

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

<div class={classes} bind:this={el} {style} {...restProps}>
  {@render children?.(f7Popup)}
</div>
