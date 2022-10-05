<script>
  import { createEventDispatcher } from 'svelte';
  import {
    colorClasses,
    routerAttrs,
    routerClasses,
    actionsAttrs,
    actionsClasses,
  } from '../shared/mixins.js';
  import { classNames, extend, isStringProp, plainText, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { useTooltip } from '../shared/use-tooltip.js';
  import { useSmartSelect } from '../shared/use-smart-select.js';
  import { useRouteProps } from '../shared/use-route-props.js';
  import { useIcon } from '../shared/use-icon.js';
  import { getReactiveContext } from '../shared/get-reactive-context.js';

  import UseIcon from './use-icon.svelte';
  import Badge from './badge.svelte';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let noLinkClass = false;
  export let text = undefined;
  export let tabLink = undefined;
  export let tabLinkActive = false;
  export let tabbarLabel = false;
  export let iconOnly = false;
  export let badge = undefined;
  export let badgeColor = undefined;
  export let href = '#';
  export let target = undefined;
  export let tooltip = undefined;
  export let tooltipTrigger = undefined;
  export let routeProps = undefined;

  // Smart Select
  export let smartSelect = false;
  export let smartSelectParams = undefined;

  let el;
  let f7SmartSelect;

  export function smartSelectInstance() {
    return f7SmartSelect;
  }

  let TabbarContext =
    getReactiveContext('TabbarContext', (newValue) => {
      TabbarContext = newValue;
    }) || {};

  $: isTabbarIcons = tabbarLabel || TabbarContext.tabbarHasIcons;

  $: hrefComputed = href === true ? '#' : href || undefined;

  $: attrs = extend(
    {
      href: hrefComputed,
      target,
      'data-tab': (isStringProp(tabLink) && tabLink) || undefined,
      ...restProps($$restProps),
    },
    routerAttrs($$props),
    actionsAttrs($$props),
  );

  // eslint-disable-next-line
  $: hasDefaultSlots = $$slots.default;

  $: iconOnlyComputed = iconOnly || (!text && !hasDefaultSlots);

  $: classes = classNames(
    className,
    {
      link: !(noLinkClass || isTabbarIcons),
      'icon-only': iconOnlyComputed,
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,
      'smart-select': smartSelect,
    },
    colorClasses($$props),
    routerClasses($$props),
    actionsClasses($$props),
  );

  $: icon = useIcon($$props);

  function onClick() {
    emit('click');
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
  on:click={onClick}
  {...attrs}
  use:useTooltip={{ tooltip, tooltipTrigger }}
  use:useRouteProps={routeProps}
>
  {#if icon}
    <UseIcon {icon} />
  {/if}
  <slot />
  {#if typeof text !== 'undefined' || typeof badge !== 'undefined'}
    <span class:tabbar-label={isTabbarIcons}>
      {plainText(text)}
      {#if typeof badge !== 'undefined'}<Badge color={badgeColor}>{plainText(badge)}</Badge>{/if}
    </span>
  {/if}
</a>
