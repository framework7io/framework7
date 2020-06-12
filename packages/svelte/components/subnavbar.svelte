<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';

  let className = undefined;
  export { className as class };

  export let sliding = undefined;
  export let title = undefined;
  export let inner = true;
  export let f7Slot = 'fixed';

  $: classes = Utils.classNames(
    className,
    'subnavbar',
    {
      sliding,
    },
    Mixins.colorClasses($$props),
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
