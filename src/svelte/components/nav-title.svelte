<script>
  import Mixins from '../shared/mixins';
  import Utils from '../shared/utils';
  import restProps from '../shared/rest-props';

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
