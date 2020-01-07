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

  export let opened = undefined;
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

  let el;
  let innerEl;
  let f7Sheet;

  export function instance() {
    return f7Sheet;
  }

  export function open(anim) {
    if (!f7Sheet) return undefined;
    return f7Sheet.open(anim);
  }
  export function close(anim) {
    if (!f7Sheet) return undefined;
    return f7Sheet.close(anim);
  }

  $: positionComputed = (() => {
    if (position) return position;
    if (top) return 'top';
    if (bottom) return 'bottom';
    return 'botton';
  })();

  $: classes = Utils.classNames(
    className,
    'sheet-modal',
    `sheet-modal-${positionComputed}`,
    {
      'sheet-modal-push': push,
    },
    Mixins.colorClasses($$props),
  );

  function onOpen(instance) {
    dispatch('sheetOpen', [instance]);
    if (typeof $$props.onSheetOpen === 'function') $$props.onSheetOpen(instance);
  }
  function onOpened(instance) {
    dispatch('sheetOpened', [instance]);
    if (typeof $$props.onSheetOpened === 'function') $$props.onSheetOpened(instance);
  }
  function onClose(instance) {
    dispatch('sheetClose', [instance]);
    if (typeof $$props.onSheetClose === 'function') $$props.onSheetClose(instance);
  }
  function onClosed(instance) {
    dispatch('sheetClosed', [instance]);
    if (typeof $$props.onSheetClosed === 'function') $$props.onSheetClosed(instance);
  }
  function onStepProgress(instance, progress) {
    dispatch('sheetStepProgress', [instance, progress]);
    if (typeof $$props.onSheetStepProgress === 'function') $$props.onSheetStepProgress(instance, progress);
  }
  function onStepOpen(instance) {
    dispatch('sheetStepOpen', [instance]);
    if (typeof $$props.onSheetStepOpen === 'function') $$props.onSheetStepOpen(instance);
  }
  function onStepClose(instance) {
    dispatch('sheetStepClose', [instance]);
    if (typeof $$props.onSheetStepClose === 'function') $$props.onSheetStepClose(instance);
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
    if (typeof backdropEl !== 'undefined') params.backdropEl = backdropEl;
    if (typeof closeByBackdropClick !== 'undefined') params.closeByBackdropClick = closeByBackdropClick;
    if (typeof closeByOutsideClick !== 'undefined') params.closeByOutsideClick = closeByOutsideClick;
    if (typeof closeOnEscape !== 'undefined') params.closeOnEscape = closeOnEscape;
    if (typeof swipeToClose !== 'undefined') params.swipeToClose = swipeToClose;
    if (typeof swipeToStep !== 'undefined') params.swipeToStep = swipeToStep;
    if (typeof swipeHandler !== 'undefined') params.swipeHandler = swipeHandler;

    f7.ready(() => {
      if (el && innerEl) {
        const dom7 = f7.instance.$;
        const fixedEls = dom7(innerEl).children('.navbar, .toolbar, .tabbar, .searchbar');
        if (fixedEls.length) {
          dom7(el).prepend(fixedEls);
        }
      }
      f7Sheet = f7.instance.sheet.create(params);
      if (opened) {
        f7Sheet.open(false);
      }
    });
  });

  onDestroy(() => {
    if (f7Sheet) f7Sheet.destroy();
    f7Sheet = undefined;
  });
</script>
<div
  id={id}
  style={style}
  class={classes}
  bind:this={el}
>
  <slot name="fixed" />
  <div class="sheet-modal-inner" bind:this={innerEl}>
    <slot />
  </div>
</div>
