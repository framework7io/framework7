<script>
  import { createEventDispatcher } from 'svelte';
  import {
    colorClasses,
    routerAttrs,
    routerClasses,
    actionsAttrs,
    actionsClasses,
  } from '../shared/mixins.js';
  import { classNames, extend, plainText, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { useRouteProps } from '../shared/use-route-props.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let text = undefined;
  export let href = undefined;
  export let link = undefined;
  export let target = undefined;
  export let divider = undefined;
  export let routeProps = undefined;

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

  $: isLink = link || href || href === '';

  $: classes = classNames(
    {
      'menu-dropdown-link': isLink && !divider,
      'menu-dropdown-item': !isLink && !divider,
      'menu-dropdown-divider': divider,
    },
    className,
    colorClasses($$props),
    routerClasses($$props),
    actionsClasses($$props),
    {
      'menu-close': typeof menuClose === 'undefined',
    },
  );

  function onClick(e) {
    emit('click', [e]);
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
{#if isLink}
  <a on:click={onClick} bind:this={el} class={classes} {...attrs} use:useRouteProps={routeProps}>
    {plainText(text)}
    <slot />
  </a>
{:else}
  <div on:click={onClick} bind:this={el} class={classes} {...attrs} use:useRouteProps={routeProps}>
    {plainText(text)}
    <slot />
  </div>
{/if}
