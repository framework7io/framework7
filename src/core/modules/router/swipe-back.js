import $ from '../../shared/dom7.js';
import History from '../../shared/history.js';
import { getDevice } from '../../shared/get-device.js';
import { now } from '../../shared/utils.js';

function SwipeBack(r) {
  const router = r;
  const { $el, app, params } = router;
  const device = getDevice();
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
  let $pageShadowEl;
  let $pageOpacityEl;

  const paramsSwipeBackAnimateShadow = params[`${app.theme}SwipeBackAnimateShadow`];
  const paramsSwipeBackAnimateOpacity = params[`${app.theme}SwipeBackAnimateOpacity`];
  const paramsSwipeBackActiveArea = params[`${app.theme}SwipeBackActiveArea`];
  const paramsSwipeBackThreshold = params[`${app.theme}SwipeBackThreshold`];

  function handleTouchStart(e) {
    if (!e.isTrusted) return;
    const swipeBackEnabled = params[`${app.theme}SwipeBack`];
    if (
      !allowViewTouchMove ||
      !swipeBackEnabled ||
      isTouched ||
      (app.swipeout && app.swipeout.el) ||
      !router.allowPageChange
    )
      return;
    if ($(e.target).closest('.range-slider, .calendar-months').length > 0) return;
    if (
      $(e.target).closest('.page-master, .page-master-detail').length > 0 &&
      params.masterDetailBreakpoint > 0 &&
      app.width >= params.masterDetailBreakpoint
    )
      return;
    isMoved = false;
    isTouched = true;
    isScrolling = undefined;
    touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    touchStartTime = now();
  }
  function handleTouchMove(e) {
    if (!e.isTrusted) return;
    if (!isTouched) return;
    const pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    const pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    if (typeof isScrolling === 'undefined') {
      isScrolling =
        !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x)) ||
        (pageX < touchesStart.x && !app.rtl) ||
        (pageX > touchesStart.x && app.rtl);
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
      if (
        $currentPageEl.hasClass('no-swipeback') ||
        target.closest('.no-swipeback, .card-opened').length > 0
      )
        cancel = true;
      $previousPageEl = $el.find('.page-previous');
      if ($previousPageEl.length > 1) {
        $previousPageEl = $previousPageEl.eq($previousPageEl.length - 1);
      }
      let notFromBorder = touchesStart.x - $el.offset().left > paramsSwipeBackActiveArea;
      viewContainerWidth = $el.width();
      if (app.rtl) {
        notFromBorder =
          touchesStart.x <
          $el.offset().left - $el[0].scrollLeft + (viewContainerWidth - paramsSwipeBackActiveArea);
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
    };
    $el.trigger('swipeback:move', callbackData);
    router.emit('swipebackMove', callbackData);

    // Transform pages
    let currentPageTranslate = touchesDiff * inverter;
    let previousPageTranslate = (touchesDiff / 5 - viewContainerWidth / 5) * inverter;

    if (!app.rtl) {
      currentPageTranslate = Math.min(currentPageTranslate, viewContainerWidth);
      previousPageTranslate = Math.min(previousPageTranslate, 0);
    } else {
      currentPageTranslate = Math.max(currentPageTranslate, -viewContainerWidth);
      previousPageTranslate = Math.max(previousPageTranslate, 0);
    }
    if (device.pixelRatio === 1) {
      currentPageTranslate = Math.round(currentPageTranslate);
      previousPageTranslate = Math.round(previousPageTranslate);
    }

    router.swipeBackActive = true;
    $([$currentPageEl[0], $previousPageEl[0]]).addClass('page-swipeback-active');

    $currentPageEl.transform(`translate3d(${currentPageTranslate}px,0,0)`);
    if (paramsSwipeBackAnimateShadow) $pageShadowEl[0].style.opacity = 1 - 1 * percentage;

    $previousPageEl.transform(`translate3d(${previousPageTranslate}px,0,0)`);
    if (paramsSwipeBackAnimateOpacity) $pageOpacityEl[0].style.opacity = 1 - 1 * percentage;
  }
  function handleTouchEnd(e) {
    if (!e.isTrusted) return;
    app.preventSwipePanelBySwipeBack = false;
    if (!isTouched || !isMoved) {
      isTouched = false;
      isMoved = false;
      return;
    }
    isTouched = false;
    isMoved = false;
    router.swipeBackActive = false;
    const $pages = $([$currentPageEl[0], $previousPageEl[0]]);
    $pages.removeClass('page-swipeback-active');
    if (touchesDiff === 0) {
      $pages.transform('');
      if ($pageShadowEl && $pageShadowEl.length > 0) $pageShadowEl.remove();
      if ($pageOpacityEl && $pageOpacityEl.length > 0) $pageOpacityEl.remove();
      return;
    }
    const timeDiff = now() - touchStartTime;
    let pageChanged = false;
    // Swipe back to previous page
    if (
      (timeDiff < 300 && touchesDiff > 10) ||
      (timeDiff >= 300 && touchesDiff > viewContainerWidth / 2)
    ) {
      $currentPageEl
        .removeClass('page-current')
        .addClass(`page-next${app.theme !== 'ios' ? ' page-next-on-right' : ''}`);
      $previousPageEl
        .removeClass('page-previous')
        .addClass('page-current')
        .removeAttr('aria-hidden');
      if ($pageShadowEl) $pageShadowEl[0].style.opacity = '';
      if ($pageOpacityEl) $pageOpacityEl[0].style.opacity = '';

      pageChanged = true;
    }
    // Reset custom styles
    // Add transitioning class for transition-duration
    $pages.addClass('page-transitioning page-transitioning-swipeback');
    if (device.ios) {
      // eslint-disable-next-line
      $currentPageEl[0]._clientLeft = $currentPageEl[0].clientLeft;
    }
    $pages.transform('');

    allowViewTouchMove = false;
    router.allowPageChange = false;

    // Swipe Back Callback
    const callbackData = {
      currentPageEl: $currentPageEl[0],
      previousPageEl: $previousPageEl[0],
    };

    if (pageChanged) {
      // Update Route
      router.currentRoute = $previousPageEl[0].f7Page.route;
      router.currentPage = $previousPageEl[0];

      // Page before animation callback
      router.pageCallback('beforeOut', $currentPageEl, 'current', 'next', {
        route: $currentPageEl[0].f7Page.route,
        swipeBack: true,
      });
      router.pageCallback(
        'beforeIn',
        $previousPageEl,
        'previous',
        'current',
        { route: $previousPageEl[0].f7Page.route, swipeBack: true },
        $currentPageEl[0],
      );

      $el.trigger('swipeback:beforechange', callbackData);
      router.emit('swipebackBeforeChange', callbackData);
    } else {
      $el.trigger('swipeback:beforereset', callbackData);
      router.emit('swipebackBeforeReset', callbackData);
    }

    $currentPageEl.transitionEnd(() => {
      $pages.removeClass('page-transitioning page-transitioning-swipeback');

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
        if (params.browserHistory) {
          History.back();
        }

        // Page after animation callback
        router.pageCallback('afterOut', $currentPageEl, 'current', 'next', {
          route: $currentPageEl[0].f7Page.route,
          swipeBack: true,
        });
        router.pageCallback('afterIn', $previousPageEl, 'previous', 'current', {
          route: $previousPageEl[0].f7Page.route,
          swipeBack: true,
        });

        // Remove Old Page

        router.pageCallback('beforeRemove', $currentPageEl, 'next', {
          swipeBack: true,
        });
        router.removePage($currentPageEl);

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
    const passiveListener =
      app.touchEvents.start === 'touchstart' ? { passive: true, capture: false } : false;
    $el.on(app.touchEvents.start, handleTouchStart, passiveListener);
    app.on('touchmove:active', handleTouchMove);
    app.on('touchend:passive', handleTouchEnd);
  }
  function detachEvents() {
    const passiveListener =
      app.touchEvents.start === 'touchstart' ? { passive: true, capture: false } : false;
    $el.off(app.touchEvents.start, handleTouchStart, passiveListener);
    app.off('touchmove:active', handleTouchMove);
    app.off('touchend:passive', handleTouchEnd);
  }

  attachEvents();

  router.on('routerDestroy', detachEvents);
}

export default SwipeBack;
