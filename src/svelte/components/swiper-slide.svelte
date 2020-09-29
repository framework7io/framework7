<script>
  import Mixins from '../shared/mixins';
  import Utils from '../shared/utils';
  import restProps from '../shared/rest-props';

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
