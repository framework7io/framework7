<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let width = undefined;
  export let height = undefined;
  export let tag = 'div';

  $: classes = Utils.classNames(
    'skeleton-block',
    className,
    Mixins.colorClasses($$props),
  );

  $: styleAttribute = (() => {
    let s = style || '';
    if (width) {
      const widthValue = typeof width === 'number' ? `${width}px` : width;
      s = `width: ${widthValue}; ${s}`;
    }
    if (height) {
      const heightValue = typeof height === 'number' ? `${height}px` : height;
      s = `height: ${heightValue}; ${s}`;
    }
    return s;
  })();

</script>
{#if tag === 'div'}
<div id={id} style={styleAttribute} class={classes}>
  <slot />
</div>
{:else if tag === 'span'}
<span id={id} style={styleAttribute} class={classes}>
  <slot />
</span>
{/if}
