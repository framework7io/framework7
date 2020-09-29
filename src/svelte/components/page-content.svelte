<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { restProps } from '../shared/rest-props';
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { f7, f7ready } from '../shared/f7';

  import Preloader from './preloader';

  const dispatch = createEventDispatcher();
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

  $: pageContentClasses = classNames(
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
    colorClasses($$props),
  );

  // Event handlers
  function onPtrPullStart(ptrEl) {
    if (ptrEl !== pageContentEl) return;
    dispatch('ptrPullStart');
    if (typeof $$props.onPtrPullStart === 'function') $$props.onPtrPullStart();
  }
  function onPtrPullMove(ptrEl) {
    if (ptrEl !== pageContentEl) return;
    dispatch('ptrPullMove');
    if (typeof $$props.onPtrPullMove === 'function') $$props.onPtrPullMove();
  }
  function onPtrPullEnd(ptrEl) {
    if (ptrEl !== pageContentEl) return;
    dispatch('ptrPullEnd');
    if (typeof $$props.onPtrPullEnd === 'function') $$props.onPtrPullEnd();
  }
  function onPtrRefresh(ptrEl, done) {
    if (ptrEl !== pageContentEl) return;
    dispatch('ptrRefresh', [done]);
    if (typeof $$props.onPtrRefresh === 'function') $$props.onPtrRefresh(done);
  }
  function onPtrDone(ptrEl) {
    if (ptrEl !== pageContentEl) return;
    dispatch('ptrDone');
    if (typeof $$props.onPtrDone === 'function') $$props.onPtrDone();
  }
  function onInfinite(infEl) {
    if (infEl !== pageContentEl) return;
    dispatch('infinite');
    if (typeof $$props.onInfinite === 'function') $$props.onInfinite();
  }
  function onTabShow(tabEl) {
    if (pageContentEl !== tabEl) return;
    dispatch('tabShow');
    if (typeof $$props.onTabShow === 'function') $$props.onTabShow(tabEl);
  }
  function onTabHide(tabEl) {
    if (pageContentEl !== tabEl) return;
    dispatch('tabHide');
    if (typeof $$props.onTabHide === 'function') $$props.onTabHide(tabEl);
  }

  function mountPageContent() {
    if (ptr) {
      f7.on('ptrPullStart', onPtrPullStart);
      f7.on('ptrPullMove', onPtrPullMove);
      f7.on('ptrPullEnd', onPtrPullEnd);
      f7.on('ptrRefresh', onPtrRefresh);
      f7.on('ptrDone', onPtrDone);
    }
    if (infinite) {
      f7.on('infinite', onInfinite);
    }
    if (tab) {
      f7.on('tabShow', onTabShow);
      f7.on('tabHide', onTabHide);
    }
  }
  function destroyPageContent() {
    if (ptr) {
      f7.off('ptrPullStart', onPtrPullStart);
      f7.off('ptrPullMove', onPtrPullMove);
      f7.off('ptrPullEnd', onPtrPullEnd);
      f7.off('ptrRefresh', onPtrRefresh);
      f7.off('ptrDone', onPtrDone);
    }
    if (infinite) {
      f7.off('infinite', onInfinite);
    }
    if (tab) {
      f7.off('tabShow', onTabShow);
      f7.off('tabHide', onTabHide);
    }
  }

  onMount(() => {
    f7ready(() => {
      mountPageContent();
    });
  });
  onDestroy(() => {
    if (!f7) return;
    destroyPageContent();
  });
</script>

<div
  class={pageContentClasses}
  bind:this={pageContentEl}
  data-ptr-distance={ptrDistance}
  data-ptr-mousewheel={ptrMousewheel || undefined}
  data-infinite-distance={infiniteDistance || undefined}
  {...restProps($$restProps)}>
  {#if ptr && ptrPreloader && !ptrBottom}
    <div class="ptr-preloader">
      <Preloader />
      <div class="ptr-arrow" />
    </div>
  {/if}
  {#if infinite && infiniteTop && infinitePreloader}
    <Preloader class="infinite-scroll-preloader" />
  {/if}
  <slot />
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
