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
    dispatch('sheet:open', instance);
  }
  function onOpened(instance) {
    dispatch('sheet:opened', instance);
  }
  function onClose(instance) {
    dispatch('sheet:close', instance);
  }
  function onClosed(instance) {
    dispatch('sheet:closed', instance);
  }
  function onStepProgress(instance, progress) {
    dispatch('sheet:stepprogress', instance, progress);
  }
  function onStepOpen(instance) {
    dispatch('sheet:stepopen', instance);
  }
  function onStepClose(instance) {
    dispatch('sheet:stepclose', instance);
  }

  function watchOpened(openedPassed) {
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
        const $ = f7.instance.$;
        const $fixedEls = $(innerEl).children('.navbar, .toolbar, .tabbar, .searchbar');
        if ($fixedEls.length) {
          $(el).prepend($fixedEls);
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
