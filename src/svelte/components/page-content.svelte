<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';
  import f7 from '../utils/f7';

  import Preloader from './Preloader.svelte';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;
  export let tab = false;
  export let tabActive = false;
  export let ptr = false;
  export let ptrDistance = undefined;
  export let ptrPreloader = true;
  export let ptrBottom = false;
  export let ptrMousewheel = false;
  export let infinite = false;
  export let infiniteTop = false;
  export let infiniteDistance = undefined;
  export let infinitePreloader = true;
  export let hideBarsOnScroll = false;
  export let hideNavbarOnScroll = false;
  export let hideToolbarOnScroll = false;
  export let messagesContent = false;
  export let loginScreen = false;

  let className = undefined;
  export { className as class };


  let pageContentEl;

  $: pageContentClasses = Utils.classNames(
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
    Mixins.colorClasses($$props),
  );

  // Event handlers
  function onPtrPullStart(ptrEl) {
    if (ptrEl !== pageContentEl) return;
    dispatch('ptr:pullstart');
  }
  function onPtrPullMove(ptrEl) {
    if (ptrEl !== pageContentEl) return;
    dispatch('ptr:pullmove');
  }
  function onPtrPullEnd(ptrEl) {
    if (ptrEl !== pageContentEl) return;
    dispatch('ptr:pullend');
  }
  function onPtrRefresh(ptrEl, done) {
    if (ptrEl !== pageContentEl) return;
    dispatch('ptr:refresh', done);
  }
  function onPtrDone(ptrEl) {
    if (ptrEl !== pageContentEl) return;
    dispatch('ptr:done');
  }
  function onInfinite(infEl) {
    if (infEl !== pageContentEl) return;
    dispatch('infinite');
  }
  function onTabShow(tabEl) {
    if (pageContentEl !== tabEl) return;
    dispatch('tab:show');
  }
  function onTabHide(tabEl) {
    if (pageContentEl !== tabEl) return;
    dispatch('tab:hide');
  }

  function mountPageContent() {
    if (ptr) {
      f7.instance.on('ptrPullStart', onPtrPullStart);
      f7.instance.on('ptrPullMove', onPtrPullMove);
      f7.instance.on('ptrPullEnd', onPtrPullEnd);
      f7.instance.on('ptrRefresh', onPtrRefresh);
      f7.instance.on('ptrDone', onPtrDone);
    }
    if (infinite) {
      f7.instance.on('infinite', onInfinite);
    }
    if (tab) {
      f7.instance.on('tabShow', onTabShow);
      f7.instance.on('tabHide', onTabHide);
    }
  }
  function destroyPageContent() {
    if (ptr) {
      f7.instance.off('ptrPullStart', onPtrPullStart);
      f7.instance.off('ptrPullMove', onPtrPullMove);
      f7.instance.off('ptrPullEnd', onPtrPullEnd);
      f7.instance.off('ptrRefresh', onPtrRefresh);
      f7.instance.off('ptrDone', onPtrDone);
    }
    if (infinite) {
      f7.instance.off('infinite', onInfinite);
    }
    if (tab) {
      f7.instance.off('tabShow', onTabShow);
      f7.instance.off('tabHide', onTabHide);
    }
  }

  onMount(() => {
    f7.ready(() => {
      mountPageContent();
    });
  });
  onDestroy(() => {
    destroyPageContent();
  });
</script>

<div
  class={pageContentClasses}
  style={style}
  id={id}
  bind:this={pageContentEl}
  data-ptr-distance={ptrDistance}
  data-ptr-mousewheel={ptrMousewheel || undefined}
  data-infinite-distance={infiniteDistance || undefined}
>
  {#if ptr && ptrPreloader && !ptrBottom}
    <div class="ptr-preloader">
      <Preloader />
      <div class="ptr-arrow" />
    </div>
  {/if}
  {#if infinite && infiniteTop && infinitePreloader}
    <Preloader class="infinite-scroll-preloader"/>
  {/if}
  <slot />
  {#if infinite && !infiniteTop && infinitePreloader}
    <Preloader class="infinite-scroll-preloader"/>
  {/if}
  {#if ptr && ptrPreloader && ptrBottom}
    <div class="ptr-preloader">
      <Preloader />
      <div class="ptr-arrow" />
    </div>
  {/if}
</div>
