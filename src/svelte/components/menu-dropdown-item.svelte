<script>
  import { createEventDispatcher, onMount, afterUpdate, onDestroy } from 'svelte';
  import {
    colorClasses,
    routerAttrs,
    routerClasses,
    actionsAttrs,
    actionsClasses,
  } from '../shared/mixins';
  import { classNames, extend, plainText } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7 } from '../shared/f7';

  const dispatch = createEventDispatcher();

  let className = undefined;
  export { className as class };

  export let text = undefined;
  export let href = undefined;
  export let link = undefined;
  export let target = undefined;
  export let divider = undefined;

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
    dispatch('click', [e]);
    if (typeof $$props.onClick === 'function') $$props.onClick(e);
  }

  onMount(() => {
    if ($$props.routeProps) {
      el.f7RouteProps = $$props.routeProps;
    }
  });
  afterUpdate(() => {
    if ($$props.routeProps && el) {
      el.f7RouteProps = $$props.routeProps;
    }
  });
  onDestroy(() => {
    if (!el || !f7) return;
    delete el.f7RouteProps;
  });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
{#if isLink}
  <a on:click={onClick} bind:this={el} class={classes} {...attrs}>
    {plainText(text)}
    <slot />
  </a>
{:else}
  <div on:click={onClick} bind:this={el} class={classes} {...attrs}>
    {plainText(text)}
    <slot />
  </div>
{/if}
