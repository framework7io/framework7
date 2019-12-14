<script>
  import { theme } from '../utils/plugin';
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';
  import f7 from '../utils/f7';

  let className = undefined;
  export { className as class };

  export let id = undefined;
  export let style = undefined;
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

<span id={id} style={preloaderStyle} class={classes}>
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
