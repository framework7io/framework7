<script>
  import { createEventDispatcher, onMount, onDestroy, afterUpdate } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, plainText, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { f7ready, app } from '../shared/f7.js';
  import { useTheme } from '../shared/use-theme.js';

  import NavLeft from './nav-left.svelte';
  import NavTitle from './nav-title.svelte';
  import NavRight from './nav-right.svelte';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let backLink = undefined;
  export let backLinkUrl = undefined;
  export let backLinkForce = false;
  export let backLinkShowText = undefined;
  export let sliding = true;
  export let title = undefined;
  export let subtitle = undefined;
  export let hidden = false;
  export let outline = true;
  export let innerClass = undefined;
  export let innerClassName = undefined;
  export let large = false;
  export let largeTransparent = false;
  export let transparent = false;
  export let titleLarge = undefined;

  export let f7Slot = 'fixed';

  let el;
  let theme = useTheme((t) => {
    theme = t;
  });
  let routerPositionClass = '';
  let largeCollapsed = false;
  let routerNavbarRole = null;
  let routerNavbarRoleDetailRoot = false;
  let routerNavbarMasterStack = false;
  let transparentVisible = false;

  export function hide(animate) {
    app.f7.navbar.hide(el, animate);
  }
  export function show(animate) {
    app.f7.navbar.show(el, animate);
  }
  export function size() {
    app.f7.navbar.size(el);
  }

  // eslint-disable-next-line
  $: hasLeftSlots = $$slots['nav-left'] || $$slots['left'];
  // eslint-disable-next-line
  $: hasRightSlots = $$slots['nav-right'] || $$slots['right'];
  // eslint-disable-next-line
  $: hasTitleSlots = $$slots['title'];

  $: largeTitle = titleLarge || (large && title);
  // eslint-disable-next-line
  $: hasTitleLargeSlots = $$slots['title-large'];

  $: addLeftTitleClass = theme && theme.ios && app.f7 && !app.f7.params.navbar.iosCenterTitle;
  $: addCenterTitleClass = theme && theme.md && app.f7 && app.f7.params.navbar.mdCenterTitle;

  $: isLarge = large || largeTransparent;
  $: isTransparent = transparent || (isLarge && largeTransparent);
  $: isTransparentVisible = isTransparent && transparentVisible;

  $: classes = classNames(
    className,
    'navbar',
    routerPositionClass,
    {
      'navbar-hidden': hidden,
      'navbar-large': isLarge,
      'navbar-large-collapsed': isLarge && largeCollapsed,
      'navbar-transparent': isTransparent,
      'navbar-transparent-visible': isTransparentVisible,
      'navbar-master': routerNavbarRole === 'master',
      'navbar-master-detail': routerNavbarRole === 'detail',
      'navbar-master-detail-root': routerNavbarRoleDetailRoot === true,
      'navbar-master-stacked': routerNavbarMasterStack === true,
      'no-outline': !outline,
    },
    colorClasses($$props),
  );

  $: innerClasses = classNames('navbar-inner', innerClass, innerClassName, {
    sliding,
    'navbar-inner-left-title': addLeftTitleClass,
    'navbar-inner-centered-title': addCenterTitleClass,
  });

  function onHide(navbarEl) {
    if (el !== navbarEl) return;
    emit('navbarHide');
  }
  function onShow(navbarEl) {
    if (el !== navbarEl) return;
    emit('navbarShow');
  }
  function onNavbarTransparentShow(navbarEl) {
    if (el !== navbarEl) return;
    transparentVisible = true;
    emit('navbarTransparentShow');
  }
  function onNavbarTransparentHide(navbarEl) {
    if (el !== navbarEl) return;
    transparentVisible = false;
    emit('navbarTransparentHide');
  }
  function onExpand(navbarEl) {
    if (el !== navbarEl) return;
    largeCollapsed = false;
    emit('navbarExpand');
  }
  function onCollapse(navbarEl) {
    if (el !== navbarEl) return;
    largeCollapsed = true;
    emit('navbarCollapse');
  }
  function onNavbarPosition(navbarEl, position) {
    if (el !== navbarEl) return;
    routerPositionClass = position ? `navbar-${position}` : position;
  }
  function onNavbarRole(navbarEl, rolesData) {
    if (el !== navbarEl) return;
    routerNavbarRole = rolesData.role;
    routerNavbarRoleDetailRoot = rolesData.detailRoot;
  }
  function onNavbarMasterStack(navbarEl) {
    if (el !== navbarEl) return;
    routerNavbarMasterStack = true;
  }
  function onNavbarMasterUnstack(navbarEl) {
    if (el !== navbarEl) return;
    routerNavbarMasterStack = false;
  }
  function onBackClick() {
    emit('clickBack');
  }

  function mountNavbar() {
    app.f7.on('navbarShow', onShow);
    app.f7.on('navbarHide', onHide);
    app.f7.on('navbarCollapse', onCollapse);
    app.f7.on('navbarExpand', onExpand);
    app.f7.on('navbarPosition', onNavbarPosition);
    app.f7.on('navbarRole', onNavbarRole);
    app.f7.on('navbarMasterStack', onNavbarMasterStack);
    app.f7.on('navbarMasterUnstack', onNavbarMasterUnstack);
    app.f7.on('navbarTransparentShow', onNavbarTransparentShow);
    app.f7.on('navbarTransparentHide', onNavbarTransparentHide);
  }
  function destroyNavbar() {
    app.f7.off('navbarShow', onShow);
    app.f7.off('navbarHide', onHide);
    app.f7.off('navbarCollapse', onCollapse);
    app.f7.off('navbarExpand', onExpand);
    app.f7.off('navbarPosition', onNavbarPosition);
    app.f7.off('navbarRole', onNavbarRole);
    app.f7.off('navbarMasterStack', onNavbarMasterStack);
    app.f7.off('navbarMasterUnstack', onNavbarMasterUnstack);
    app.f7.off('navbarTransparentShow', onNavbarTransparentShow);
    app.f7.off('navbarTransparentHide', onNavbarTransparentHide);
  }

  onMount(() => {
    f7ready(() => {
      mountNavbar();
    });
  });
  afterUpdate(() => {
    if (!app.f7) return;
    app.f7.navbar.size(el);
  });
  onDestroy(() => {
    if (!app.f7) return;
    destroyNavbar();
  });
</script>

<div class={classes} bind:this={el} data-f7-slot={f7Slot} {...restProps($$restProps)}>
  <div class="navbar-bg" />
  <slot name="before-inner" />
  <div class={innerClasses}>
    {#if backLink || hasLeftSlots}
      <NavLeft {backLink} {backLinkUrl} {backLinkForce} {backLinkShowText} {onBackClick}>
        <slot name="nav-left" />
        <slot name="left" />
      </NavLeft>
    {/if}
    {#if title || subtitle || hasTitleSlots}
      <NavTitle {title} {subtitle}>
        <slot name="title" />
      </NavTitle>
    {/if}
    {#if hasRightSlots}
      <NavRight>
        <slot name="nav-right" />
        <slot name="right" />
      </NavRight>
    {/if}
    {#if largeTitle || hasTitleLargeSlots}
      <div class="title-large">
        <div class="title-large-text">
          {plainText(largeTitle)}
          <slot name="title-large" />
        </div>
      </div>
    {/if}
    <slot />
  </div>
  <slot name="after-inner" />
</div>
