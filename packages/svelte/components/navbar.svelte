<script>
  import { createEventDispatcher, onMount, onDestroy, afterUpdate } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import { theme } from '../utils/plugin';
  import f7 from '../utils/f7';
  import hasSlots from '../utils/has-slots';

  import NavLeft from './nav-left.svelte';
  import NavTitle from './nav-title.svelte';
  import NavRight from './nav-right.svelte';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

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
  export let titleLarge = undefined;

  export let f7Slot = 'fixed';

  let el;
  // eslint-disable-next-line
  let _theme = f7.instance ? theme : null;
  let routerPositionClass = '';
  let largeCollapsed = false;
  let routerNavbarRole = null;
  let routerNavbarRoleDetailRoot = false;
  let routerNavbarMasterStack = false;

  export function hide(animate) {
    f7.navbar.hide(el, animate);
  }
  export function show(animate) {
    f7.navbar.show(el, animate);
  }
  export function size() {
    f7.navbar.size(el);
  }

  if (!f7.instance) {
    f7.ready(() => {
      _theme = theme;
    });
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

  $: addLeftTitleClass = _theme && _theme.ios && f7.instance && !f7.instance.params.navbar.iosCenterTitle;
  $: addCenterTitleClass = (_theme && _theme.md && f7.instance && f7.instance.params.navbar.mdCenterTitle)
    || (_theme && _theme.aurora && f7.instance && f7.instance.params.navbar.auroraCenterTitle);

  $: classes = Utils.classNames(
    className,
    'navbar',
    routerPositionClass,
    {
      'navbar-hidden': hidden,
      'navbar-large': large,
      'navbar-large-transparent': largeTransparent,
      'navbar-large-collapsed': large && largeCollapsed,
      'navbar-master': routerNavbarRole === 'master',
      'navbar-master-detail': routerNavbarRole === 'detail',
      'navbar-master-detail-root': routerNavbarRoleDetailRoot === true,
      'navbar-master-stacked': routerNavbarMasterStack === true,
      'no-shadow': noShadow,
      'no-hairline': noHairline,
    },
    Mixins.colorClasses($$props),
  );

  $: innerClasses = Utils.classNames(
    'navbar-inner',
    innerClass,
    innerClassName,
    {
      sliding,
      'navbar-inner-left-title': addLeftTitleClass,
      'navbar-inner-centered-title': addCenterTitleClass,
    }
  );

  function onHide(navbarEl) {
    if (el !== navbarEl) return;
    dispatch('navbarHide');
    if (typeof $$props.onNavbarHide === 'function') $$props.onNavbarHide();
  }
  function onShow(navbarEl) {
    if (el !== navbarEl) return;
    dispatch('navbarShow');
    if (typeof $$props.onNavbarShow === 'function') $$props.onNavbarShow();
  }
  function onExpand(navbarEl) {
    if (el !== navbarEl) return;
    largeCollapsed = false;
    dispatch('navbarExpand');
    if (typeof $$props.onNavbarExpand === 'function') $$props.onNavbarExpand();
  }
  function onCollapse(navbarEl) {
    if (el !== navbarEl) return;
    largeCollapsed = true;
    dispatch('navbarCollapse');
    if (typeof $$props.onNavbarCollapse === 'function') $$props.onNavbarCollapse();
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
    dispatch('clickBack');
    if (typeof $$props.onClickBack === 'function') $$props.onClickBack();
  }

  function mountNavbar() {
    f7.instance.on('navbarShow', onShow);
    f7.instance.on('navbarHide', onHide);
    f7.instance.on('navbarCollapse', onCollapse);
    f7.instance.on('navbarExpand', onExpand);
    f7.instance.on('navbarPosition', onNavbarPosition);
    f7.instance.on('navbarRole', onNavbarRole);
    f7.instance.on('navbarMasterStack', onNavbarMasterStack);
    f7.instance.on('navbarMasterUnstack', onNavbarMasterUnstack);
  }
  function destroyNavbar() {
    f7.instance.off('navbarShow', onShow);
    f7.instance.off('navbarHide', onHide);
    f7.instance.off('navbarCollapse', onCollapse);
    f7.instance.off('navbarExpand', onExpand);
    f7.instance.off('navbarPosition', onNavbarPosition);
    f7.instance.off('navbarRole', onNavbarRole);
    f7.instance.off('navbarMasterStack', onNavbarMasterStack);
    f7.instance.off('navbarMasterUnstack', onNavbarMasterUnstack);
  }

  onMount(() => {
    f7.ready(() => {
      mountNavbar();
    });
  });
  afterUpdate(() => {
    if (!f7.instance) return;
    f7.instance.navbar.size(el);
  });
  onDestroy(() => {
    if (!f7.instance) return;
    destroyNavbar();
  });
</script>
<div
  id={id}
  style={style}
  class={classes}
  bind:this={el}
  data-f7-slot={f7Slot}
>
  <div class="navbar-bg"></div>
  <slot name="before-inner"></slot>
  <div class={innerClasses}>
    {#if backLink || hasLeftSlots}
      <NavLeft
        backLink={backLink}
        backLinkUrl={backLinkUrl}
        backLinkForce={backLinkForce}
        backLinkShowText={backLinkShowText}
        onBackClick={onBackClick}
      >
        <slot name="nav-left" />
        <slot name="left" />
      </NavLeft>
    {/if}
    {#if title || subtitle || hasTitleSlots}
      <NavTitle
        title={title}
        subtitle={subtitle}
      >
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
          {Utils.text(largeTitle)}
          <slot name="title-large" />
        </div>
      </div>
    {/if}
    <slot />
  </div>
  <slot name="after-inner"></slot>
</div>
