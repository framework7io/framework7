<script>
  import { createEventDispatcher, onMount, afterUpdate, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';
  import f7 from '../utils/f7';

  const dispatch = createEventDispatcher();

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
  let f7Tooltip;

  $: hrefComputed = ((typeof link === 'boolean' && typeof href === 'boolean') ? '#' : (link || href));

  $: attrs = Utils.extend(
    {
      href: hrefComputed,
      target,
      'data-tab': (Utils.isStringProp(tabLink) && tabLink) || undefined,
    },
    Mixins.linkRouterAttrs($$props),
    Mixins.linkActionsAttrs($$props),
  );

  $: classes = Utils.classNames(
    {
      'list-button': true,
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,
    },
    Mixins.colorClasses($$props),
    Mixins.linkRouterClasses($$props),
    Mixins.linkActionsClasses($$props),
  );

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
        trigger: tooltipTrigger,
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
      if (tooltip) {
        f7Tooltip = f7.instance.tooltip.create({
          targetEl: el,
          text: tooltip,
          trigger: tooltipTrigger,
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
    if (f7Tooltip && f7Tooltip.destroy) {
      f7Tooltip.destroy();
      f7Tooltip = null;
    }
  });

</script>
<!-- svelte-ignore a11y-missing-attribute -->
<li class={className} {...restProps($$restProps)}>
  <a class={classes} {...attrs} on:click={onClick}>
    <slot>{title || text}</slot>
  </a>
</li>
