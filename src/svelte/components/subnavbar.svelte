<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  export let id = undefined;
  export let style = undefined;

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

<div class={classes} id={id} style={style} data-f7-slot={f7Slot}>
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
