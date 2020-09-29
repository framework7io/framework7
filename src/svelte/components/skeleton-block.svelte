<script>
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let width = undefined;
  export let height = undefined;
  export let tag = 'div';

  $: classes = classNames('skeleton-block', className, colorClasses($$props));

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
  <div style={styleAttribute} class={classes} {...restProps($$restProps)}>
    <slot />
  </div>
{:else if tag === 'span'}
  <span style={styleAttribute} class={classes} {...restProps($$restProps)}>
    <slot />
  </span>
{/if}
