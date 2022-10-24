<script>
  import { restProps } from '../shared/rest-props.js';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { useTheme } from '../shared/use-theme.js';

  export let style = undefined;

  let className = undefined;
  export { className as class };
  export let size = undefined;

  let theme = useTheme((t) => {
    theme = t;
  });

  $: sizeComputed =
    size && typeof size === 'string' && size.indexOf('px') >= 0 ? size.replace('px', '') : size;

  $: preloaderStyle = (
    (style || '') +
    (sizeComputed
      ? `;width: ${sizeComputed}px; height: ${sizeComputed}px; --f7-preloader-size: ${sizeComputed}px`
      : '')
  ).replace(';;', ';');

  $: classes = classNames(
    className,
    {
      preloader: true,
    },
    colorClasses($$props),
  );
</script>

<span style={preloaderStyle} class={classes} {...restProps($$restProps)}>
  {#if theme && theme.md}
    <span class="preloader-inner">
      <svg viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="16" />
      </svg>
    </span>
  {:else if theme && theme.ios}
    <span class="preloader-inner">
      <span class="preloader-inner-line" />
      <span class="preloader-inner-line" />
      <span class="preloader-inner-line" />
      <span class="preloader-inner-line" />
      <span class="preloader-inner-line" />
      <span class="preloader-inner-line" />
      <span class="preloader-inner-line" />
      <span class="preloader-inner-line" />
    </span>
  {:else}<span class="preloader-inner" />{/if}
</span>
