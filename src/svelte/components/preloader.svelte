<script>
  import { theme } from '../shared/plugin';
  import Utils from '../shared/utils';
  import restProps from '../shared/rest-props';
  import Mixins from '../shared/mixins';
  import f7 from '../shared/f7';

  export let style = undefined;

  let className = undefined;
  export { className as class };
  export let size = undefined;

  // eslint-disable-next-line
  let _theme = f7.instance ? theme : null;

  if (!f7.instance) {
    f7.ready(() => {
      _theme = theme;
    });
  }

  $: sizeComputed = size && typeof size === 'string' && size.indexOf('px') >= 0
    ? size.replace('px', '')
    : size;

  $: preloaderStyle = ((style || '') + (sizeComputed ? `;width: ${sizeComputed}px; height: ${sizeComputed}px; --f7-preloader-size: ${sizeComputed}px` : '')).replace(';;', ';');

  $: classes = Utils.classNames(
    className,
    'preloader',
    Mixins.colorClasses($$props),
  );

</script>

<span style={preloaderStyle} class={classes} {...restProps($$restProps)}>
  {#if _theme && _theme.md}
  <span class="preloader-inner">
    <span class="preloader-inner-gap" />
    <span class="preloader-inner-left">
      <span class="preloader-inner-half-circle" />
    </span>
    <span class="preloader-inner-right">
      <span class="preloader-inner-half-circle" />
    </span>
  </span>
  {:else if _theme && _theme.ios}
  <span class="preloader-inner">
    <span class="preloader-inner-line"></span>
    <span class="preloader-inner-line"></span>
    <span class="preloader-inner-line"></span>
    <span class="preloader-inner-line"></span>
    <span class="preloader-inner-line"></span>
    <span class="preloader-inner-line"></span>
    <span class="preloader-inner-line"></span>
    <span class="preloader-inner-line"></span>
    <span class="preloader-inner-line"></span>
    <span class="preloader-inner-line"></span>
    <span class="preloader-inner-line"></span>
    <span class="preloader-inner-line"></span>
  </span>
  {:else if _theme && _theme.aurora}
  <span class="preloader-inner">
    <span class="preloader-inner-circle"></span>
  </span>
  {:else}
  <span class="preloader-inner"></span>
  {/if}
</span>
