<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';

  import PageContent from './page-content.svelte';

  let {
    class: className,
    name = undefined,
    withSubnavbar = undefined,
    subnavbar = undefined,
    withNavbarLarge = undefined,
    navbarLarge = undefined,
    noNavbar = undefined,
    noToolbar = undefined,
    tabs = undefined,
    pageContent = true,
    noSwipeback = undefined,
    ptr = undefined,
    ptrDistance = undefined,
    ptrPreloader = true,
    ptrBottom = undefined,
    ptrMousewheel = undefined,
    infinite = undefined,
    infiniteTop = undefined,
    infiniteDistance = undefined,
    infinitePreloader = true,
    hideBarsOnScroll = undefined,
    hideNavbarOnScroll = undefined,
    hideToolbarOnScroll = undefined,
    messagesContent = undefined,
    loginScreen = undefined,
    children,
    fixedContent,
    staticContent,
    ...restProps
  } = $props();

  // State
  let el;
  let hasSubnavbar = false;
  let hasNavbarLarge = false;
  let hasNavbarLargeCollapsed = false;
  let hasCardExpandableOpened = false;
  let routerPositionClass = '';
  let routerPageRole = null;
  let routerPageRoleDetailRoot = false;
  let routerPageMasterStack = false;

  const forceSubnavbar = $derived(
    typeof subnavbar === 'undefined' && typeof withSubnavbar === 'undefined' ? hasSubnavbar : false,
  );

  const forceNavbarLarge = $derived(
    typeof navbarLarge === 'undefined' && typeof withNavbarLarge === 'undefined'
      ? hasNavbarLarge
      : false,
  );

  const classes = $derived(
    classNames(
      className,
      'page',
      routerPositionClass,
      {
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
      colorClasses(restProps),
    ),
  );

  // Handlers
  function onPtrPullStart() {
    restProps.onPtrPullStart?.();
    restProps.onptrpullstart?.();
  }
  function onPtrPullMove() {
    restProps.onPtrPullMove?.();
    restProps.onptrpullmove?.();
  }
  function onPtrPullEnd() {
    restProps.onPtrPullEnd?.();
    restProps.onptrpullend?.();
  }
  function onPtrRefresh(done) {
    restProps.onPtrRefresh?.(done);
    restProps.onptrrefresh?.(done);
  }
  function onPtrDone() {
    restProps.onPtrDone?.();
    restProps.onptrdone?.();
  }
  function onInfinite() {
    restProps.onInfinite?.();
    restProps.oninfinite?.();
  }
  // Main Page Events
  function onPageMounted(page) {
    if (el !== page.el) return;
    restProps.onPageMounted?.(page);
    restProps.onpagemounted?.(page);
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

    restProps.onPageInit?.(page);
    restProps.onpageinit?.(page);
  }
  function onPageReinit(page) {
    if (el !== page.el) return;
    restProps.onPageReinit?.(page);
    restProps.onpagereinit?.(page);
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
    restProps.onPageBeforeIn?.(page);
    restProps.onpagebeforein?.(page);
  }
  function onPageBeforeOut(page) {
    if (el !== page.el) return;
    restProps.onPageBeforeOut?.(page);
    restProps.onpagebeforeout?.(page);
  }
  function onPageAfterOut(page) {
    if (el !== page.el) return;
    if (page.to === 'next') {
      routerPositionClass = 'page-next';
    }
    if (page.to === 'previous') {
      routerPositionClass = 'page-previous';
    }
    restProps.onPageAfterOut?.(page);
    restProps.onpageafterout?.(page);
  }
  function onPageAfterIn(page) {
    if (el !== page.el) return;
    routerPositionClass = 'page-current';
    restProps.onPageAfterIn?.(page);
    restProps.onpageafterin?.(page);
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
    restProps.onPageBeforeRemove?.(page);
    restProps.onpagebeforeremove?.(page);
  }
  function onPageBeforeUnmount(page) {
    if (el !== page.el) return;
    restProps.onPageBeforeUnmount?.(page);
    restProps.onpagebeforeunmount?.(page);
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
    restProps.onPageTabShow?.();
    restProps.ontabshow?.();
  }
  function onPageTabHide(pageEl) {
    if (el !== pageEl) return;
    restProps.onPageTabHide?.();
    restProps.ontabhide?.();
  }

  // Mount/destroy
  function mountPage() {
    app.f7.on('pageMounted', onPageMounted);
    app.f7.on('pageInit', onPageInit);
    app.f7.on('pageReinit', onPageReinit);
    app.f7.on('pageBeforeIn', onPageBeforeIn);
    app.f7.on('pageBeforeOut', onPageBeforeOut);
    app.f7.on('pageAfterOut', onPageAfterOut);
    app.f7.on('pageAfterIn', onPageAfterIn);
    app.f7.on('pageBeforeRemove', onPageBeforeRemove);
    app.f7.on('pageBeforeUnmount', onPageBeforeUnmount);
    app.f7.on('pagePosition', onPagePosition);
    app.f7.on('pageRole', onPageRole);
    app.f7.on('pageMasterStack', onPageMasterStack);
    app.f7.on('pageMasterUnstack', onPageMasterUnstack);
    app.f7.on('pageNavbarLargeCollapsed', onPageNavbarLargeCollapsed);
    app.f7.on('pageNavbarLargeExpanded', onPageNavbarLargeExpanded);
    app.f7.on('cardOpened', onCardOpened);
    app.f7.on('cardClose', onCardClose);
    app.f7.on('pageTabShow', onPageTabShow);
    app.f7.on('pageTabHide', onPageTabHide);
  }
  function destroyPage() {
    app.f7.off('pageMounted', onPageMounted);
    app.f7.off('pageInit', onPageInit);
    app.f7.off('pageReinit', onPageReinit);
    app.f7.off('pageBeforeIn', onPageBeforeIn);
    app.f7.off('pageBeforeOut', onPageBeforeOut);
    app.f7.off('pageAfterOut', onPageAfterOut);
    app.f7.off('pageAfterIn', onPageAfterIn);
    app.f7.off('pageBeforeRemove', onPageBeforeRemove);
    app.f7.off('pageBeforeUnmount', onPageBeforeUnmount);
    app.f7.off('pagePosition', onPagePosition);
    app.f7.off('pageRole', onPageRole);
    app.f7.off('pageMasterStack', onPageMasterStack);
    app.f7.off('pageMasterUnstack', onPageMasterUnstack);
    app.f7.off('pageNavbarLargeCollapsed', onPageNavbarLargeCollapsed);
    app.f7.off('pageNavbarLargeExpanded', onPageNavbarLargeExpanded);
    app.f7.off('cardOpened', onCardOpened);
    app.f7.off('cardClose', onCardClose);
    app.f7.off('pageTabShow', onPageTabShow);
    app.f7.off('pageTabHide', onPageTabHide);
  }

  onMount(() => {
    f7ready(() => {
      if (el) {
        const dom7 = app.f7.$;
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
  $effect(() => {
    if (el && app.f7) {
      const dom7 = app.f7.$;
      const fixedEls = dom7(el).children('.page-content').children('[data-f7-slot="fixed"]');
      if (fixedEls.length) {
        for (let i = fixedEls.length - 1; i >= 0; i -= 1) {
          dom7(el).prepend(fixedEls[i]);
        }
      }
    }
  });
  onDestroy(() => {
    if (!app.f7) return;
    destroyPage();
  });
</script>

<div bind:this={el} class={classes} data-name={name} {...restProps}>
  {@render fixedContent?.()}
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
      {onInfinite}
    >
      {@render staticContent?.()}
      {@render children?.()}
    </PageContent>
  {:else}
    {@render staticContent?.()}
    {@render children?.()}
  {/if}
</div>
