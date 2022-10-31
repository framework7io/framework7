<script>
  import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
  import { restProps } from '../shared/rest-props.js';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, createEmitter } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';

  import PageContent from './page-content.svelte';

  const emit = createEmitter(createEventDispatcher, $$props);

  // Props
  export let name = undefined;
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
  afterUpdate(() => {
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
      {onInfinite}
    >
      <slot name="static" />
      <slot />
    </PageContent>
  {:else}
    <slot name="static" />
    <slot />
  {/if}
</div>
