<script>
  import { createEventDispatcher, onMount, afterUpdate, onDestroy } from 'svelte';
  import {
    colorClasses,
    routerAttrs,
    routerClasses,
    actionsAttrs,
    actionsClasses,
  } from '../shared/mixins';
  import { classNames, extend, plainText, isStringProp, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { useTooltip } from '../shared/use-tooltip';

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
<li class={className} {...restProps($$restProps)} use:useTooltip={{ tooltip, tooltipTrigger }} bind:this={el}>
  <a class={classes} {...attrs} on:click={onClick}>
    {plainText(title)}
    {plainText(text)}
    <slot />
  </a>
</li>
