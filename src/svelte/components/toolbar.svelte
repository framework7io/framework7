<script>
  import { setContext, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';
  import { useTheme } from '../shared/use-theme.js';

  let {
    class: className,
    tabbar = false,
    icons = false,
    scrollable = false,
    hidden = false,
    outline = true,
    position = undefined,
    topMd = undefined,
    topIos = undefined,
    top = undefined,
    bottomMd = undefined,
    bottomIos = undefined,
    bottom = undefined,
    inner = true,
    f7Slot = 'fixed',
    beforeInner,
    children,
    afterInner,
    ...restProps
  } = $props();

  let el = $state(undefined);
  let theme = useTheme((t) => {
    theme = t;
  });

  setContext('TabbarContext', () => ({
    value: {
      tabbarHasIcons: icons,
    },
  }));

  const classes = $derived(
    classNames(
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
          (theme && theme.md && topMd) ||
          (theme && theme.ios && topIos) ||
          top ||
          position === 'top',
        'tabbar-icons': icons,
        'tabbar-scrollable': scrollable,
        'toolbar-hidden': hidden,
        'no-outline': !outline,
      },
      colorClasses(restProps),
    ),
  );

  function onShow(toolbarEl) {
    if (el !== toolbarEl) return;
    restProps.onToolbarShow?.();
    restProps.ontoolbarshow?.();
  }
  function onHide(toolbarEl) {
    if (el !== toolbarEl) return;
    restProps.onToolbarHide?.();
    restProps.ontoolbarhide?.();
  }

  onMount(() => {
    f7ready(() => {
      if (tabbar) app.f7.toolbar.setHighlight(el);
      app.f7.on('toolbarShow', onShow);
      app.f7.on('toolbarHide', onHide);
    });
  });

  $effect(() => {
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

<div bind:this={el} class={classes} data-f7-slot={f7Slot} {...restProps}>
  {@render beforeInner?.()}
  {#if inner}
    <div class="toolbar-inner">
      {@render children?.()}
    </div>
  {:else}
    {@render children?.()}
  {/if}
  {@render afterInner?.()}
</div>
