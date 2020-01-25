<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let zoom = undefined;

  $: classes = Utils.classNames(
    className,
    'swiper-slide',
    Mixins.colorClasses($$props),
  );

</script>

<div id={id} style={style} class={classes}>
  {#if zoom}
    <div class="swiper-zoom-container">
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
</div>
