<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { f7ready, app } from '../shared/f7.js';
  import { useTheme } from '../shared/use-theme.js';

  import NavLeft from './nav-left.svelte';
  import NavTitle from './nav-title.svelte';
  import NavRight from './nav-right.svelte';

  let {
    class: className,
    backLink = undefined,
    backLinkUrl = undefined,
    backLinkForce = false,
    backLinkShowText = undefined,
    title = undefined,
    subtitle = undefined,
    hidden = false,
    outline = true,
    innerClass = undefined,
    innerClassName = undefined,
    large = false,
    largeTransparent = false,
    transparent = false,
    titleLarge = undefined,
    f7Slot = 'fixed',
    children,
    navLeft = undefined,
    left = undefined,
    navRight = undefined,
    right = undefined,
    beforeInner = undefined,
    afterInner = undefined,
    ...restProps
  } = $props();

  let el = $state(null);
  let theme = useTheme((t) => {
    theme = t;
  });
  let routerPositionClass = $state('');
  let largeCollapsed = $state(false);
  let transparentVisible = $state(false);

  export function hide(animate) {
    app.f7.navbar.hide(el, animate);
  }
  export function show(animate) {
    app.f7.navbar.show(el, animate);
  }
  export function size() {
    app.f7.navbar.size(el);
  }

  const hasLeftSlots = $derived(navLeft || left);
  const hasRightSlots = $derived(navRight || right);
  const hasTitleSlots = $derived(title);

  const largeTitle = $derived(titleLarge || (large && title));
  const hasTitleLargeSlots = $derived(titleLarge);

  const addLeftTitleClass = $derived(
    theme && theme.ios && app.f7 && !app.f7.params.navbar.iosCenterTitle,
  );
  const addCenterTitleClass = $derived(
    theme && theme.md && app.f7 && app.f7.params.navbar.mdCenterTitle,
  );

  const isLarge = $derived(large || largeTransparent);
  const isTransparent = $derived(transparent || (isLarge && largeTransparent));
  const isTransparentVisible = $derived(isTransparent && transparentVisible);

  const classes = $derived(
    classNames(
      className,
      'navbar',
      routerPositionClass,
      {
        'navbar-hidden': hidden,
        'navbar-large': isLarge,
        'navbar-large-collapsed': isLarge && largeCollapsed,
        'navbar-transparent': isTransparent,
        'navbar-transparent-visible': isTransparentVisible,
        'no-outline': !outline,
      },
      colorClasses(restProps),
    ),
  );

  const innerClasses = $derived(
    classNames('navbar-inner', innerClass, innerClassName, {
      'navbar-inner-left-title': addLeftTitleClass,
      'navbar-inner-centered-title': addCenterTitleClass,
    }),
  );

  function onHide(navbarEl) {
    if (el !== navbarEl) return;
    restProps.onNavbarHide?.();
    restProps.onnavbarhide?.();
  }
  function onShow(navbarEl) {
    if (el !== navbarEl) return;
    restProps.onNavbarShow?.();
    restProps.onnavbarshow?.();
  }
  function onNavbarTransparentShow(navbarEl) {
    if (el !== navbarEl) return;
    transparentVisible = true;
    restProps.onNavbarTransparentShow?.();
    restProps.onnavbartransparentshow?.();
  }
  function onNavbarTransparentHide(navbarEl) {
    if (el !== navbarEl) return;
    transparentVisible = false;
    restProps.onNavbarTransparentHide?.();
    restProps.onnavbartransparenthide?.();
  }
  function onExpand(navbarEl) {
    if (el !== navbarEl) return;
    largeCollapsed = false;
    restProps.onNavbarExpand?.();
    restProps.onnavbarexpand?.();
  }
  function onCollapse(navbarEl) {
    if (el !== navbarEl) return;
    largeCollapsed = true;
    restProps.onNavbarCollapse?.();
    restProps.onnavbarcollapse?.();
  }
  function onNavbarPosition(navbarEl, position) {
    if (el !== navbarEl) return;
    routerPositionClass = position ? `navbar-${position}` : position;
  }

  function onBackClick() {
    restProps.onClickBack?.();
    restProps.onclickback?.();
  }

  function mountNavbar() {
    app.f7.on('navbarShow', onShow);
    app.f7.on('navbarHide', onHide);
    app.f7.on('navbarCollapse', onCollapse);
    app.f7.on('navbarExpand', onExpand);
    app.f7.on('navbarPosition', onNavbarPosition);
    app.f7.on('navbarTransparentShow', onNavbarTransparentShow);
    app.f7.on('navbarTransparentHide', onNavbarTransparentHide);
  }
  function destroyNavbar() {
    app.f7.off('navbarShow', onShow);
    app.f7.off('navbarHide', onHide);
    app.f7.off('navbarCollapse', onCollapse);
    app.f7.off('navbarExpand', onExpand);
    app.f7.off('navbarPosition', onNavbarPosition);
    app.f7.off('navbarTransparentShow', onNavbarTransparentShow);
    app.f7.off('navbarTransparentHide', onNavbarTransparentHide);
  }

  onMount(() => {
    f7ready(() => {
      mountNavbar();
    });
  });
  $effect(() => {
    if (!app.f7) return;
    app.f7.navbar.size(el);
  });
  onDestroy(() => {
    if (!app.f7) return;
    destroyNavbar();
  });
</script>

<div class={classes} bind:this={el} data-f7-slot={f7Slot} {...restProps}>
  <div class="navbar-bg"></div>
  {@render beforeInner?.()}
  <div class={innerClasses}>
    {#if backLink || hasLeftSlots}
      <NavLeft {backLink} {backLinkUrl} {backLinkForce} {backLinkShowText} {onBackClick}>
        {@render navLeft?.()}
        {@render left?.()}
      </NavLeft>
    {/if}
    {#if title || subtitle || hasTitleSlots}
      <NavTitle {title} {subtitle} />
    {/if}
    {#if hasRightSlots}
      <NavRight>
        {@render navRight?.()}
        {@render right?.()}
      </NavRight>
    {/if}
    {#if largeTitle || hasTitleLargeSlots}
      <div class="title-large">
        <div class="title-large-text">
          {#if typeof largeTitle === 'function'}
            {@render largeTitle?.()}
          {:else}
            {largeTitle}
          {/if}
        </div>
      </div>
    {/if}
    {@render children?.()}
  </div>
  {@render afterInner?.()}
</div>
