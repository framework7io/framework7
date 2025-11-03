<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';
  import { useTab } from '../shared/use-tab.js';

  import Preloader from './preloader.svelte';

  let {
    class: className,
    tab = false,
    tabActive = false,
    ptr = false,
    ptrDistance = undefined,
    ptrPreloader = true,
    ptrBottom = false,
    ptrMousewheel = false,
    infinite = false,
    infiniteTop = false,
    infiniteDistance = undefined,
    infinitePreloader = true,
    hideBarsOnScroll = false,
    hideNavbarOnScroll = false,
    hideToolbarOnScroll = false,
    messagesContent = false,
    loginScreen = false,
    children,
    ...restProps
  } = $props();

  let pageContentEl = $state(null);

  const pageContentClasses = $derived(
    classNames(
      className,
      'page-content',
      {
        tab,
        'tab-active': tabActive,
        'ptr-content': ptr,
        'ptr-bottom': ptrBottom,
        'infinite-scroll-content': infinite,
        'infinite-scroll-top': infiniteTop,
        'hide-bars-on-scroll': hideBarsOnScroll,
        'hide-navbar-on-scroll': hideNavbarOnScroll,
        'hide-toolbar-on-scroll': hideToolbarOnScroll,
        'messages-content': messagesContent,
        'login-screen-content': loginScreen,
      },
      colorClasses(restProps),
    ),
  );

  // Event handlers
  function onPtrPullStart(ptrEl) {
    if (ptrEl !== pageContentEl) return;
    restProps.onPtrPullStart?.();
    restProps.onptrpullstart?.();
  }
  function onPtrPullMove(ptrEl) {
    if (ptrEl !== pageContentEl) return;
    restProps.onPtrPullMove?.();
    restProps.onptrpullmove?.();
  }
  function onPtrPullEnd(ptrEl) {
    if (ptrEl !== pageContentEl) return;
    restProps.onPtrPullEnd?.();
    restProps.onptrpullend?.();
  }
  function onPtrRefresh(ptrEl, done) {
    if (ptrEl !== pageContentEl) return;
    restProps.onPtrRefresh?.();
    restProps.onptrrefresh?.();
  }
  function onPtrDone(ptrEl) {
    if (ptrEl !== pageContentEl) return;
    restProps.onPtrDone?.();
    restProps.onptrdone?.();
  }
  function onInfinite(infEl) {
    if (infEl !== pageContentEl) return;
    restProps.onInfinite?.();
    restProps.oninfinite?.();
  }

  function mountPageContent() {
    if (ptr) {
      app.f7.on('ptrPullStart', onPtrPullStart);
      app.f7.on('ptrPullMove', onPtrPullMove);
      app.f7.on('ptrPullEnd', onPtrPullEnd);
      app.f7.on('ptrRefresh', onPtrRefresh);
      app.f7.on('ptrDone', onPtrDone);
    }
    if (infinite) {
      app.f7.on('infinite', onInfinite);
    }
  }
  function destroyPageContent() {
    if (ptr) {
      app.f7.off('ptrPullStart', onPtrPullStart);
      app.f7.off('ptrPullMove', onPtrPullMove);
      app.f7.off('ptrPullEnd', onPtrPullEnd);
      app.f7.off('ptrRefresh', onPtrRefresh);
      app.f7.off('ptrDone', onPtrDone);
    }
    if (infinite) {
      app.f7.off('infinite', onInfinite);
    }
  }

  useTab(() => pageContentEl, restProps);

  onMount(() => {
    f7ready(() => {
      mountPageContent();
    });
  });
  onDestroy(() => {
    if (!app.f7) return;
    destroyPageContent();
  });
</script>

<div
  class={pageContentClasses}
  bind:this={pageContentEl}
  data-ptr-distance={ptrDistance}
  data-ptr-mousewheel={ptrMousewheel || undefined}
  data-infinite-distance={infiniteDistance || undefined}
  {...restProps}
>
  {#if ptr && ptrPreloader && !ptrBottom}
    <div class="ptr-preloader">
      <Preloader />
      <div class="ptr-arrow" />
    </div>
  {/if}
  {#if infinite && infiniteTop && infinitePreloader}
    <Preloader class="infinite-scroll-preloader" />
  {/if}
  {@render children?.()}
  {#if infinite && !infiniteTop && infinitePreloader}
    <Preloader class="infinite-scroll-preloader" />
  {/if}
  {#if ptr && ptrPreloader && ptrBottom}
    <div class="ptr-preloader">
      <Preloader />
      <div class="ptr-arrow" />
    </div>
  {/if}
</div>
