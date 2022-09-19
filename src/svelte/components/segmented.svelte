<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';

  let className = undefined;
  export { className as class };

  export let raised = false;
  export let raisedIos = false;
  export let raisedMd = false;
  export let round = false;
  export let roundIos = false;
  export let roundMd = false;
  export let strong = false;
  export let strongIos = false;
  export let strongMd = false;
  export let tag = 'div';

  $: classes = classNames(
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
    colorClasses($$props),
  );
</script>

{#if tag === 'div'}
  <div class={classes} {...restProps($$restProps)}>
    <slot />
    {#if strong || strongIos || strongMd}<span class="segmented-highlight" />{/if}
  </div>
{:else if tag === 'p'}
  <p class={classes} {...restProps($$restProps)}>
    <slot />
    {#if strong || strongIos || strongMd}<span class="segmented-highlight" />{/if}
  </p>
{/if}
