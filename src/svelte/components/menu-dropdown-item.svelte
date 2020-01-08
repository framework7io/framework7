<script>
  import { createEventDispatcher, onMount, afterUpdate, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let text = undefined;
  export let href = undefined;
  export let link = undefined;
  export let target = undefined;
  export let divider = undefined;

  let el;

  $: hrefComputed = typeof href === 'undefined' && link ? '#' : href;

  $: attrs = Utils.extend(
    {
      href: hrefComputed,
      target,
    },
    Mixins.linkRouterAttrs($$props),
    Mixins.linkActionsAttrs($$props),
  );

  $: isLink = (link || href || href === '');

  $: classes = Utils.classNames(
    {
      'menu-dropdown-link': isLink && !divider,
      'menu-dropdown-item': !isLink && !divider,
      'menu-dropdown-divider': divider,
    },
    className,
    Mixins.colorClasses($$props),
    Mixins.linkRouterClasses($$props),
    Mixins.linkActionsClasses($$props),
    {
      'menu-close': typeof menuClose === 'undefined',
    }
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
    if (!el || !f7.instance) return;
    delete el.f7RouteProps;
  });

</script>
<!-- svelte-ignore a11y-missing-attribute -->
{#if isLink}
  <a on:click={onClick} bind:this={el} class={classes} id={id} style={style} {...attrs}>
    {Utils.text(text)}
    <slot />
  </a>
{:else}
  <div on:click={onClick} bind:this={el} class={classes} id={id} style={style} {...attrs}>
    {Utils.text(text)}
    <slot />
  </div>
{/if}
