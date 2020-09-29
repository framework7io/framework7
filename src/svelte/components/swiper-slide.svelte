<script>
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  let className = undefined;
  export { className as class };

  export let zoom = undefined;

  $: classes = classNames(className, 'swiper-slide', colorClasses($$props));
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
