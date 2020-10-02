<script>
  import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
  import { restProps } from '../shared/rest-props';
  import { colorClasses } from '../shared/mixins';
  import { classNames, createEmitter } from '../shared/utils';
  import { f7, f7ready } from '../shared/f7';

  import PageContent from './page-content';

  const emit = createEmitter(createEventDispatcher, $$props);

  // Props
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

  $: forceSubnavbar =
    typeof subnavbar === 'undefined' && typeof withSubnavbar === 'undefined' ? hasSubnavbar : false;

  $: forceNavbarLarge =
    typeof navbarLarge === 'undefined' && typeof withNavbarLarge === 'undefined'
      ? hasNavbarLarge
      : false;

  $: classes = classNames(
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
    colorClasses($$props),
  );

  // Handlers
  function onPtrPullStart() {
    emit('ptrPullStart');
  }
  function onPtrPullMove() {
    emit('ptrPullMove');
  }
  function onPtrPullEnd() {
    emit('ptrPullEnd');
  }
  function onPtrRefresh(done) {
    emit('ptrRefresh', [done]);
  }
  function onPtrDone() {
    emit('ptrDone');
  }
  function onInfinite() {
    emit('infinite');
  }
  // Main Page Events
  function onPageMounted(page) {
    if (el !== page.el) return;
    emit('pageMounted', [page]);
  }
  function onPageInit(page) {
    if (el !== page.el) return;
    if (typeof withSubnavbar === 'undefined' && typeof subnavbar === 'undefined') {
      if (
        (page.$navbarEl && page.$navbarEl.length && page.$navbarEl.find('.subnavbar').length) ||
        page.$el.children('.navbar').find('.subnavbar').length
      ) {
        hasSubnavbar = true;
      }
    }

    if (typeof withNavbarLarge === 'undefined' && typeof navbarLarge === 'undefined') {
      if (
        (page.$navbarEl && page.$navbarEl.hasClass('navbar-large')) ||
        page.$el.children('.navbar-large').length
      ) {
        hasNavbarLarge = true;
      }
    }

    emit('pageInit', [page]);
  }
  function onPageReinit(page) {
    if (el !== page.el) return;
    emit('pageReinit', [page]);
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
    emit('pageBeforeIn', [page]);
  }
  function onPageBeforeOut(page) {
    if (el !== page.el) return;
    emit('pageBeforeOut', [page]);
  }
  function onPageAfterOut(page) {
    if (el !== page.el) return;
    if (page.to === 'next') {
      routerPositionClass = 'page-next';
    }
    if (page.to === 'previous') {
      routerPositionClass = 'page-previous';
    }
    emit('pageAfterOut', [page]);
  }
  function onPageAfterIn(page) {
    if (el !== page.el) return;
    routerPositionClass = 'page-current';
    emit('pageAfterIn', [page]);
  }
  function onPageBeforeRemove(page) {
    if (el !== page.el) return;
    if (
      page.$navbarEl &&
      page.$navbarEl[0] &&
      page.$navbarEl.parent()[0] &&
      page.$navbarEl.parent()[0] !== el
    ) {
      page.$el.prepend(page.$navbarEl);
    }
    emit('pageBeforeRemove', [page]);
  }
  function onPageBeforeUnmount(page) {
    if (el !== page.el) return;
    emit('pageBeforeUnmount', [page]);
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

  function onPageTabShow(pageEl) {
    if (el !== pageEl) return;
    emit('pageTabShow');
  }
  function onPageTabHide(pageEl) {
    if (el !== pageEl) return;
    emit('pageTabHide');
  }

  // Mount/destroy
  function mountPage() {
    f7.on('pageMounted', onPageMounted);
    f7.on('pageInit', onPageInit);
    f7.on('pageReinit', onPageReinit);
    f7.on('pageBeforeIn', onPageBeforeIn);
    f7.on('pageBeforeOut', onPageBeforeOut);
    f7.on('pageAfterOut', onPageAfterOut);
    f7.on('pageAfterIn', onPageAfterIn);
    f7.on('pageBeforeRemove', onPageBeforeRemove);
    f7.on('pageBeforeUnmount', onPageBeforeUnmount);
    f7.on('pageStack', onPageStack);
    f7.on('pageUnstack', onPageUnstack);
    f7.on('pagePosition', onPagePosition);
    f7.on('pageRole', onPageRole);
    f7.on('pageMasterStack', onPageMasterStack);
    f7.on('pageMasterUnstack', onPageMasterUnstack);
    f7.on('pageNavbarLargeCollapsed', onPageNavbarLargeCollapsed);
    f7.on('pageNavbarLargeExpanded', onPageNavbarLargeExpanded);
    f7.on('cardOpened', onCardOpened);
    f7.on('cardClose', onCardClose);
    f7.on('pageTabShow', onPageTabShow);
    f7.on('pageTabHide', onPageTabHide);
  }
  function destroyPage() {
    f7.off('pageMounted', onPageMounted);
    f7.off('pageInit', onPageInit);
    f7.off('pageReinit', onPageReinit);
    f7.off('pageBeforeIn', onPageBeforeIn);
    f7.off('pageBeforeOut', onPageBeforeOut);
    f7.off('pageAfterOut', onPageAfterOut);
    f7.off('pageAfterIn', onPageAfterIn);
    f7.off('pageBeforeRemove', onPageBeforeRemove);
    f7.off('pageBeforeUnmount', onPageBeforeUnmount);
    f7.off('pageStack', onPageStack);
    f7.off('pageUnstack', onPageUnstack);
    f7.off('pagePosition', onPagePosition);
    f7.off('pageRole', onPageRole);
    f7.off('pageMasterStack', onPageMasterStack);
    f7.off('pageMasterUnstack', onPageMasterUnstack);
    f7.off('pageNavbarLargeCollapsed', onPageNavbarLargeCollapsed);
    f7.off('pageNavbarLargeExpanded', onPageNavbarLargeExpanded);
    f7.off('cardOpened', onCardOpened);
    f7.off('cardClose', onCardClose);
    f7.off('pageTabShow', onPageTabShow);
    f7.off('pageTabHide', onPageTabHide);
  }

  onMount(() => {
    f7ready(() => {
      if (el) {
        const dom7 = f7.$;
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
    if (el && f7) {
      const dom7 = f7.$;
      const fixedEls = dom7(el).children('.page-content').children('[data-f7-slot="fixed"]');
      if (fixedEls.length) {
        for (let i = fixedEls.length - 1; i >= 0; i -= 1) {
          dom7(el).prepend(fixedEls[i]);
        }
      }
    }
  });
  onDestroy(() => {
    if (!f7) return;
    destroyPage();
  });
</script>

<div bind:this={el} class={classes} data-name={name} {...restProps($$restProps)}>
  <slot name="fixed" />
  {#if pageContent}
    <PageContent
      {ptr}
      {ptrDistance}
      {ptrPreloader}
      {ptrBottom}
      {ptrMousewheel}
      {infinite}
      {infiniteTop}
      {infiniteDistance}
      {infinitePreloader}
      {hideBarsOnScroll}
      {hideNavbarOnScroll}
      {hideToolbarOnScroll}
      {messagesContent}
      {loginScreen}
      {onPtrPullStart}
      {onPtrPullMove}
      {onPtrPullEnd}
      {onPtrRefresh}
      {onPtrDone}
      {onInfinite}>
      <slot name="static" />
      <slot />
    </PageContent>
  {:else}
    <slot name="static" />
    <slot />
  {/if}
</div>
