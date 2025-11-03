<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { useTooltip } from '../shared/use-tooltip.js';

  let {
    class: className,
    tooltip,
    tooltipTrigger,
    children,
    ...restProps
  } = $props();

  const classes = $derived(classNames(className, 'badge', colorClasses(restProps)));
</script>

<span class={classes} {...restProps} use:useTooltip={{ tooltip, tooltipTrigger }}>
  {@render children?.()}
</span>
