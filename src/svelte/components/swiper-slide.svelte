<script>
  export let lazy = undefined;
  export let zoom = undefined;
</script>

<swiper-slide {lazy} {...$$restProps}>
  {#if zoom}
    <div
      class="swiper-zoom-container"
      data-swiper-zoom={typeof zoom === 'number' ? zoom : undefined}
    >
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
</swiper-slide>
