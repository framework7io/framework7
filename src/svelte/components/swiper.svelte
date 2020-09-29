<script>
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames, extend } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7 } from '../shared/f7';

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

  $: classes = classNames(className, 'swiper-container', colorClasses($$props));

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
    if (
      navigation === true ||
      (params && params.navigation && !params.navigation.nextEl && !params.navigation.prevEl)
    ) {
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
      if (params) extend(newParams, params);
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

<div bind:this={el} class={classes} {...restProps($$restProps)}>
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
