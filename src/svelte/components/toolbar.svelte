<script>
  import { createEventDispatcher, onMount, onDestroy, afterUpdate } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7, f7ready } from '../shared/f7';
  import { useTheme } from '../shared/use-theme';
  import { setReactiveContext } from '../shared/set-reactive-context';

  const emit = createEmitter(createEventDispatcher, $$props);

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
  let theme = useTheme((t) => {
    theme = t;
  });

  setReactiveContext('TabbarContext', () => ({
    tabbarHasLabels: labels,
  }));

  $: classes = classNames(
    className,
    'toolbar',
    {
      tabbar,
      'toolbar-bottom':
        (theme && theme.md && bottomMd) ||
        (theme && theme.ios && bottomIos) ||
        (theme && theme.aurora && bottomAurora) ||
        bottom ||
        position === 'bottom',
      'toolbar-top':
        (theme && theme.md && topMd) ||
        (theme && theme.ios && topIos) ||
        (theme && theme.aurora && topAurora) ||
        top ||
        position === 'top',
      'tabbar-labels': labels,
      'tabbar-scrollable': scrollable,
      'toolbar-hidden': hidden,
      'no-shadow': noShadow,
      'no-hairline': noHairline || noBorder,
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
      if (tabbar) f7.toolbar.setHighlight(el);
      f7.on('toolbarShow', onShow);
      f7.on('toolbarHide', onHide);
    });
  });

  afterUpdate(() => {
    if (tabbar && f7 && el) {
      f7.toolbar.setHighlight(el);
    }
  });

  onDestroy(() => {
    if (!f7) return;
    f7.off('toolbarShow', onShow);
    f7.off('toolbarHide', onHide);
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
