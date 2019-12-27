<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

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

  let el;
  let f7Popup;

  export function open(anim) {
    if (!f7Popup) return undefined;
    return f7Popup.open(anim);
  }
  export function close(anim) {
    if (!f7Popup) return undefined;
    return f7Popup.close(anim);
  }

  $: classes = Utils.classNames(
    className,
    'popup',
    {
      'popup-tablet-fullscreen': tabletFullscreen,
      'popup-push': push,
    },
    Mixins.colorClasses($$props),
  );

  function onOpen(instance) {
    dispatch('popup:open', [instance]);
  }
  function onOpened(instance) {
    dispatch('popup:opened', [instance]);
  }
  function onClose(instance) {
    dispatch('popup:close', [instance]);
  }
  function onClosed(instance) {
    dispatch('popup:closed', [instance]);
  }

  function watchOpened(openedPassed) {
    if (!f7Popup) return;
    if (openedPassed) f7Popup.open();
    else f7Popup.close();
  }

  $: watchOpened(opened);

  onMount(() => {
    const popupParams = {
      el,
      on: {
        open: onOpen,
        opened: onOpened,
        close: onClose,
        closed: onClosed,
      },
    };
    if (typeof closeByBackdropClick !== 'undefined') popupParams.closeByBackdropClick = closeByBackdropClick;
    if (typeof closeOnEscape !== 'undefined') popupParams.closeOnEscape = closeOnEscape;
    if (typeof animate !== 'undefined') popupParams.animate = animate;
    if (typeof backdrop !== 'undefined') popupParams.backdrop = backdrop;
    if (typeof backdropEl !== 'undefined') popupParams.backdropEl = backdropEl;
    if (typeof swipeToClose !== 'undefined') popupParams.swipeToClose = swipeToClose;
    if (typeof swipeHandler !== 'undefined') popupParams.swipeHandler = swipeHandler;

    f7.ready(() => {
      f7Popup = f7.instance.popup.create(popupParams);
      if (opened) {
        f7Popup.open(false);
      }
    });
  });
  onDestroy(() => {
    if (f7Popup) f7Popup.destroy();
    f7Popup = undefined;
  });
</script>
<div
  id={id}
  style={style}
  class={classes}
  bind:this={el}
>
  <slot />
</div>
