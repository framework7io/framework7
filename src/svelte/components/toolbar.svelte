<script>
  import { createEventDispatcher, onMount, onDestroy, afterUpdate } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app, f7ready } from '../shared/f7.js';
  import { useTheme } from '../shared/use-theme.js';
  import { setReactiveContext } from '../shared/set-reactive-context.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let tabbar = false;
  export let icons = false;
  export let scrollable = false;
  export let hidden = false;
  export let outline = true;
  export let position = undefined;
  export let topMd = undefined;
  export let topIos = undefined;
  export let top = undefined;
  export let bottomMd = undefined;
  export let bottomIos = undefined;
  export let bottom = undefined;
  export let inner = true;

  export let f7Slot = 'fixed';

  let el;
  let theme = useTheme((t) => {
    theme = t;
  });

  setReactiveContext('TabbarContext', () => ({
    tabbarHasIcons: icons,
  }));

  $: classes = classNames(
    className,
    'toolbar',
    {
      tabbar,
      'toolbar-bottom':
        (theme && theme.md && bottomMd) ||
        (theme && theme.ios && bottomIos) ||
        bottom ||
        position === 'bottom',
      'toolbar-top':
        (theme && theme.md && topMd) || (theme && theme.ios && topIos) || top || position === 'top',
      'tabbar-icons': icons,
      'tabbar-scrollable': scrollable,
      'toolbar-hidden': hidden,
      'no-outline': !outline,
    },
    colorClasses($$props),
  );

  function onShow(toolbarEl) {
    if (el !== toolbarEl) return;
    emit('toolbarShow');
  }
  function onHide(toolbarEl) {
    if (el !== toolbarEl) return;
    emit('toolbarHide');
  }

  onMount(() => {
    f7ready(() => {
      if (tabbar) app.f7.toolbar.setHighlight(el);
      app.f7.on('toolbarShow', onShow);
      app.f7.on('toolbarHide', onHide);
    });
  });

  afterUpdate(() => {
    if (tabbar && app.f7 && el) {
      app.f7.toolbar.setHighlight(el);
    }
  });

  onDestroy(() => {
    if (!app.f7) return;
    app.f7.off('toolbarShow', onShow);
    app.f7.off('toolbarHide', onHide);
  });
</script>

<div bind:this={el} class={classes} data-f7-slot={f7Slot} {...restProps($$restProps)}>
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
