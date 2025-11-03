<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let {
    class: className,
    raised = false,
    raisedIos = false,
    raisedMd = false,
    round = false,
    roundIos = false,
    roundMd = false,
    strong = false,
    strongIos = false,
    strongMd = false,
    tag = 'div',
    children,
    ...restProps
  } = $props();

  const classes = $derived(
    classNames(
      className,
      {
        segmented: true,
        'segmented-raised': raised,
        'segmented-raised-ios': raisedIos,
        'segmented-raised-md': raisedMd,
        'segmented-round': round,
        'segmented-round-ios': roundIos,
        'segmented-round-md': roundMd,
        'segmented-strong': strong,
        'segmented-strong-ios': strongIos,
        'segmented-strong-md': strongMd,
      },
      colorClasses(restProps),
    ),
  );
</script>

{#if tag === 'div'}
  <div class={classes} {...restProps}>
    {@render children?.()}
    {#if strong || strongIos || strongMd}<span class="segmented-highlight"></span>{/if}
  </div>
{:else if tag === 'p'}
  <p class={classes} {...restProps}>
    {@render children?.()}
    {#if strong || strongIos || strongMd}<span class="segmented-highlight"></span>{/if}
  </p>
{/if}
