<script>
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let params = undefined;
  export let pagination = undefined;
  export let scrollbar = undefined;
  export let navigation = undefined;
  export let init = true;

  let el;
  let swiper;
  let paginationEl;
  let nextEl;
  let prevEl;
  let scrollbarEl;
  let initialUpdate = false;

  $: classes = Utils.classNames(
    className,
    'swiper-container',
    Mixins.colorClasses($$props),
  );

  $: paginationComputed = (() => {
    if (pagination === true || (params && params.pagination && !params.pagination.el)) {
      return true;
    }
    return false;
  })();

  $: scrollbarComputed = (() => {
    if (scrollbar === true || (params && params.scrollbar && !params.scrollbar.el)) {
      return true;
    }
    return false;
  })();

  $: navigationComputed = (() => {
    if (navigation === true || (params && params.navigation && !params.navigation.nextEl && !params.navigation.prevEl)) {
      return true;
    }
    return false;
  })();


  onMount(() => {
    if (!init) return;
    f7.ready(() => {
      const newParams = {
        pagination: {},
        navigation: {},
        scrollbar: {},
      };
      if (params) Utils.extend(newParams, params);
      if (pagination && !newParams.pagination.el) newParams.pagination.el = paginationEl;
      if (navigation && !newParams.navigation.nextEl && !newParams.navigation.prevEl) {
        newParams.navigation.nextEl = nextEl;
        newParams.navigation.prevEl = prevEl;
      }
      if (scrollbar && !newParams.scrollbar.el) newParams.scrollbar.el = scrollbarEl;

      swiper = f7.instance.swiper.create(el, newParams);
    });
  });

  afterUpdate(() => {
    if (!initialUpdate) {
      initialUpdate = true;
      return;
    }
    if (swiper && swiper.update) swiper.update();
  });

  onDestroy(() => {
    if (swiper && swiper.destroy) swiper.destroy();
  });
</script>
<div id={id} style={style} bind:this={el} class={classes}>
  <slot name="before-wrapper" />
  <div class="swiper-wrapper">
    <slot />
  </div>
  {#if paginationComputed}
    <div bind:this={paginationEl} class="swiper-pagination" />
  {/if}
  {#if scrollbarComputed}
    <div bind:this={scrollbarEl} class="swiper-scrollbar" />
  {/if}
  {#if navigationComputed}
    <div bind:this={prevEl} class="swiper-button-prev" />
    <div bind:this={nextEl} class="swiper-button-next" />
  {/if}
  <slot name="after-wrapper" />
</div>
