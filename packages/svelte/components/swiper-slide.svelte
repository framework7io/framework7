<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';

  let className = undefined;
  export { className as class };

  export let zoom = undefined;

  $: classes = Utils.classNames(
    className,
    'swiper-slide',
    Mixins.colorClasses($$props),
  );

</script>

<div class={classes} {...restProps($$restProps)}>
  {#if zoom}
    <div class="swiper-zoom-container">
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
</div>
