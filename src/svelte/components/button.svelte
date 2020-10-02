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
  import { useTooltip } from '../shared/use-tooltip';

  import Icon from './icon';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let text = undefined;
  export let tabLink = undefined;
  export let tabLinkActive = false;
  export let type = undefined;
  export let href = '#';
  export let target = undefined;
  export let round = false;
  export let roundMd = false;
  export let roundIos = false;
  export let roundAurora = false;
  export let fill = false;
  export let fillMd = false;
  export let fillIos = false;
  export let fillAurora = false;
  export let large = false;
  export let largeMd = false;
  export let largeIos = false;
  export let largeAurora = false;
  export let small = false;
  export let smallMd = false;
  export let smallIos = false;
  export let smallAurora = false;
  export let raised = false;
  export let raisedMd = false;
  export let raisedIos = false;
  export let raisedAurora = false;
  export let outline = false;
  export let outlineMd = false;
  export let outlineIos = false;
  export let outlineAurora = false;
  export let active = false;
  export let disabled = false;
  export let tooltip = undefined;
  export let tooltipTrigger = undefined;

  let el;

  $: hrefComputed = href === true ? '#' : href || undefined;

  $: attrs = extend(
    {
      href: hrefComputed,
      target,
      type,
      'data-tab': (isStringProp(tabLink) && tabLink) || undefined,
      ...restProps($$restProps),
    },
    routerAttrs($$props),
    actionsAttrs($$props),
  );

  $: classes = classNames(
    className,
    'button',
    {
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,

      'button-round': round,
      'button-round-ios': roundIos,
      'button-round-aurora': roundAurora,
      'button-round-md': roundMd,
      'button-fill': fill,
      'button-fill-ios': fillIos,
      'button-fill-aurora': fillAurora,
      'button-fill-md': fillMd,
      'button-large': large,
      'button-large-ios': largeIos,
      'button-large-aurora': largeAurora,
      'button-large-md': largeMd,
      'button-small': small,
      'button-small-ios': smallIos,
      'button-small-aurora': smallAurora,
      'button-small-md': smallMd,
      'button-raised': raised,
      'button-raised-ios': raisedIos,
      'button-raised-aurora': raisedAurora,
      'button-raised-md': raisedMd,
      'button-active': active,
      'button-outline': outline,
      'button-outline-ios': outlineIos,
      'button-outline-aurora': outlineAurora,
      'button-outline-md': outlineMd,

      disabled,
    },
    colorClasses($$props),
    routerClasses($$props),
    actionsClasses($$props),
  );

  $: tagName = type === 'submit' || type === 'reset' || type === 'button' ? 'button' : 'a';

  $: hasIcon =
    $$props.icon ||
    $$props.iconMaterial ||
    $$props.iconF7 ||
    $$props.iconMd ||
    $$props.iconIos ||
    $$props.iconAurora;

  function onClick() {
    emit('click');
  }

  onMount(() => {
    if ($$props.routeProps) {
      el.f7RouteProps = $$props.routeProps;
    }
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
{#if tagName === 'button'}
  <button
    bind:this={el}
    class={classes}
    on:click={onClick}
    use:useTooltip={{ tooltip, tooltipTrigger }}
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
      />
    {/if}
    {#if typeof text !== 'undefined'}
      <span>{plainText(text)}</span>
    {/if}
    <slot />
  </button>
{:else}
  <a
    bind:this={el}
    class={classes}
    on:click={onClick}
    use:useTooltip={{ tooltip, tooltipTrigger }}
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
      />
    {/if}
    {#if typeof text !== 'undefined'}
      <span>{plainText(text)}</span>
    {/if}
    <slot />
  </a>
{/if}
