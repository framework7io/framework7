<script>
  import { createEventDispatcher, onMount, afterUpdate, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';
  import hasSlots from '../utils/has-slots';

  import Badge from './badge.svelte';
  import Icon from './icon.svelte';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

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

  // Smart Select
  export let smartSelect = false;
  export let smartSelectParams = undefined;

  let el;
  let f7Tooltip;
  let f7SmartSelect;

  let isTabbarLabel = tabbarLabel;

  $: hrefComputed = href === true ? '#' : href || undefined;

  $: attrs = Utils.extend(
    {
      href: hrefComputed,
      target,
      'data-tab': (Utils.isStringProp(tabLink) && tabLink) || undefined,
    },
    Mixins.linkRouterAttrs($$props),
    Mixins.linkActionsAttrs($$props),
  );

  // eslint-disable-next-line
  $: hasDefaultSlots = hasSlots(arguments, 'default');

  $: iconOnlyComputed = iconOnly || (!text && !hasDefaultSlots);

  $: classes = Utils.classNames(
    className,
    {
      link: !(noLinkClass || isTabbarLabel),
      'icon-only': iconOnlyComputed,
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,
      'smart-select': smartSelect,
    },
    Mixins.colorClasses($$props),
    Mixins.linkRouterClasses($$props),
    Mixins.linkActionsClasses($$props),
  );

  $: hasIcon = $$props.icon || $$props.iconMaterial || $$props.iconF7 || $$props.iconMd || $$props.iconIos || $$props.iconAurora;

  $: hasIconBadge = $$props.hasIconBadge;

  let tooltipText = tooltip;
  function watchTooltip(newText) {
    const oldText = tooltipText;
    if (oldText === newText) return;
    tooltipText = newText;
    if (!newText && f7Tooltip) {
      f7Tooltip.destroy();
      f7Tooltip = null;
      return;
    }
    if (newText && !f7Tooltip && f7.instance) {
      f7Tooltip = f7.instance.tooltip.create({
        targetEl: el,
        text: newText,
      });
      return;
    }
    if (!newText || !f7Tooltip) return;
    f7Tooltip.setText(newText);
  }
  $: watchTooltip(tooltip);

  function onClick() {
    dispatch('click');
    if (typeof $$props.onClick === 'function') $$props.onClick();
  }

  onMount(() => {
    if ($$props.routeProps) {
      el.f7RouteProps = $$props.routeProps;
    }
    f7.ready(() => {
      if (tabbarLabel
        || (
          (tabLink || tabLink === '')
          && f7.instance.$(el).parents('.tabbar-labels').length
        )
      ) {
        isTabbarLabel = true;
      }
      if (smartSelect) {
        const ssParams = Utils.extend(
          { el },
          smartSelectParams || {},
        );
        f7SmartSelect = f7.instance.smartSelect.create(ssParams);
      }
      if (tooltip) {
        f7Tooltip = f7.instance.tooltip.create({
          targetEl: el,
          text: tooltip,
        });
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
    if (f7SmartSelect && f7SmartSelect.destroy) {
      f7SmartSelect.destroy();
      f7SmartSelect = null;
    }
    if (f7Tooltip && f7Tooltip.destroy) {
      f7Tooltip.destroy();
      f7Tooltip = null;
    }
  });

</script>
<!-- svelte-ignore a11y-missing-attribute -->
<a
  bind:this={el}
  id={id}
  style={style}
  class={classes}
  on:click={onClick}
  {...attrs}
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
      {Utils.text(text)}
      {#if typeof badge !== 'undefined'}<Badge color={badgeColor}>{Utils.text(badge)}</Badge>{/if}
    </span>
  {/if}
</a>
