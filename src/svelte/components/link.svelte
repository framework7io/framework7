<script>
  import { createEventDispatcher, onMount, afterUpdate, onDestroy } from 'svelte';
  import {
    colorClasses,
    routerAttrs,
    routerClasses,
    actionsAttrs,
    actionsClasses,
  } from '../shared/mixins';
  import { classNames, extend, isStringProp, plainText, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7, f7ready } from '../shared/f7';
  import { hasSlots } from '../shared/has-slots';
  import { useTooltip } from '../shared/use-tooltip';
  import { useSmartSelect } from '../shared/use-smart-select';

  import Badge from './badge';
  import Icon from './icon';

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
  export let iconBadge = undefined;
  export let href = '#';
  export let target = undefined;
  export let tooltip = undefined;
  export let tooltipTrigger = undefined;

  // Smart Select
  export let smartSelect = false;
  export let smartSelectParams = undefined;

  let el;
  let f7SmartSelect;

  let isTabbarLabel = tabbarLabel;

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
  $: hasDefaultSlots = hasSlots(arguments, 'default');

  $: iconOnlyComputed = iconOnly || (!text && !hasDefaultSlots);

  $: classes = classNames(
    className,
    {
      link: !(noLinkClass || isTabbarLabel),
      'icon-only': iconOnlyComputed,
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,
      'smart-select': smartSelect,
    },
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

  $: hasIconBadge = $$props.hasIconBadge;

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

  onMount(() => {
    if ($$props.routeProps) {
      el.f7RouteProps = $$props.routeProps;
    }
    f7ready(() => {
      if (
        tabbarLabel ||
        ((tabLink || tabLink === '') && f7.$(el).parents('.tabbar-labels').length)
      ) {
        isTabbarLabel = true;
      }
    });
  });
  afterUpdate(() => {
    if ($$props.routeProps) {
      el.f7RouteProps = $$props.routeProps;
    }
  });
  onDestroy(() => {
    if (el) delete el.f7RouteProps;
  });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a
  bind:this={el}
  class={classes}
  on:click={onClick}
  {...attrs}
  use:useTooltip={{ tooltip, tooltipTrigger }}
>
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
    >{#if iconBadge}<Badge color={badgeColor}>{iconBadge}</Badge>{/if}</Icon>
  {/if}
  <slot />
  {#if typeof text !== 'undefined' || typeof badge !== 'undefined'}
    <span class:tabbar-label={isTabbarLabel}>
      {plainText(text)}
      {#if typeof badge !== 'undefined'}<Badge color={badgeColor}>{plainText(badge)}</Badge>{/if}
    </span>
  {/if}
</a>
