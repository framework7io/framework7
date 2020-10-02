<script>
  import { createEventDispatcher, onMount, onDestroy, afterUpdate } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames, plainText, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7, f7ready } from '../shared/f7';
  import { hasSlots } from '../shared/has-slots';
  import { useTheme } from '../shared/use-theme';

  import NavLeft from './nav-left';
  import NavTitle from './nav-title';
  import NavRight from './nav-right';

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
  export let noShadow = false;
  export let noHairline = false;
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
    f7.navbar.hide(el, animate);
  }
  export function show(animate) {
    f7.navbar.show(el, animate);
  }
  export function size() {
    f7.navbar.size(el);
  }

  // eslint-disable-next-line
  $: hasLeftSlots = hasSlots(arguments, 'nav-left') || hasSlots(arguments, 'left');
  // eslint-disable-next-line
  $: hasRightSlots = hasSlots(arguments, 'nav-right') || hasSlots(arguments, 'right');
  // eslint-disable-next-line
  $: hasTitleSlots = hasSlots(arguments, 'title');

  $: largeTitle = titleLarge || (large && title);
  // eslint-disable-next-line
  $: hasTitleLargeSlots = hasSlots(arguments, 'title-large');

  $: addLeftTitleClass = theme && theme.ios && f7 && !f7.params.navbar.iosCenterTitle;
  $: addCenterTitleClass =
    (theme && theme.md && f7 && f7.params.navbar.mdCenterTitle) ||
    (theme && theme.aurora && f7 && f7.params.navbar.auroraCenterTitle);

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
      'no-shadow': noShadow,
      'no-hairline': noHairline,
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
    f7.on('navbarShow', onShow);
    f7.on('navbarHide', onHide);
    f7.on('navbarCollapse', onCollapse);
    f7.on('navbarExpand', onExpand);
    f7.on('navbarPosition', onNavbarPosition);
    f7.on('navbarRole', onNavbarRole);
    f7.on('navbarMasterStack', onNavbarMasterStack);
    f7.on('navbarMasterUnstack', onNavbarMasterUnstack);
    f7.on('navbarTransparentShow', onNavbarTransparentShow);
    f7.on('navbarTransparentHide', onNavbarTransparentHide);
  }
  function destroyNavbar() {
    f7.off('navbarShow', onShow);
    f7.off('navbarHide', onHide);
    f7.off('navbarCollapse', onCollapse);
    f7.off('navbarExpand', onExpand);
    f7.off('navbarPosition', onNavbarPosition);
    f7.off('navbarRole', onNavbarRole);
    f7.off('navbarMasterStack', onNavbarMasterStack);
    f7.off('navbarMasterUnstack', onNavbarMasterUnstack);
    f7.off('navbarTransparentShow', onNavbarTransparentShow);
    f7.off('navbarTransparentHide', onNavbarTransparentHide);
  }

  onMount(() => {
    f7ready(() => {
      mountNavbar();
    });
  });
  afterUpdate(() => {
    if (!f7) return;
    f7.navbar.size(el);
  });
  onDestroy(() => {
    if (!f7) return;
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
