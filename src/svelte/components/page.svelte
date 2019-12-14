<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';
  import f7 from '../utils/f7';

  import PageContent from './page-content.svelte';

  const dispatch = createEventDispatcher();

  // Props
  export let id = undefined;
  export let style = undefined;
  export let name = undefined;
  export let stacked = undefined;
  export let withSubnavbar = undefined;
  export let subnavbar = undefined;
  export let withNavbarLarge = undefined;
  export let navbarLarge = undefined;
  export let noNavbar = undefined;
  export let noToolbar = undefined;
  export let tabs = undefined;
  export let pageContent = true;
  export let noSwipeback = undefined;
  // Page Content Props
  export let ptr = undefined;
  export let ptrDistance = undefined;
  export let ptrPreloader = true;
  export let ptrBottom = undefined;
  export let ptrMousewheel = undefined;
  export let infinite = undefined;
  export let infiniteTop = undefined;
  export let infiniteDistance = undefined;
  export let infinitePreloader = true;
  export let hideBarsOnScroll = undefined;
  export let hideNavbarOnScroll = undefined;
  export let hideToolbarOnScroll = undefined;
  export let messagesContent = undefined;
  export let loginScreen = undefined;

  let className = undefined;
  export { className as class };

  // State
  let el;
  let hasSubnavbar = false;
  let hasNavbarLarge = false;
  let hasNavbarLargeCollapsed = false;
  let hasCardExpandableOpened = false;
  let routerPositionClass = '';
  let routerForceUnstack = false;
  let routerPageRole = null;
  let routerPageRoleDetailRoot = false;
  let routerPageMasterStack = false;

  $: forceSubnavbar = (typeof subnavbar === 'undefined' && typeof withSubnavbar === 'undefined')
    ? hasSubnavbar
    : false;

  $: forceNavbarLarge = (typeof navbarLarge === 'undefined' && typeof withNavbarLarge === 'undefined')
    ? hasNavbarLarge
    : false;

  $: classes = Utils.classNames(
    className,
    'page',
    routerPositionClass,
    {
      stacked: stacked && !routerForceUnstack,
      tabs,
      'page-with-subnavbar': subnavbar || withSubnavbar || forceSubnavbar,
      'page-with-navbar-large': navbarLarge || withNavbarLarge || forceNavbarLarge,
      'no-navbar': noNavbar,
      'no-toolbar': noToolbar,
      'no-swipeback': noSwipeback,
      'page-master': routerPageRole === 'master',
      'page-master-detail': routerPageRole === 'detail',
      'page-master-detail-root': routerPageRoleDetailRoot === true,
      'page-master-stacked': routerPageMasterStack === true,
      'page-with-navbar-large-collapsed': hasNavbarLargeCollapsed === true,
      'page-with-card-opened': hasCardExpandableOpened === true,
      'login-screen-page': loginScreen,
    },
    Mixins.colorClasses($$props),
  );

  // Handlers
  function onPtrPullStart(e) {
    dispatch('ptr:pullstart', e.detail);
  }
  function onPtrPullMove(e) {
    dispatch('ptr:pullmove', e.detail);
  }
  function onPtrPullEnd(e) {
    dispatch('ptr:pullend', e.detail);
  }
  function onPtrRefresh(e) {
    dispatch('ptr:refresh', e.detail);
  }
  function onPtrDone(e) {
    dispatch('ptr:done', e.detail);
  }
  function onInfinite(e) {
    dispatch('infinite', e.detail);
  }
  // Main Page Events
  function onPageMounted(page) {
    if (el !== page.el) return;
    dispatch('page:mounted', page);
  }
  function onPageInit(page) {
    if (el !== page.el) return;
    if (typeof withSubnavbar === 'undefined' && typeof subnavbar === 'undefined') {
      if (
        (page.$navbarEl && page.$navbarEl.length && page.$navbarEl.find('.subnavbar').length)
        || (page.$el.children('.navbar').find('.subnavbar').length)
      ) {
        hasSubnavbar = true;
      }
    }

    if (typeof withNavbarLarge === 'undefined' && typeof navbarLarge === 'undefined') {
      if (
        (page.$navbarEl && page.$navbarEl.hasClass('navbar-large'))
        || page.$el.children('.navbar-large').length
      ) {
        hasNavbarLarge = true;
      }
    }

    dispatch('page:init', page);
  }
  function onPageReinit(page) {
    if (el !== page.el) return;
    dispatch('page:reinit', page);
  }
  function onPageBeforeIn(page) {
    if (el !== page.el) return;
    if (!page.swipeBack) {
      if (page.from === 'next') {
        routerPositionClass = 'page-next';
      }
      if (page.from === 'previous') {
        routerPositionClass = 'page-previous';
      }
    }
    dispatch('page:beforein', page);
  }
  function onPageBeforeOut(page) {
    if (el !== page.el) return;
    dispatch('page:beforeout', page);
  }
  function onPageAfterOut(page) {
    if (el !== page.el) return;
    if (page.to === 'next') {
      routerPositionClass = 'page-next';
    }
    if (page.to === 'previous') {
      routerPositionClass = 'page-previous';
    }
    dispatch('page:afterout', page);
  }
  function onPageAfterIn(page) {
    if (el !== page.el) return;
    routerPositionClass = 'page-current';
    dispatch('page:afterin', page);
  }
  function onPageBeforeRemove(page) {
    if (el !== page.el) return;
    // if (page.$navbarEl && page.$navbarEl[0] && page.$navbarEl.parent()[0] && page.$navbarEl.parent()[0] !== el) {
    //   page.$el.prepend(page.$navbarEl);
    // }
    dispatch('page:beforeremove', page);
  }
  // Helper events
  function onPageStack(pageEl) {
    if (el !== pageEl) return;
    routerForceUnstack = false;
  }
  function onPageUnstack(pageEl) {
    if (el !== pageEl) return;
    routerForceUnstack = true;
  }
  function onPagePosition(pageEl, position) {
    if (el !== pageEl) return;
    routerPositionClass = `page-${position}`;
  }
  function onPageRole(pageEl, rolesData) {
    if (el !== pageEl) return;
    routerPageRole = rolesData.role;
    routerPageRoleDetailRoot = rolesData.detailRoot;
  }
  function onPageMasterStack(pageEl) {
    if (el !== pageEl) return;
    routerPageMasterStack = true;
  }
  function onPageMasterUnstack(pageEl) {
    if (el !== pageEl) return;
    routerPageMasterStack = false;
  }
  function onPageNavbarLargeCollapsed(pageEl) {
    if (el !== pageEl) return;
    hasNavbarLargeCollapsed = true;
  }
  function onPageNavbarLargeExpanded(pageEl) {
    if (el !== pageEl) return;
    hasNavbarLargeCollapsed = false;
  }
  function onCardOpened(cardEl, pageEl) {
    if (el !== pageEl) return;
    hasCardExpandableOpened = true;
  }
  function onCardClose(cardEl, pageEl) {
    if (el !== pageEl) return;
    hasCardExpandableOpened = false;
  }

  // Mount/destroy
  function mountPage() {
    f7.instance.on('pageMounted', onPageMounted);
    f7.instance.on('pageInit', onPageInit);
    f7.instance.on('pageReinit', onPageReinit);
    f7.instance.on('pageBeforeIn', onPageBeforeIn);
    f7.instance.on('pageBeforeOut', onPageBeforeOut);
    f7.instance.on('pageAfterOut', onPageAfterOut);
    f7.instance.on('pageAfterIn', onPageAfterIn);
    f7.instance.on('pageBeforeRemove', onPageBeforeRemove);
    f7.instance.on('pageStack', onPageStack);
    f7.instance.on('pageUnstack', onPageUnstack);
    f7.instance.on('pagePosition', onPagePosition);
    f7.instance.on('pageRole', onPageRole);
    f7.instance.on('pageMasterStack', onPageMasterStack);
    f7.instance.on('pageMasterUnstack', onPageMasterUnstack);
    f7.instance.on('pageNavbarLargeCollapsed', onPageNavbarLargeCollapsed);
    f7.instance.on('pageNavbarLargeExpanded', onPageNavbarLargeExpanded);
    f7.instance.on('cardOpened', onCardOpened);
    f7.instance.on('cardClose', onCardClose);
  }
  function destroyPage() {
    f7.instance.off('pageMounted', onPageMounted);
    f7.instance.off('pageInit', onPageInit);
    f7.instance.off('pageReinit', onPageReinit);
    f7.instance.off('pageBeforeIn', onPageBeforeIn);
    f7.instance.off('pageBeforeOut', onPageBeforeOut);
    f7.instance.off('pageAfterOut', onPageAfterOut);
    f7.instance.off('pageAfterIn', onPageAfterIn);
    f7.instance.off('pageBeforeRemove', onPageBeforeRemove);
    f7.instance.off('pageStack', onPageStack);
    f7.instance.off('pageUnstack', onPageUnstack);
    f7.instance.off('pagePosition', onPagePosition);
    f7.instance.off('pageRole', onPageRole);
    f7.instance.off('pageMasterStack', onPageMasterStack);
    f7.instance.off('pageMasterUnstack', onPageMasterUnstack);
    f7.instance.off('pageNavbarLargeCollapsed', onPageNavbarLargeCollapsed);
    f7.instance.off('pageNavbarLargeExpanded', onPageNavbarLargeExpanded);
    f7.instance.off('cardOpened', onCardOpened);
    f7.instance.off('cardClose', onCardClose);
  }

  onMount(() => {
    f7.ready(() => {
      mountPage();
    });
  });
  onDestroy(() => {
    destroyPage();
  });
</script>
<div bind:this={el} id={id} style={style} class={classes} data-name={name}>
  <slot name="fixed"></slot>
  {#if pageContent}
  <PageContent
    ptr={ptr}
    ptrDistance={ptrDistance}
    ptrPreloader={ptrPreloader}
    ptrBottom={ptrBottom}
    ptrMousewheel={ptrMousewheel}
    infinite={infinite}
    infiniteTop={infiniteTop}
    infiniteDistance={infiniteDistance}
    infinitePreloader={infinitePreloader}
    hideBarsOnScroll={hideBarsOnScroll}
    hideNavbarOnScroll={hideNavbarOnScroll}
    hideToolbarOnScroll={hideToolbarOnScroll}
    messagesContent={messagesContent}
    loginScreen={loginScreen}
    on:ptr:pullstart={onPtrPullStart}
    on:ptr:pullmove={onPtrPullMove}
    on:ptr:pullend={onPtrPullEnd}
    on:ptr:refresh={onPtrRefresh}
    on:ptr:done={onPtrDone}
    on:infinite={onInfinite}
  >
    <slot name="static"></slot>
    <slot></slot>
  </PageContent>
  {:else}
  <slot name="static"></slot>
  <slot></slot>
  {/if}
</div>


