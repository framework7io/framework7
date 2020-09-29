<script>
  import { colorClasses } from '../shared/mixins';
  import { classNames, plainText } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  let className = undefined;
  export { className as class };

  export let title = undefined;
  export let subtitle = undefined;
  export let sliding = undefined;

  $: classes = classNames(
    className,
    'title',
    {
      sliding,
    },
    colorClasses($$props),
  );
</script>

<div class={classes} {...restProps($$restProps)}>
  {#if typeof title !== 'undefined'}{plainText(title)}{/if}
  {#if typeof subtitle !== 'undefined'}<span class="subtitle">{plainText(subtitle)}</span>{/if}
  <slot />
</div>
