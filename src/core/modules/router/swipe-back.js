import $ from 'dom7';
import History from '../../utils/history';
import Support from '../../utils/support';
import Device from '../../utils/device';
import Utils from '../../utils/utils';

function SwipeBack(r) {
  const router = r;
  const { $el, $navbarEl, app, params } = router;
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
  let $currentNavbarInnerEl = [];
  let $previousNavbarInnerEl = [];
  let dynamicNavbar;
  let separateNavbar;
  let $pageShadowEl;
  let $pageOpacityEl;

  let animatableNavEls;

  const paramsSwipeBackAnimateShadow = params[`${app.theme}SwipeBackAnimateShadow`];
  const paramsSwipeBackAnimateOpacity = params[`${app.theme}SwipeBackAnimateOpacity`];
  const paramsSwipeBackActiveArea = params[`${app.theme}SwipeBackActiveArea`];
  const paramsSwipeBackThreshold = params[`${app.theme}SwipeBackThreshold`];

  const transformOrigin = app.rtl ? 'right center' : 'left center';

  function animatableNavElements() {
    const els = [];
    const inverter = app.rtl ? -1 : 1;
    const currentNavIsLarge = $currentNavbarInnerEl.hasClass('navbar-inner-large');
    const previousNavIsLarge = $previousNavbarInnerEl.hasClass('navbar-inner-large');
    const fromLarge = currentNavIsLarge && !$currentNavbarInnerEl.hasClass('navbar-inner-large-collapsed');
    const toLarge = previousNavIsLarge && !$previousNavbarInnerEl.hasClass('navbar-inner-large-collapsed');
    const $currentNavElements = $currentNavbarInnerEl.children('.left, .title, .right, .subnavbar, .fading, .title-large');
    const $previousNavElements = $previousNavbarInnerEl.children('.left, .title, .right, .subnavbar, .fading, .title-large');
    let activeNavBackIconText;
    let previousNavBackIconText;

    if (params.iosAnimateNavbarBackIcon) {
      if ($currentNavbarInnerEl.hasClass('sliding')) {
        activeNavBackIconText = $currentNavbarInnerEl.children('.left').find('.back .icon + span').eq(0);
      } else {
        activeNavBackIconText = $currentNavbarInnerEl.children('.left.sliding').find('.back .icon + span').eq(0);
      }
      if ($previousNavbarInnerEl.hasClass('sliding')) {
        previousNavBackIconText = $previousNavbarInnerEl.children('.left').find('.back .icon + span').eq(0);
      } else {
        previousNavBackIconText = $previousNavbarInnerEl.children('.left.sliding').find('.back .icon + span').eq(0);
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
        if (!fromLarge && $navEl.hasClass('.title-large')) return;
        const el = {
          el: navEl,
        };
        if (fromLarge) {
          if (isTitle) return;
          if ($navEl.hasClass('title-large')) {
            if (!separateNavbar) return;
            if (toLarge) {
              if (els.indexOf(el) < 0) els.push(el);
              el.overflow = 'visible';
              el.transform = 'translateX(100%)';
              $navEl.find('.title-large-text, .title-large-inner').each((subIndex, subNavEl) => {
                els.push({
                  el: subNavEl,
                  transform: progress => `translateX(${-100 + progress * 100 * inverter}%)`,
                });
              });
            } else {
              if (els.indexOf(el) < 0) els.push(el);
              el.overflow = 'hidden';
              el.transform = progress => `translateY(calc(${-progress} * var(--f7-navbar-large-title-height)))`;
              $navEl.find('.title-large-text, .title-large-inner').each((subIndex, subNavEl) => {
                els.push({
                  el: subNavEl,
                  transform: progress => `translateX(${progress * 100 * inverter}%) translateY(calc(${progress} * var(--f7-navbar-large-title-height)))`,
                });
              });
            }
            return;
          }
        }
        if (toLarge) {
          if (!fromLarge) {
            if ($navEl.hasClass('title-large')) {
              if (!separateNavbar) return;
              if (els.indexOf(el) < 0) els.push(el);
              el.opacity = 0;
            }
          }
          if (isLeft && separateNavbar) {
            if (els.indexOf(el) < 0) els.push(el);
            el.opacity = progress => (1 - (progress ** 0.33));
            $navEl.find('.back span').each((subIndex, subNavEl) => {
              els.push({
                el: subNavEl,
                'transform-origin': transformOrigin,
                transform: progress => `translateY(calc(var(--f7-navbar-height) * ${progress})) scale(${1 + (1 * progress)})`,
              });
            });
            return;
          }
        }
        if ($navEl.hasClass('title-large')) return;
        const isSliding = $navEl.hasClass('sliding') || $currentNavbarInnerEl.hasClass('sliding');
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
            if (isSubnavbar && currentNavIsLarge && separateNavbar) {
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
        const el = {
          el: navEl,
        };
        if (toLarge) {
          if (isTitle) return;
          if (els.indexOf(el) < 0) els.push(el);

          if ($navEl.hasClass('title-large')) {
            if (!separateNavbar) return;
            if (fromLarge) {
              el.opacity = 1;
              el.overflow = 'visible';
              el.transform = 'translateY(0)';
              $navEl.find('.title-large-text').each((subIndex, subNavEl) => {
                els.push({
                  el: subNavEl,
                  'transform-origin': transformOrigin,
                  opacity: progress => (progress ** 3),
                  transform: progress => `translateY(calc(${-1 + progress * 1} * var(--f7-navbar-large-title-height))) scale(${0.5 + progress * 0.5})`,
                });
              });
            } else {
              el.transform = progress => `translateY(calc(${progress - 1} * var(--f7-navbar-large-title-height)))`;
              el.opacity = 1;
              el.overflow = 'hidden';
              $navEl.find('.title-large-text').each((subIndex, subNavEl) => {
                els.push({
                  el: subNavEl,
                  'transform-origin': transformOrigin,
                  opacity: progress => (progress ** 3),
                  transform: progress => `scale(${0.5 + progress * 0.5})`,
                });
              });
            }
            $navEl.find('.title-large-inner').each((subIndex, subNavEl) => {
              els.push({
                el: subNavEl,
                'transform-origin': transformOrigin,
                opacity: progress => (progress ** 3),
                transform: progress => `translateX(${-100 * (1 - progress) * inverter}%)`,
              });
            });
            return;
          }
        }
        if ($navEl.hasClass('title-large')) return;
        const isSliding = $navEl.hasClass('sliding') || $previousNavbarInnerEl.hasClass('sliding');
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
            if (isSubnavbar && previousNavIsLarge && separateNavbar) {
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
    separateNavbar = router.separateNavbar;
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
        if (separateNavbar) {
          $currentNavbarInnerEl = $navbarEl.find('.navbar-current:not(.stacked)');
          $previousNavbarInnerEl = $navbarEl.find('.navbar-previous:not(.stacked)');
        } else {
          $currentNavbarInnerEl = $currentPageEl.children('.navbar').children('.navbar-inner');
          $previousNavbarInnerEl = $previousPageEl.children('.navbar').children('.navbar-inner');
        }
        if ($previousNavbarInnerEl.length > 1) {
          $previousNavbarInnerEl = $previousNavbarInnerEl.eq($previousNavbarInnerEl.length - 1);
        }

        animatableNavEls = animatableNavElements($previousNavbarInnerEl, $currentNavbarInnerEl);
      }

      // Close/Hide Any Picker
      if ($('.sheet.modal-in').length > 0 && app.sheet) {
        app.sheet.close($('.sheet.modal-in'));
      }
    }
    e.f7PreventPanelSwipe = true;
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
      currentNavbarEl: $currentNavbarInnerEl[0],
      previousNavbarEl: $previousNavbarInnerEl[0],
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
    if (paramsSwipeBackAnimateOpacity) $pageShadowEl[0].style.opacity = 1 - (1 * percentage);

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
        $currentNavbarInnerEl.removeClass('navbar-current').addClass('navbar-next');
        $previousNavbarInnerEl.removeClass('navbar-previous').addClass('navbar-current').removeAttr('aria-hidden');
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
      currentNavbarEl: $currentNavbarInnerEl[0],
      previousNavbarEl: $previousNavbarInnerEl[0],
    };

    if (pageChanged) {
      // Update Route
      router.currentRoute = $previousPageEl[0].f7Page.route;
      router.currentPage = $previousPageEl[0];

      // Page before animation callback
      router.pageCallback('beforeOut', $currentPageEl, $currentNavbarInnerEl, 'current', 'next', { route: $currentPageEl[0].f7Page.route, swipeBack: true });
      router.pageCallback('beforeIn', $previousPageEl, $previousNavbarInnerEl, 'previous', 'current', { route: $previousPageEl[0].f7Page.route, swipeBack: true }, $currentPageEl[0]);

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
        router.pageCallback('afterOut', $currentPageEl, $currentNavbarInnerEl, 'current', 'next', { route: $currentPageEl[0].f7Page.route, swipeBack: true });
        router.pageCallback('afterIn', $previousPageEl, $previousNavbarInnerEl, 'previous', 'current', { route: $previousPageEl[0].f7Page.route, swipeBack: true });

        // Remove Old Page
        if (params.stackPages && router.initialPages.indexOf($currentPageEl[0]) >= 0) {
          $currentPageEl.addClass('stacked');
          if (separateNavbar) {
            $currentNavbarInnerEl.addClass('stacked');
          }
        } else {
          router.pageCallback('beforeRemove', $currentPageEl, $currentNavbarInnerEl, 'next', { swipeBack: true });
          router.removePage($currentPageEl);
          if (separateNavbar) {
            router.removeNavbar($currentNavbarInnerEl);
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
