<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { useTooltip } from '../shared/use-tooltip.js';

  let className = undefined;
  export { className as class };

  export let tooltip = undefined;
  export let tooltipTrigger = undefined;

  $: classes = classNames(className, 'badge', colorClasses($$props));
</script>

<span class={classes} {...restProps($$restProps)} use:useTooltip={{ tooltip, tooltipTrigger }}>
  <slot />
</span>
