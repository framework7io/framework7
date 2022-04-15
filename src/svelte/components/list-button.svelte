<script>
  import { createEventDispatcher } from 'svelte';
  import {
    colorClasses,
    routerAttrs,
    routerClasses,
    actionsAttrs,
    actionsClasses,
  } from '../shared/mixins.js';
  import { classNames, extend, plainText, isStringProp, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { useTooltip } from '../shared/use-tooltip.js';
  import { useRouteProps } from '../shared/use-route-props.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let title = undefined;
  export let text = undefined;
  export let tabLink = undefined;
  export let tabLinkActive = false;
  export let link = undefined;
  export let href = undefined;
  export let target = undefined;
  export let tooltip = undefined;
  export let tooltipTrigger = undefined;
  export let routeProps = undefined;

  let el;

  $: hrefComputed = typeof link === 'boolean' && typeof href === 'boolean' ? '#' : link || href;

  $: attrs = extend(
    {
      href: hrefComputed,
      target,
      'data-tab': (isStringProp(tabLink) && tabLink) || undefined,
    },
    routerAttrs($$props),
    actionsAttrs($$props),
  );

  $: classes = classNames(
    {
      'list-button': true,
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,
    },
    colorClasses($$props),
    routerClasses($$props),
    actionsClasses($$props),
  );

  function onClick() {
    emit('click');
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<li
  class={className}
  {...restProps($$restProps)}
  bind:this={el}
  use:useRouteProps={routeProps}
  use:useTooltip={{ tooltip, tooltipTrigger }}
>
  <a class={classes} {...attrs} on:click={onClick}>
    {plainText(title)}
    {plainText(text)}
    <slot />
  </a>
</li>
