<script>
  import {
    colorClasses,
    routerAttrs,
    routerClasses,
    actionsAttrs,
    actionsClasses,
  } from '../shared/mixins.js';
  import { classNames, extend, isStringProp } from '../shared/utils.js';
  import { useTooltip } from '../shared/use-tooltip.js';
  import { useRouteProps } from '../shared/use-route-props.js';

  let {
    class: className,
    title = undefined,
    text = undefined,
    tabLink = undefined,
    tabLinkActive = false,
    link = undefined,
    href = undefined,
    target = undefined,
    tooltip = undefined,
    tooltipTrigger = undefined,
    routeProps = undefined,
    children,
    ...restProps
  } = $props();

  let el = $state(null);

  const hrefComputed = $derived(
    typeof link === 'boolean' && typeof href === 'boolean' ? '#' : link || href,
  );

  const attrs = $derived(
    extend(
      {
        href: hrefComputed,
        target,
        'data-tab': (isStringProp(tabLink) && tabLink) || undefined,
      },
      routerAttrs(restProps),
      actionsAttrs(restProps),
    ),
  );

  const classes = $derived(
    classNames(
      {
        'list-button': true,
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
      },
      colorClasses(restProps),
      routerClasses(restProps),
      actionsClasses(restProps),
    ),
  );

  function onClick() {
    restProps.onClick?.();
    restProps.onclick?.();
  }
</script>

<li
  class={className}
  {...restProps}
  bind:this={el}
  use:useRouteProps={routeProps}
  use:useTooltip={{ tooltip, tooltipTrigger }}
>
  <a class={classes} {...attrs} onclick={onClick}>
    {#if typeof title === 'function'}
      {@render title?.()}
    {:else if typeof title !== 'undefined'}
      {title}
    {/if}
    {#if typeof text === 'function'}
      {@render text?.()}
    {:else if typeof text !== 'undefined'}
      {text}
    {/if}
    {@render children?.()}
  </a>
</li>
