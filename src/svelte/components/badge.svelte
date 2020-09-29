<script>
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { useTooltip } from '../shared/use-tooltip';

  let className = undefined;
  export { className as class };

  export let tooltip = undefined;
  export let tooltipTrigger = undefined;

  $: classes = classNames(className, 'badge', colorClasses($$props));
</script>

<span class={classes} {...restProps($$restProps)} use:useTooltip={{ tooltip, tooltipTrigger }}>
  <slot />
</span>
