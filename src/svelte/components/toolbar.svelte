<script>
  import { createEventDispatcher, onMount, onDestroy, afterUpdate } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import { theme } from '../utils/plugin';
  import f7 from '../utils/f7';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let tabbar = false;
  export let labels = false;
  export let scrollable = false;
  export let hidden = false;
  export let noShadow = false;
  export let noHairline = false;
  export let noBorder = false;
  export let position = undefined;
  export let topMd = undefined;
  export let topIos = undefined;
  export let topAurora = undefined;
  export let top = undefined;
  export let bottomMd = undefined;
  export let bottomIos = undefined;
  export let bottomAurora = undefined;
  export let bottom = undefined;
  export let inner = true;

  export let f7Slot = 'fixed';

  let el;
  // eslint-disable-next-line
  let _theme = f7.instance ? theme : null;

  if (!f7.instance) {
    f7.ready(() => {
      _theme = theme;
    });
  }

  $: classes = Utils.classNames(
    className,
    'toolbar',
    {
      tabbar,
      'toolbar-bottom': (_theme && _theme.md && bottomMd) || (_theme && _theme.ios && bottomIos) || (_theme && _theme.aurora && bottomAurora) || bottom || position === 'bottom',
      'toolbar-top': (_theme && _theme.md && topMd) || (_theme && _theme.ios && topIos) || (_theme && _theme.aurora && topAurora) || top || position === 'top',
      'tabbar-labels': labels,
      'tabbar-scrollable': scrollable,
      'toolbar-hidden': hidden,
      'no-shadow': noShadow,
      'no-hairline': noHairline || noBorder,
    },
    Mixins.colorClasses($$props),
  );

  function onShow(toolbarEl) {
    if (el !== toolbarEl) return;
    dispatch('toolbarShow');
    if (typeof $$props.onToolbarShow === 'function') $$props.onToolbarShow();
  }
  function onHide(toolbarEl) {
    if (el !== toolbarEl) return;
    dispatch('toolbarHide');
    if (typeof $$props.onToolbarHide === 'function') $$props.onToolbarHide();
  }

  onMount(() => {
    f7.ready(() => {
      if (tabbar) f7.instance.toolbar.setHighlight(el);
      f7.instance.on('toolbarShow', onShow);
      f7.instance.on('toolbarHide', onHide);
    });
  });

  afterUpdate(() => {
    if (tabbar && f7.instance && el) {
      f7.instance.toolbar.setHighlight(el);
    }
  });

  onDestroy(() => {
    if (!f7.instance) return;
    f7.instance.off('toolbarShow', onShow);
    f7.instance.off('toolbarHide', onHide);
  });
</script>

<div id={id} style={style} bind:this={el} class={classes} data-f7-slot={f7Slot}>
  <slot name="before-inner" />
  {#if inner}
    <div class="toolbar-inner">
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
  <slot name="after-inner" />
</div>
