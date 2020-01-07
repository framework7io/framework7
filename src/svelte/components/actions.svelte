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
  export let grid = undefined;
  export let convertToPopover = undefined;
  export let forceToPopover = undefined;
  export let target = undefined;
  export let backdrop = undefined;
  export let backdropEl = undefined;
  export let closeByBackdropClick = undefined;
  export let closeByOutsideClick = undefined;
  export let closeOnEscape = undefined;

  let el;
  let f7Actions;

  export function instance() {
    return f7Actions;
  }

  export function open(anim) {
    if (!f7Actions) return undefined;
    return f7Actions.open(anim);
  }
  export function close(anim) {
    if (!f7Actions) return undefined;
    return f7Actions.close(anim);
  }

  $: classes = Utils.classNames(
    className,
    'actions-modal',
    {
      'actions-grid': grid,
    },
    Mixins.colorClasses($$props),
  );

  function onOpen(instance) {
    dispatch('actionsOpen', [instance]);
    if (typeof $$props.onActionsOpen === 'function') $$props.onActionsOpen(instance);
  }
  function onOpened(instance) {
    dispatch('actionsOpened', [instance]);
    if (typeof $$props.onActionsOpened === 'function') $$props.onActionsOpened(instance);
  }
  function onClose(instance) {
    dispatch('actionsClose', [instance]);
    if (typeof $$props.onActionsClose === 'function') $$props.onActionsClose(instance);
  }
  function onClosed(instance) {
    dispatch('actionsClosed', [instance]);
    if (typeof $$props.onActionsClosed === 'function') $$props.onActionsClosed(instance);
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
    if (typeof closeByBackdropClick !== 'undefined') params.closeByBackdropClick = closeByBackdropClick;
    if (typeof closeByOutsideClick !== 'undefined') params.closeByOutsideClick = closeByOutsideClick;
    if (typeof closeOnEscape !== 'undefined') params.closeOnEscape = closeOnEscape;

    f7.ready(() => {
      f7Actions = f7.instance.actions.create(params);
      if (opened) {
        f7Actions.open(false);
      }
    });
  });

  onDestroy(() => {
    if (f7Actions) f7Actions.destroy();
    f7Actions = undefined;
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
