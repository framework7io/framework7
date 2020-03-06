import $ from 'dom7';
import History from '../../utils/history';
import Support from '../../utils/support';
import Device from '../../utils/device';
import Utils from '../../utils/utils';

function SwipeBack(r) {
  const router = r;
  const { $el, $navbarsEl, app, params } = router;
  let isTouched = false;
  let isMoved = false;
  const touchesStart = {};
  let isScrolling;
  let $currentPageEl = [];
  let $previousPageEl = [];
  let viewContainerWidth;
  let touchesDiff;
  let allowViewTouchMove = true;
  let touchStartTime;
  let $currentNavbarEl = [];
  let $previousNavbarEl = [];
  let dynamicNavbar;
  let $pageShadowEl;
  let $pageOpacityEl;

  let animatableNavEls;

  const paramsSwipeBackAnimateShadow = params[`${app.theme}SwipeBackAnimateShadow`];
  const paramsSwipeBackAnimateOpacity = params[`${app.theme}SwipeBackAnimateOpacity`];
  const paramsSwipeBackActiveArea = params[`${app.theme}SwipeBackActiveArea`];
  const paramsSwipeBackThreshold = params[`${app.theme}SwipeBackThreshold`];

  const transformOrigin = app.rtl ? 'right center' : 'left center';
  const transformOriginTitleLarge = app.rtl
    ? 'calc(100% - var(--f7-navbar-large-title-padding-left) - var(--f7-safe-area-left)) center'
    : 'calc(var(--f7-navbar-large-title-padding-left) + var(--f7-safe-area-left)) center';


  function animatableNavElements() {
    const els = [];
    const inverter = app.rtl ? -1 : 1;
    const currentNavIsTransparent = $currentNavbarEl.hasClass('navbar-transparent') && !$currentNavbarEl.hasClass('navbar-large') && !$currentNavbarEl.hasClass('navbar-transparent-visible');
    const currentNavIsLarge = $currentNavbarEl.hasClass('navbar-large');
    const currentNavIsCollapsed = $currentNavbarEl.hasClass('navbar-large-collapsed');
    const currentNavIsLargeTransparent = $currentNavbarEl.hasClass('navbar-large-transparent')
      || (
        $currentNavbarEl.hasClass('navbar-large')
        && $currentNavbarEl.hasClass('navbar-transparent')
      );
    const previousNavIsTransparent = $previousNavbarEl.hasClass('navbar-transparent') && !$previousNavbarEl.hasClass('navbar-large') && !$previousNavbarEl.hasClass('navbar-transparent-visible');
    const previousNavIsLarge = $previousNavbarEl.hasClass('navbar-large');
    const previousNavIsCollapsed = $previousNavbarEl.hasClass('navbar-large-collapsed');
    const previousNavIsLargeTransparent = $previousNavbarEl.hasClass('navbar-large-transparent')
      || (
        $previousNavbarEl.hasClass('navbar-large')
        && $previousNavbarEl.hasClass('navbar-transparent')
      );
    const fromLarge = currentNavIsLarge && !currentNavIsCollapsed;
    const toLarge = previousNavIsLarge && !previousNavIsCollapsed;
    const $currentNavElements = $currentNavbarEl.find('.left, .title, .right, .subnavbar, .fading, .title-large, .navbar-bg');
    const $previousNavElements = $previousNavbarEl.find('.left, .title, .right, .subnavbar, .fading, .title-large, .navbar-bg');
    let activeNavBackIconText;
    let previousNavBackIconText;

    if (params.iosAnimateNavbarBackIcon) {
      if ($currentNavbarEl.hasClass('sliding') || $currentNavbarEl.find('.navbar-inner.sliding').length) {
        activeNavBackIconText = $currentNavbarEl.find('.left').find('.back .icon + span').eq(0);
      } else {
        activeNavBackIconText = $currentNavbarEl.find('.left.sliding').find('.back .icon + span').eq(0);
      }
      if ($previousNavbarEl.hasClass('sliding') || $previousNavbarEl.find('.navbar-inner.sliding').length) {
        previousNavBackIconText = $previousNavbarEl.find('.left').find('.back .icon + span').eq(0);
      } else {
        previousNavBackIconText = $previousNavbarEl.find('.left.sliding').find('.back .icon + span').eq(0);
      }
      if (activeNavBackIconText.length) {
        $previousNavElements.each((index, el) => {
          if (!$(el).hasClass('title')) return;
          el.f7NavbarLeftOffset += activeNavBackIconText.prev('.icon')[0].offsetWidth;
        });
      }
    }
    $currentNavElements
      .each((index, navEl) => {
        const $navEl = $(navEl);
        const isSubnavbar = $navEl.hasClass('subnavbar');
        const isLeft = $navEl.hasClass('left');
        const isTitle = $navEl.hasClass('title');
        const isBg = $navEl.hasClass('navbar-bg');
        if ((isTitle || isBg) && currentNavIsTransparent) return;
        if (!fromLarge && $navEl.hasClass('.title-large')) return;
        const el = {
          el: navEl,
        };
        if (fromLarge) {
          if (isTitle) return;
          if ($navEl.hasClass('title-large')) {
            if (els.indexOf(el) < 0) els.push(el);
            el.overflow = 'visible';
            $navEl.find('.title-large-text').each((subIndex, subNavEl) => {
              els.push({
                el: subNavEl,
                transform: progress => `translateX(${progress * 100 * inverter}%)`,
              });
            });
            return;
          }
        }
        if (toLarge) {
          if (!fromLarge) {
            if ($navEl.hasClass('title-large')) {
              if (els.indexOf(el) < 0) els.push(el);
              el.opacity = 0;
            }
          }
          if (isLeft) {
            if (els.indexOf(el) < 0) els.push(el);
            el.opacity = progress => (1 - (progress ** 0.33));
            $navEl.find('.back span').each((subIndex, subNavEl) => {
              els.push({
                el: subNavEl,
                'transform-origin': transformOrigin,
                transform: progress => `translateX(calc(${progress} * (var(--f7-navbarTitleLargeOffset) - var(--f7-navbarLeftTextOffset)))) translateY(calc(${progress} * (var(--f7-navbar-large-title-height) - var(--f7-navbar-large-title-padding-vertical) / 2))) scale(${1 + (1 * progress)})`,
              });
            });
            return;
          }
        }
        if (isBg) {
          if (els.indexOf(el) < 0) els.push(el);
          if (!fromLarge && !toLarge) {
            if (currentNavIsCollapsed) {
              if (currentNavIsLargeTransparent) {
                el.className = 'ios-swipeback-navbar-bg-large';
              }
              el.transform = progress => `translateX(${100 * progress * inverter}%) translateY(calc(-1 * var(--f7-navbar-large-title-height)))`;
            } else {
              el.transform = progress => `translateX(${100 * progress * inverter}%)`;
            }
          }
          if (!fromLarge && toLarge) {
            el.className = 'ios-swipeback-navbar-bg-large';
            el.transform = progress => `translateX(${100 * progress * inverter}%) translateY(calc(-1 * ${1 - progress} * var(--f7-navbar-large-title-height)))`;
          }
          if (fromLarge && toLarge) {
            el.transform = progress => `translateX(${100 * progress * inverter}%)`;
          }
          if (fromLarge && !toLarge) {
            el.transform = progress => `translateX(${100 * progress * inverter}%) translateY(calc(-${progress} * var(--f7-navbar-large-title-height)))`;
          }
          return;
        }
        if ($navEl.hasClass('title-large')) return;
        const isSliding = $navEl.hasClass('sliding') || $navEl.parents('.navbar-inner.sliding').length;
        if (els.indexOf(el) < 0) els.push(el);
        if (!isSubnavbar || (isSubnavbar && !isSliding)) {
          el.opacity = progress => (1 - (progress ** 0.33));
        }
        if (isSliding) {
          let transformTarget = el;
          if (isLeft && activeNavBackIconText.length && params.iosAnimateNavbarBackIcon) {
            const textEl = { el: activeNavBackIconText[0] };
            transformTarget = textEl;
            els.push(textEl);
          }
          transformTarget.transform = (progress) => {
            let activeNavTranslate = progress * transformTarget.el.f7NavbarRightOffset;
            if (Device.pixelRatio === 1) activeNavTranslate = Math.round(activeNavTranslate);
            if (isSubnavbar && currentNavIsLarge) {
              return `translate3d(${activeNavTranslate}px, calc(-1 * var(--f7-navbar-large-collapse-progress) * var(--f7-navbar-large-title-height)), 0)`;
            }
            return `translate3d(${activeNavTranslate}px,0,0)`;
          };
        }
      });
    $previousNavElements
      .each((index, navEl) => {
        const $navEl = $(navEl);
        const isSubnavbar = $navEl.hasClass('subnavbar');
        const isLeft = $navEl.hasClass('left');
        const isTitle = $navEl.hasClass('title');
        const isBg = $navEl.hasClass('navbar-bg');
        if ((isTitle || isBg) && previousNavIsTransparent) return;
        const el = {
          el: navEl,
        };
        if (toLarge) {
          if (isTitle) return;
          if (els.indexOf(el) < 0) els.push(el);

          if ($navEl.hasClass('title-large')) {
            el.opacity = 1;
            el.overflow = 'visible';
            $navEl.find('.title-large-text').each((subIndex, subNavEl) => {
              els.push({
                el: subNavEl,
                'transform-origin': transformOriginTitleLarge,
                opacity: progress => (progress ** 3),
                transform: progress => `translateX(calc(${1 - progress} * (var(--f7-navbarLeftTextOffset) - var(--f7-navbarTitleLargeOffset)))) translateY(calc(${progress - 1} * var(--f7-navbar-large-title-height) + ${1 - progress} * var(--f7-navbar-large-title-padding-vertical))) scale(${0.5 + progress * 0.5})`,
              });
            });
            return;
          }
        }
        if (isBg) {
          if (els.indexOf(el) < 0) els.push(el);
          if (!fromLarge && !toLarge) {
            if (previousNavIsCollapsed) {
              if (previousNavIsLargeTransparent) {
                el.className = 'ios-swipeback-navbar-bg-large';
              }
              el.transform = progress => `translateX(${(-100 + 100 * progress) * inverter}%) translateY(calc(-1 * var(--f7-navbar-large-title-height)))`;
            } else {
              el.transform = progress => `translateX(${(-100 + 100 * progress) * inverter}%)`;
            }
          }
          if (!fromLarge && toLarge) {
            el.transform = progress => `translateX(${(-100 + 100 * progress) * inverter}%) translateY(calc(-1 * ${1 - progress} * var(--f7-navbar-large-title-height)))`;
          }
          if (fromLarge && !toLarge) {
            el.className = 'ios-swipeback-navbar-bg-large';
            el.transform = progress => `translateX(${(-100 + 100 * progress) * inverter}%) translateY(calc(-${progress} * var(--f7-navbar-large-title-height)))`;
          }
          if (fromLarge && toLarge) {
            el.transform = progress => `translateX(${(-100 + 100 * progress) * inverter}%)`;
          }

          return;
        }
        if ($navEl.hasClass('title-large')) return;
        const isSliding = $navEl.hasClass('sliding') || $previousNavbarEl.children('.navbar-inner.sliding').length;
        if (els.indexOf(el) < 0) els.push(el);
        if (!isSubnavbar || (isSubnavbar && !isSliding)) {
          el.opacity = progress => (progress ** 3);
        }
        if (isSliding) {
          let transformTarget = el;
          if (isLeft && previousNavBackIconText.length && params.iosAnimateNavbarBackIcon) {
            const textEl = { el: previousNavBackIconText[0] };
            transformTarget = textEl;
            els.push(textEl);
          }
          transformTarget.transform = (progress) => {
            let previousNavTranslate = transformTarget.el.f7NavbarLeftOffset * (1 - progress);
            if (Device.pixelRatio === 1) previousNavTranslate = Math.round(previousNavTranslate);
            if (isSubnavbar && previousNavIsLarge) {
              return `translate3d(${previousNavTranslate}px, calc(-1 * var(--f7-navbar-large-collapse-progress) * var(--f7-navbar-large-title-height)), 0)`;
            }
            return `translate3d(${previousNavTranslate}px,0,0)`;
          };
        }
      });
    return els;
  }

  function setAnimatableNavElements({ progress, reset, transition } = {}) {
    const styles = ['overflow', 'transform', 'transform-origin', 'opacity'];
    for (let i = 0; i < animatableNavEls.length; i += 1) {
      const el = animatableNavEls[i];
      if (el && el.el) {
        if (transition === true) el.el.classList.add('navbar-page-transitioning');
        if (transition === false) el.el.classList.remove('navbar-page-transitioning');
        if (el.className && !el.classNameSet && !reset) {
          el.el.classList.add(el.className);
          el.classNameSet = true;
        }
        if (el.className && reset) {
          el.el.classList.remove(el.className);
        }
        for (let j = 0; j < styles.length; j += 1) {
          const styleProp = styles[j];
          if (el[styleProp]) {
            if (reset) {
              el.el.style[styleProp] = '';
            } else if (typeof el[styleProp] === 'function') {
              el.el.style[styleProp] = el[styleProp](progress);
            } else {
              el.el.style[styleProp] = el[styleProp];
            }
          }
        }
      }
    }
  }

  function handleTouchStart(e) {
    const swipeBackEnabled = params[`${app.theme}SwipeBack`];
    if (!allowViewTouchMove || !swipeBackEnabled || isTouched || (app.swipeout && app.swipeout.el) || !router.allowPageChange) return;
    if ($(e.target).closest('.range-slider, .calendar-months').length > 0) return;
    if ($(e.target).closest('.page-master, .page-master-detail').length > 0 && params.masterDetailBreakpoint > 0 && app.width >= params.masterDetailBreakpoint) return;
    isMoved = false;
    isTouched = true;
    isScrolling = undefined;
    touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    touchStartTime = Utils.now();
    dynamicNavbar = router.dynamicNavbar;
  }
  function handleTouchMove(e) {
    if (!isTouched) return;
    const pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    const pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    if (typeof isScrolling === 'undefined') {
      isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x)) || (pageX < touchesStart.x && !app.rtl) || (pageX > touchesStart.x && app.rtl);
    }
    if (isScrolling || e.f7PreventSwipeBack || app.preventSwipeBack) {
      isTouched = false;
      return;
    }
    if (!isMoved) {
      // Calc values during first move fired
      let cancel = false;
      const target = $(e.target);

      const swipeout = target.closest('.swipeout');
      if (swipeout.length > 0) {
        if (!app.rtl && swipeout.find('.swipeout-actions-left').length > 0) cancel = true;
        if (app.rtl && swipeout.find('.swipeout-actions-right').length > 0) cancel = true;
      }

      $currentPageEl = target.closest('.page');
      if ($currentPageEl.hasClass('no-swipeback') || target.closest('.no-swipeback, .card-opened').length > 0) cancel = true;
      $previousPageEl = $el.find('.page-previous:not(.stacked)');
      if ($previousPageEl.length > 1) {
        $previousPageEl = $previousPageEl.eq($previousPageEl.length - 1);
      }
      let notFromBorder = touchesStart.x - $el.offset().left > paramsSwipeBackActiveArea;
      viewContainerWidth = $el.width();
      if (app.rtl) {
        notFromBorder = touchesStart.x < ($el.offset().left - $el[0].scrollLeft) + (viewContainerWidth - paramsSwipeBackActiveArea);
      } else {
        notFromBorder = touchesStart.x - $el.offset().left > paramsSwipeBackActiveArea;
      }
      if (notFromBorder) cancel = true;
      if ($previousPageEl.length === 0 || $currentPageEl.length === 0) cancel = true;
      if (cancel) {
        isTouched = false;
        return;
      }

      if (paramsSwipeBackAnimateShadow) {
        $pageShadowEl = $currentPageEl.find('.page-shadow-effect');
        if ($pageShadowEl.length === 0) {
          $pageShadowEl = $('<div class="page-shadow-effect"></div>');
          $currentPageEl.append($pageShadowEl);
        }
      }
      if (paramsSwipeBackAnimateOpacity) {
        $pageOpacityEl = $previousPageEl.find('.page-opacity-effect');
        if ($pageOpacityEl.length === 0) {
          $pageOpacityEl = $('<div class="page-opacity-effect"></div>');
          $previousPageEl.append($pageOpacityEl);
        }
      }

      if (dynamicNavbar) {
        $currentNavbarEl = $navbarsEl.find('.navbar-current:not(.stacked)');
        $previousNavbarEl = $navbarsEl.find('.navbar-previous:not(.stacked)');
        if ($previousNavbarEl.length > 1) {
          $previousNavbarEl = $previousNavbarEl.eq($previousNavbarEl.length - 1);
        }

        animatableNavEls = animatableNavElements($previousNavbarEl, $currentNavbarEl);
      }

      // Close/Hide Any Picker
      if ($('.sheet.modal-in').length > 0 && app.sheet) {
        app.sheet.close($('.sheet.modal-in'));
      }
    }
    e.f7PreventSwipePanel = true;
    isMoved = true;
    app.preventSwipePanelBySwipeBack = true;
    e.preventDefault();

    // RTL inverter
    const inverter = app.rtl ? -1 : 1;

    // Touches diff
    touchesDiff = (pageX - touchesStart.x - paramsSwipeBackThreshold) * inverter;
    if (touchesDiff < 0) touchesDiff = 0;
    const percentage = Math.min(Math.max(touchesDiff / viewContainerWidth, 0), 1);

    // Swipe Back Callback
    const callbackData = {
      percentage,
      progress: percentage,
      currentPageEl: $currentPageEl[0],
      previousPageEl: $previousPageEl[0],
      currentNavbarEl: $currentNavbarEl[0],
      previousNavbarEl: $previousNavbarEl[0],
    };
    $el.trigger('swipeback:move', callbackData);
    router.emit('swipebackMove', callbackData);

    // Transform pages
    let currentPageTranslate = touchesDiff * inverter;
    let previousPageTranslate = ((touchesDiff / 5) - (viewContainerWidth / 5)) * inverter;
    if (!app.rtl) {
      currentPageTranslate = Math.min(currentPageTranslate, viewContainerWidth);
      previousPageTranslate = Math.min(previousPageTranslate, 0);
    } else {
      currentPageTranslate = Math.max(currentPageTranslate, -viewContainerWidth);
      previousPageTranslate = Math.max(previousPageTranslate, 0);
    }
    if (Device.pixelRatio === 1) {
      currentPageTranslate = Math.round(currentPageTranslate);
      previousPageTranslate = Math.round(previousPageTranslate);
    }

    router.swipeBackActive = true;
    $([$currentPageEl[0], $previousPageEl[0]]).addClass('page-swipeback-active');

    $currentPageEl.transform(`translate3d(${currentPageTranslate}px,0,0)`);
    if (paramsSwipeBackAnimateShadow) $pageShadowEl[0].style.opacity = 1 - (1 * percentage);

    if (app.theme === 'ios') {
      $previousPageEl.transform(`translate3d(${previousPageTranslate}px,0,0)`);
    }
    if (paramsSwipeBackAnimateOpacity) $pageOpacityEl[0].style.opacity = 1 - (1 * percentage);

    // Dynamic Navbars Animation
    if (!dynamicNavbar) return;

    setAnimatableNavElements({ progress: percentage });
  }
  function handleTouchEnd() {
    app.preventSwipePanelBySwipeBack = false;
    if (!isTouched || !isMoved) {
      isTouched = false;
      isMoved = false;
      return;
    }
    isTouched = false;
    isMoved = false;
    router.swipeBackActive = false;
    $([$currentPageEl[0], $previousPageEl[0]]).removeClass('page-swipeback-active');
    if (touchesDiff === 0) {
      $([$currentPageEl[0], $previousPageEl[0]]).transform('');
      if ($pageShadowEl && $pageShadowEl.length > 0) $pageShadowEl.remove();
      if ($pageOpacityEl && $pageOpacityEl.length > 0) $pageOpacityEl.remove();
      if (dynamicNavbar) {
        setAnimatableNavElements({ reset: true });
      }
      return;
    }
    const timeDiff = Utils.now() - touchStartTime;
    let pageChanged = false;
    // Swipe back to previous page
    if (
      (timeDiff < 300 && touchesDiff > 10)
      || (timeDiff >= 300 && touchesDiff > viewContainerWidth / 2)
    ) {
      $currentPageEl.removeClass('page-current').addClass(`page-next${app.theme !== 'ios' ? ' page-next-on-right' : ''}`);
      $previousPageEl.removeClass('page-previous').addClass('page-current').removeAttr('aria-hidden');
      if ($pageShadowEl) $pageShadowEl[0].style.opacity = '';
      if ($pageOpacityEl) $pageOpacityEl[0].style.opacity = '';
      if (dynamicNavbar) {
        router.setNavbarPosition($currentNavbarEl, 'next');
        router.setNavbarPosition($previousNavbarEl, 'current', false);
      }
      pageChanged = true;
    }
    // Reset custom styles
    // Add transitioning class for transition-duration
    $([$currentPageEl[0], $previousPageEl[0]]).addClass('page-transitioning page-transitioning-swipeback').transform('');

    if (dynamicNavbar) {
      setAnimatableNavElements({ progress: pageChanged ? 1 : 0, transition: true });
    }
    allowViewTouchMove = false;
    router.allowPageChange = false;

    // Swipe Back Callback
    const callbackData = {
      currentPageEl: $currentPageEl[0],
      previousPageEl: $previousPageEl[0],
      currentNavbarEl: $currentNavbarEl[0],
      previousNavbarEl: $previousNavbarEl[0],
    };

    if (pageChanged) {
      // Update Route
      router.currentRoute = $previousPageEl[0].f7Page.route;
      router.currentPage = $previousPageEl[0];

      // Page before animation callback
      router.pageCallback('beforeOut', $currentPageEl, $currentNavbarEl, 'current', 'next', { route: $currentPageEl[0].f7Page.route, swipeBack: true });
      router.pageCallback('beforeIn', $previousPageEl, $previousNavbarEl, 'previous', 'current', { route: $previousPageEl[0].f7Page.route, swipeBack: true }, $currentPageEl[0]);

      $el.trigger('swipeback:beforechange', callbackData);
      router.emit('swipebackBeforeChange', callbackData);
    } else {
      $el.trigger('swipeback:beforereset', callbackData);
      router.emit('swipebackBeforeReset', callbackData);
    }

    $currentPageEl.transitionEnd(() => {
      $([$currentPageEl[0], $previousPageEl[0]]).removeClass('page-transitioning page-transitioning-swipeback');
      if (dynamicNavbar) {
        setAnimatableNavElements({ reset: true, transition: false });
      }
      allowViewTouchMove = true;
      router.allowPageChange = true;
      if (pageChanged) {
        // Update History
        if (router.history.length === 1) {
          router.history.unshift(router.url);
        }
        router.history.pop();
        router.saveHistory();

        // Update push state
        if (params.pushState) {
          History.back();
        }

        // Page after animation callback
        router.pageCallback('afterOut', $currentPageEl, $currentNavbarEl, 'current', 'next', { route: $currentPageEl[0].f7Page.route, swipeBack: true });
        router.pageCallback('afterIn', $previousPageEl, $previousNavbarEl, 'previous', 'current', { route: $previousPageEl[0].f7Page.route, swipeBack: true });

        // Remove Old Page
        if (params.stackPages && router.initialPages.indexOf($currentPageEl[0]) >= 0) {
          $currentPageEl.addClass('stacked');
          if (dynamicNavbar) {
            $currentNavbarEl.addClass('stacked');
          }
        } else {
          router.pageCallback('beforeRemove', $currentPageEl, $currentNavbarEl, 'next', { swipeBack: true });
          router.removePage($currentPageEl);
          if (dynamicNavbar) {
            router.removeNavbar($currentNavbarEl);
          }
        }

        $el.trigger('swipeback:afterchange', callbackData);
        router.emit('swipebackAfterChange', callbackData);

        router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

        if (params.preloadPreviousPage) {
          router.back(router.history[router.history.length - 2], { preload: true });
        }
      } else {
        $el.trigger('swipeback:afterreset', callbackData);
        router.emit('swipebackAfterReset', callbackData);
      }
      if ($pageShadowEl && $pageShadowEl.length > 0) $pageShadowEl.remove();
      if ($pageOpacityEl && $pageOpacityEl.length > 0) $pageOpacityEl.remove();
    });
  }

  function attachEvents() {
    const passiveListener = (app.touchEvents.start === 'touchstart' && Support.passiveListener) ? { passive: true, capture: false } : false;
    $el.on(app.touchEvents.start, handleTouchStart, passiveListener);
    app.on('touchmove:active', handleTouchMove);
    app.on('touchend:passive', handleTouchEnd);
  }
  function detachEvents() {
    const passiveListener = (app.touchEvents.start === 'touchstart' && Support.passiveListener) ? { passive: true, capture: false } : false;
    $el.off(app.touchEvents.start, handleTouchStart, passiveListener);
    app.off('touchmove:active', handleTouchMove);
    app.off('touchend:passive', handleTouchEnd);
  }

  attachEvents();

  router.on('routerDestroy', detachEvents);
}

export default SwipeBack;
