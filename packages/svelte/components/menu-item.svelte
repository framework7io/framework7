<script>
  import { createEventDispatcher, onMount, afterUpdate, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';
  import hasSlots from '../utils/has-slots';

  import Icon from './icon.svelte';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

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

  $: attrs = Utils.extend(
    {
      href: hrefComputed,
      target,
    },
    Mixins.linkRouterAttrs($$props),
    Mixins.linkActionsAttrs($$props),
  );

  // eslint-disable-next-line
  $: hasDefaultSlots = hasSlots(arguments, 'default');
  // eslint-disable-next-line
  $: hasTextSlots = hasSlots(arguments, 'text');

  $: iconOnlyComputed = iconOnly || (!text && !hasTextSlots);

  $: classes = Utils.classNames(
    {
      'menu-item': true,
      'menu-item-dropdown': dropdown || dropdown === '',
      'icon-only': iconOnlyComputed,
    },
    className,
    Mixins.colorClasses($$props),
    Mixins.linkRouterClasses($$props),
    Mixins.linkActionsClasses($$props),
  );

  $: hasIcon = $$props.icon || $$props.iconMaterial || $$props.iconF7 || $$props.iconMd || $$props.iconIos || $$props.iconAurora;

  $: isLink = (link || href || href === '');

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
    f7.ready(() => {
      f7.instance.on('menuOpened', onOpened);
      f7.instance.on('menuClosed', onClosed);
    });
  });
  afterUpdate(() => {
    if ($$props.routeProps) {
      el.f7RouteProps = $$props.routeProps;
    }
  });
  onDestroy(() => {
    if (!el || !f7.instance) return;
    delete el.f7RouteProps;
    f7.instance.off('menuOpened', onOpened);
    f7.instance.off('menuClosed', onClosed);
  });

</script>
<!-- svelte-ignore a11y-missing-attribute -->
{#if isLink}
  <a on:click={onClick} bind:this={el} class={classes} id={id} style={style} {...attrs}>
    {#if typeof text !== 'undefined' || hasTextSlots || hasIcon}
      <div class="menu-item-content">
        {Utils.text(text)}
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
  <div on:click={onClick} bind:this={el} class={classes} id={id} style={style} {...attrs}>
    {#if typeof text !== 'undefined' || hasTextSlots || hasIcon}
      <div class="menu-item-content">
        {Utils.text(text)}
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
