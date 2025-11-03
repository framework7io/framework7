<script>
  import {
    colorClasses,
    routerAttrs,
    routerClasses,
    actionsAttrs,
    actionsClasses,
  } from '../shared/mixins.js';
  import { classNames, extend, isStringProp, plainText } from '../shared/utils.js';
  import { useTooltip } from '../shared/use-tooltip.js';
  import { useRouteProps } from '../shared/use-route-props.js';
  import { useIcon } from '../shared/use-icon.js';

  import UseIcon from './use-icon.svelte';
  import Preloader from './preloader.svelte';

  let {
    class: className,
    text = undefined,
    tabLink = undefined,
    tabLinkActive = false,
    type = undefined,
    href = '#',
    target = undefined,
    round = false,
    roundMd = false,
    roundIos = false,
    fill = false,
    fillMd = false,
    fillIos = false,
    tonal = false,
    tonalMd = false,
    tonalIos = false,
    large = false,
    largeMd = false,
    largeIos = false,
    small = false,
    smallMd = false,
    smallIos = false,
    raised = false,
    raisedMd = false,
    raisedIos = false,
    outline = false,
    outlineMd = false,
    outlineIos = false,
    active = false,
    disabled = false,
    tooltip = undefined,
    tooltipTrigger = undefined,
    routeProps = undefined,
    preloader = false,
    preloaderSize = undefined,
    preloaderColor = undefined,
    loading = false,
    children,
    ...restProps
  } = $props();

  let el = $state(null);

  const hrefComputed = $derived(href === true ? '#' : href || undefined);

  const attrs = $derived(
    extend(
      {
        href: hrefComputed,
        target,
        type,
        'data-tab': (isStringProp(tabLink) && tabLink) || undefined,
        ...restProps,
      },
      routerAttrs(restProps),
      actionsAttrs(restProps),
    ),
  );

  const classes = $derived(
    classNames(
      className,
      'button',
      {
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,

        'button-round': round,
        'button-round-ios': roundIos,
        'button-round-md': roundMd,
        'button-fill': fill,
        'button-fill-ios': fillIos,
        'button-fill-md': fillMd,
        'button-tonal': tonal,
        'button-tonal-ios': tonalIos,
        'button-tonal-md': tonalMd,
        'button-large': large,
        'button-large-ios': largeIos,
        'button-large-md': largeMd,
        'button-small': small,
        'button-small-ios': smallIos,
        'button-small-md': smallMd,
        'button-raised': raised,
        'button-raised-ios': raisedIos,
        'button-raised-md': raisedMd,
        'button-active': active,
        'button-outline': outline,
        'button-outline-ios': outlineIos,
        'button-outline-md': outlineMd,
        'button-preloader': preloader,
        'button-loading': loading,

        disabled,
      },
      colorClasses(restProps),
      routerClasses(restProps),
      actionsClasses(restProps),
    ),
  );

  const tagName = $derived(
    type === 'submit' || type === 'reset' || type === 'button' ? 'button' : 'a',
  );

  const icon = $derived(useIcon(restProps));
  function onClick(e) {
    restProps.onClick?.(e);
    restProps.onclick?.(e);
  }
</script>

<!-- svelte-ignore a11y_missing_attribute -->
{#if tagName === 'button'}
  <button
    bind:this={el}
    use:useRouteProps={routeProps}
    class={classes}
    use:useTooltip={{ tooltip, tooltipTrigger }}
    {...attrs}
    onclick={onClick}
  >
    {#if preloader}
      <Preloader size={preloaderSize} color={preloaderColor} />
      <span>
        {#if icon}
          <UseIcon {icon} />
        {/if}
        {#if typeof text !== 'undefined'}
          <span>{plainText(text)}</span>
        {/if}
        {@render children?.()}
      </span>
    {:else}
      {#if icon}
        <UseIcon {icon} />
      {/if}
      {#if typeof text !== 'undefined'}
        <span>{plainText(text)}</span>
      {/if}
      {@render children?.()}
    {/if}
  </button>
{:else}
  <a
    bind:this={el}
    use:useRouteProps={routeProps}
    class={classes}
    use:useTooltip={{ tooltip, tooltipTrigger }}
    {...attrs}
    onclick={onClick}
  >
    {#if preloader}
      <Preloader size={preloaderSize} color={preloaderColor} />
      <span>
        {#if icon}
          <UseIcon {icon} />
        {/if}
        {#if typeof text !== 'undefined'}
          <span>{plainText(text)}</span>
        {/if}
        {@render children?.()}
      </span>
    {:else}
      {#if icon}
        <UseIcon {icon} />
      {/if}
      {#if typeof text !== 'undefined'}
        <span>{plainText(text)}</span>
      {/if}
      {@render children?.()}
    {/if}
  </a>
{/if}
