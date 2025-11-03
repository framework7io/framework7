<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { useTheme } from '../shared/use-theme.js';
  let { class: className, size = undefined, style = undefined, children, ...restProps } = $props();

  let theme = useTheme((t) => {
    theme = t;
  });

  const sizeComputed = $derived(
    size && typeof size === 'string' && size.indexOf('px') >= 0 ? size.replace('px', '') : size,
  );

  const preloaderStyle = $derived(
    (
      (style || '') +
      (sizeComputed
        ? `;width: ${sizeComputed}px; height: ${sizeComputed}px; --f7-preloader-size: ${sizeComputed}px`
        : '')
    ).replace(';;', ';'),
  );

  const classes = $derived(
    classNames(
      className,
      {
        preloader: true,
      },
      colorClasses(restProps),
    ),
  );
</script>

<span style={preloaderStyle} class={classes} {...restProps}>
  {#if theme && theme.md}
    <span class="preloader-inner">
      <svg viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="16" />
      </svg>
    </span>
  {:else if theme && theme.ios}
    <span class="preloader-inner">
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
      <span class="preloader-inner-line"></span>
    </span>
  {:else}<span class="preloader-inner"></span>{/if}
</span>
