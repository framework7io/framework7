<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import {
    colorClasses,
    routerAttrs,
    routerClasses,
    actionsAttrs,
    actionsClasses,
  } from '../shared/mixins';
  import { classNames, extend, plainText, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7, f7ready } from '../shared/f7';
  import { hasSlots } from '../shared/has-slots';
  import { useTooltip } from '../shared/use-tooltip';
  import { useRouteProps } from '../shared/use-route-props';
  import { useIcon } from '../shared/use-icon';

  import UseIcon from './use-icon';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let text = undefined;
  export let iconOnly = undefined;
  export let href = undefined;
  export let link = undefined;
  export let target = undefined;
  export let dropdown = undefined;

  export let tooltip = undefined;
  export let tooltipTrigger = undefined;

  export let routeProps = undefined;

  let el;

  $: hrefComputed = typeof href === 'undefined' && link ? '#' : href;

  $: attrs = extend(
    {
      href: hrefComputed,
      target,
      ...restProps($$restProps),
    },
    routerAttrs($$props),
    actionsAttrs($$props),
  );

  // eslint-disable-next-line
  $: hasDefaultSlots = hasSlots(arguments, 'default');
  // eslint-disable-next-line
  $: hasTextSlots = hasSlots(arguments, 'text');

  $: iconOnlyComputed = iconOnly || (!text && !hasTextSlots);

  $: classes = classNames(
    {
      'menu-item': true,
      'menu-item-dropdown': dropdown || dropdown === '',
      'icon-only': iconOnlyComputed,
    },
    className,
    colorClasses($$props),
    routerClasses($$props),
    actionsClasses($$props),
  );

  $: icon = useIcon($$props);

  $: isLink = link || href || href === '';

  function onClick(e) {
    emit('click', [e]);
  }

  function onOpened(itemEl) {
    if (itemEl !== el) return;
    emit('menuOpened', [el]);
  }
  function onClosed(itemEl) {
    if (itemEl !== el) return;
    emit('menuClosed', [el]);
  }

  onMount(() => {
    f7ready(() => {
      f7.on('menuOpened', onOpened);
      f7.on('menuClosed', onClosed);
    });
  });
  onDestroy(() => {
    if (!el || !f7) return;
    f7.off('menuOpened', onOpened);
    f7.off('menuClosed', onClosed);
  });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
{#if isLink}
  <a
    on:click={onClick}
    bind:this={el}
    class={classes}
    {...attrs}
    use:useTooltip={{ tooltip, tooltipTrigger }}
    use:useRouteProps={routeProps}
  >
    {#if typeof text !== 'undefined' || hasTextSlots || icon}
      <div class="menu-item-content">
        {plainText(text)}
        {#if icon}
          <UseIcon {icon} />
        {/if}
        <slot name="text" />
      </div>
    {/if}
    <slot />
  </a>
{:else}
  <div
    on:click={onClick}
    bind:this={el}
    class={classes}
    {...attrs}
    use:useTooltip={{ tooltip, tooltipTrigger }}
    use:useRouteProps={routeProps}
  >
    {#if typeof text !== 'undefined' || hasTextSlots || icon}
      <div class="menu-item-content">
        {plainText(text)}
        {#if icon}
          <UseIcon {icon} />
        {/if}
        <slot name="text" />
      </div>
    {/if}
    <slot />
  </div>
{/if}
