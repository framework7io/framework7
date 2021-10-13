<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';

  let className = undefined;
  export { className as class };

  export let sliding = undefined;
  export let title = undefined;
  export let inner = true;
  export let f7Slot = 'fixed';

  $: classes = classNames(
    className,
    'subnavbar',
    {
      sliding,
    },
    colorClasses($$props),
  );
</script>

<div class={classes} data-f7-slot={f7Slot} {...restProps($$restProps)}>
  {#if inner}
    <div class="subnavbar-inner">
      {#if title}
        <div class="subnavbar-title">{title}</div>
      {/if}
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
</div>
