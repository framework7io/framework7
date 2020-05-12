<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';

  let className = undefined;
  export { className as class };

  export let title = undefined;
  export let subtitle = undefined;
  export let sliding = undefined;

  $: classes = Utils.classNames(
    className,
    'title',
    {
      sliding,
    },
    Mixins.colorClasses($$props),
  );
</script>
<div
  class={classes}
  {...restProps($$restProps)}
>
  {#if typeof title !== 'undefined'}{Utils.text(title)}{/if}
  {#if typeof subtitle !== 'undefined'}
    <span class="subtitle">{Utils.text(subtitle)}</span>
  {/if}
  <slot />
</div>
