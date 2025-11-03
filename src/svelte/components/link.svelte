<script>
  import { getContext } from 'svelte';
  import {
    colorClasses,
    routerAttrs,
    routerClasses,
    actionsAttrs,
    actionsClasses,
  } from '../shared/mixins.js';
  import { classNames, extend, isStringProp } from '../shared/utils.js';
  import { useTooltip } from '../shared/use-tooltip.js';
  import { useSmartSelect } from '../shared/use-smart-select.js';
  import { useRouteProps } from '../shared/use-route-props.js';
  import { useIcon } from '../shared/use-icon.js';

  import UseIcon from './use-icon.svelte';
  import Badge from './badge.svelte';

  let {
    class: className,
    noLinkClass = false,
    text = undefined,
    tabLink = undefined,
    tabLinkActive = false,
    tabbarLabel = false,
    iconOnly = false,
    badge = undefined,
    badgeColor = undefined,
    href = '#',
    target = undefined,
    tooltip = undefined,
    tooltipTrigger = undefined,
    routeProps = undefined,
    smartSelect = false,
    smartSelectParams = undefined,
    children,
    ...restProps
  } = $props();

  let el = $state(undefined);
  let f7SmartSelect;

  export function smartSelectInstance() {
    return f7SmartSelect;
  }

  const TabbarContext = getContext('TabbarContext') || (() => ({ value: {} }));

  const isTabbarIcons = $derived(tabbarLabel || TabbarContext().value.tabbarHasIcons);

  const hrefComputed = $derived(href === true ? '#' : href || undefined);

  const attrs = $derived(
    extend(
      {
        href: hrefComputed,
        target,
        'data-tab': (isStringProp(tabLink) && tabLink) || undefined,
        ...restProps,
      },
      routerAttrs(restProps),
      actionsAttrs(restProps),
    ),
  );

  // eslint-disable-next-line
  const hasDefaultSlots = $derived(children);

  const iconOnlyComputed = $derived(iconOnly || (!text && !hasDefaultSlots));

  const classes = $derived(
    classNames(
      className,
      {
        link: !(noLinkClass || isTabbarIcons),
        'icon-only': iconOnlyComputed,
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'smart-select': smartSelect,
      },
      colorClasses(restProps),
      routerClasses(restProps),
      actionsClasses(restProps),
    ),
  );

  const icon = $derived(useIcon(restProps));

  function onClick() {
    restProps.onClick?.();
    restProps.onclick?.();
  }

  useSmartSelect(
    { smartSelect, smartSelectParams },
    (instance) => {
      f7SmartSelect = instance;
    },
    () => el,
  );
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a
  bind:this={el}
  class={classes}
  onclick={onClick}
  {...attrs}
  use:useTooltip={{ tooltip, tooltipTrigger }}
  use:useRouteProps={routeProps}
>
  {#if icon}
    <UseIcon {icon} />
  {/if}
  {@render children?.()}
  {#if typeof text !== 'undefined' || typeof badge !== 'undefined'}
    <span class:tabbar-label={isTabbarIcons}>
      {#if typeof text === 'function'}
        {@render text?.()}
      {:else if typeof text !== 'undefined'}
        {text}
      {/if}
      {#if typeof badge !== 'undefined'}<Badge color={badgeColor}>{badge}</Badge>{/if}
    </span>
  {/if}
</a>
