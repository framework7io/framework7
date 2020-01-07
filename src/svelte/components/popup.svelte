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

  export function instance() {
    return f7Popup;
  }

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
    dispatch('popupOpen', [instance]);
    if (typeof $$props.onPopupOpen === 'function') $$props.onPopupOpen(instance);
  }
  function onOpened(instance) {
    dispatch('popupOpened', [instance]);
    if (typeof $$props.onPopupOpened === 'function') $$props.onPopupOpened(instance);
  }
  function onClose(instance) {
    dispatch('popupClose', [instance]);
    if (typeof $$props.onPopupClose === 'function') $$props.onPopupClose(instance);
  }
  function onClosed(instance) {
    dispatch('popupClosed', [instance]);
    if (typeof $$props.onPopupClosed === 'function') $$props.onPopupClosed(instance);
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
