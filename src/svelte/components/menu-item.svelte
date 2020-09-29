<script>
  import { createEventDispatcher, onMount, afterUpdate, onDestroy } from 'svelte';
  import {
    colorClasses,
    routerAttrs,
    routerClasses,
    actionsAttrs,
    actionsClasses,
  } from '../shared/mixins';
  import { classNames, extend, plainText } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7, f7ready } from '../shared/f7';
  import { hasSlots } from '../shared/has-slots';

  import Icon from './icon';

  const dispatch = createEventDispatcher();

  let className = undefined;
  export { className as class };

  export let text = undefined;
  export let iconOnly = undefined;
  export let href = undefined;
  export let link = undefined;
  export let target = undefined;
  export let dropdown = undefined;

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

  $: hasIcon =
    $$props.icon ||
    $$props.iconMaterial ||
    $$props.iconF7 ||
    $$props.iconMd ||
    $$props.iconIos ||
    $$props.iconAurora;

  $: isLink = link || href || href === '';

  function onClick(e) {
    dispatch('click', [e]);
    if (typeof $$props.onClick === 'function') $$props.onClick(e);
  }

  function onOpened(itemEl) {
    if (itemEl !== el) return;
    dispatch('menuOpened', [el]);
    if (typeof $$props.onMenuOpened === 'function') $$props.onMenuOpened(el);
  }
  function onClosed(itemEl) {
    if (itemEl !== el) return;
    dispatch('menuClosed', [el]);
    if (typeof $$props.onMenuClosed === 'function') $$props.onMenuClosed(el);
  }

  onMount(() => {
    if ($$props.routeProps) {
      el.f7RouteProps = $$props.routeProps;
    }
    f7ready(() => {
      f7.on('menuOpened', onOpened);
      f7.on('menuClosed', onClosed);
    });
  });
  afterUpdate(() => {
    if ($$props.routeProps) {
      el.f7RouteProps = $$props.routeProps;
    }
  });
  onDestroy(() => {
    if (!el || !f7) return;
    delete el.f7RouteProps;
    f7.off('menuOpened', onOpened);
    f7.off('menuClosed', onClosed);
  });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
{#if isLink}
  <a on:click={onClick} bind:this={el} class={classes} {...attrs}>
    {#if typeof text !== 'undefined' || hasTextSlots || hasIcon}
      <div class="menu-item-content">
        {plainText(text)}
        {#if hasIcon}
        <Icon
          material={$$props.iconMaterial}
          f7={$$props.iconF7}
          icon={$$props.icon}
          md={$$props.iconMd}
          ios={$$props.iconIos}
          aurora={$$props.iconAurora}
          color={$$props.iconColor}
          size={$$props.iconSize}
        />
        {/if}
        <slot name="text" />
      </div>
    {/if}
    <slot />
  </a>
{:else}
  <div on:click={onClick} bind:this={el} class={classes} {...attrs}>
    {#if typeof text !== 'undefined' || hasTextSlots || hasIcon}
      <div class="menu-item-content">
        {plainText(text)}
        {#if hasIcon}
        <Icon
          material={$$props.iconMaterial}
          f7={$$props.iconF7}
          icon={$$props.icon}
          md={$$props.iconMd}
          ios={$$props.iconIos}
          aurora={$$props.iconAurora}
          color={$$props.iconColor}
          size={$$props.iconSize}
        />
        {/if}
        <slot name="text" />
      </div>
    {/if}
    <slot />
  </div>
{/if}
