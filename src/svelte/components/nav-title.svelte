<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  export let id = undefined;
  export let style = undefined;

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
  id={id}
  style={style}
  class={classes}
>
  {#if typeof title !== 'undefined'}{Utils.text(title)}{/if}
  {#if typeof subtitle !== 'undefined'}
    <span class="subtitle">{Utils.text(subtitle)}</span>
  {/if}
  <slot />
</div>
