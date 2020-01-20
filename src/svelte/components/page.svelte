<script>
  import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
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
  function onPtrPullStart() {
    dispatch('ptrPullStart');
    if (typeof $$props.onPtrPullStart === 'function') $$props.onPtrPullStart();
  }
  function onPtrPullMove() {
    dispatch('ptrPullMove');
    if (typeof $$props.onPtrPullMove === 'function') $$props.onPtrPullMove();
  }
  function onPtrPullEnd() {
    dispatch('ptrPullEnd');
    if (typeof $$props.onPtrPullEnd === 'function') $$props.onPtrPullEnd();
  }
  function onPtrRefresh(done) {
    dispatch('ptrRefresh', [done]);
    if (typeof $$props.onPtrRefresh === 'function') $$props.onPtrRefresh(done);
  }
  function onPtrDone() {
    dispatch('ptrDone');
    if (typeof $$props.onPtrDone === 'function') $$props.onPtrDone();
  }
  function onInfinite() {
    dispatch('infinite');
    if (typeof $$props.onInfinite === 'function') $$props.onInfinite();
  }
  // Main Page Events
  function onPageMounted(page) {
    if (el !== page.el) return;
    dispatch('pageMounted', [page]);
    if (typeof $$props.onPageMounted === 'function') $$props.onPageMounted(page);
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

    dispatch('pageInit', [page]);
    if (typeof $$props.onPageInit === 'function') $$props.onPageInit(page);
  }
  function onPageReinit(page) {
    if (el !== page.el) return;
    dispatch('pageReinit', [page]);
    if (typeof $$props.onPageReinit === 'function') $$props.onPageReinit(page);
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
    dispatch('pageBeforeIn', [page]);
    if (typeof $$props.onPageBeforeIn === 'function') $$props.onPageBeforeIn(page);
  }
  function onPageBeforeOut(page) {
    if (el !== page.el) return;
    dispatch('pageBeforeOut', [page]);
    if (typeof $$props.onPageBeforeOut === 'function') $$props.onPageBeforeOut(page);
  }
  function onPageAfterOut(page) {
    if (el !== page.el) return;
    if (page.to === 'next') {
      routerPositionClass = 'page-next';
    }
    if (page.to === 'previous') {
      routerPositionClass = 'page-previous';
    }
    dispatch('pageAfterOut', [page]);
    if (typeof $$props.onPageAfterOut === 'function') $$props.onPageAfterOut(page);
  }
  function onPageAfterIn(page) {
    if (el !== page.el) return;
    routerPositionClass = 'page-current';
    dispatch('pageAfterIn', [page]);
    if (typeof $$props.onPageAfterIn === 'function') $$props.onPageAfterIn(page);
  }
  function onPageBeforeRemove(page) {
    if (el !== page.el) return;
    if (page.$navbarEl && page.$navbarEl[0] && page.$navbarEl.parent()[0] && page.$navbarEl.parent()[0] !== el) {
      page.$el.prepend(page.$navbarEl);
    }
    dispatch('pageBeforeRemove', [page]);
    if (typeof $$props.onPageBeforeRemove === 'function') $$props.onPageBeforeRemove(page);
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
      if (el) {
        const dom7 = f7.instance.$;
        const fixedEls = dom7(el).children('.page-content').children('[data-f7-slot="fixed"]');
        if (fixedEls.length) {
          for (let i = fixedEls.length - 1; i >= 0; i -= 1) {
            dom7(el).prepend(fixedEls[i]);
          }
        }
      }
      mountPage();
    });
  });
  afterUpdate(() => {
    if (el && f7.instance) {
      const dom7 = f7.instance.$;
      const fixedEls = dom7(el).children('.page-content').children('[data-f7-slot="fixed"]');
      if (fixedEls.length) {
        for (let i = fixedEls.length - 1; i >= 0; i -= 1) {
          dom7(el).prepend(fixedEls[i]);
        }
      }
    }
  });
  onDestroy(() => {
    if (!f7.instance) return;
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
    onPtrPullStart={onPtrPullStart}
    onPtrPullMove={onPtrPullMove}
    onPtrPullEnd={onPtrPullEnd}
    onPtrRefresh={onPtrRefresh}
    onPtrDone={onPtrDone}
    onInfinite={onInfinite}
  >
    <slot name="static"></slot>
    <slot></slot>
  </PageContent>
  {:else}
  <slot name="static"></slot>
  <slot></slot>
  {/if}
</div>


