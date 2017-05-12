import $ from 'dom7';
import Utils from '../../utils/utils';
import Support from '../../utils/support';

function SwipeBack() {
  let isTouched = false;
  let isMoved = false;
  const touchesStart = {};
  let isScrolling;
  let currentPage = [];
  let previousPage = [];
  let viewContainerWidth;
  let touchesDiff;
  let allowViewTouchMove = true;
  let touchStartTime;
  let currentNavbar = [];
  let previousNavbar = [];
  let currentNavElements;
  let previousNavElements;
  let activeNavBackIcon;
  let previousNavBackIcon;
  let dynamicNavbar;
  let pageShadow;
  let pageOpacity;
  let $el;
  let view;
  let app;

  function handleTouchStart(e) {
    if (!allowViewTouchMove || !view.params.swipeBackPage || isTouched || app.swipeoutOpenedEl || !view.router.allowPageChange) return;
    isMoved = false;
    isTouched = true;
    isScrolling = undefined;
    touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    touchStartTime = (new Date()).getTime();
    dynamicNavbar = view.router.params.dynamicNavbar && $el.find('.navbar-inner').length > 1;
  }
  function handleTouchMove(e) {
    if (!isTouched) return;
    const pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    const pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    if (typeof isScrolling === 'undefined') {
      isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
    }
    if (isScrolling || e.f7PreventSwipeBack || app.preventSwipeBack) {
      isTouched = false;
      return;
    }
    if (!isMoved) {
      // Calc values during first move fired

      let cancel = false;
      const target = $(e.target);

      const swipeout = target.hasClass('swipeout') ? target : target.parents('.swipeout');
      if (swipeout.length > 0) {
        if (!app.rtl && swipeout.find('.swipeout-actions-left').length > 0) cancel = true;
        if (app.rtl && swipeout.find('.swipeout-actions-right').length > 0) cancel = true;
      }

      currentPage = target.is('.page') ? target : target.parents('.page');
      if (currentPage.hasClass('no-swipeback')) cancel = true;
      previousPage = $el.find('.page-previous:not(.stacked)');

      let notFromBorder = touchesStart.x - $el.offset().left > view.params.swipeBackPageActiveArea;
      viewContainerWidth = $el.width();
      if (app.rtl) {
        notFromBorder = touchesStart.x < ($el.offset().left - $el[0].scrollLeft) + (viewContainerWidth - view.params.swipeBackPageActiveArea);
      } else {
        notFromBorder = touchesStart.x - $el.offset().left > view.params.swipeBackPageActiveArea;
      }
      if (notFromBorder) cancel = true;
      if (previousPage.length === 0 || currentPage.length === 0) cancel = true;
      if (cancel) {
        isTouched = false;
        return;
      }

      if (view.params.swipeBackPageAnimateShadow) {
        pageShadow = currentPage.find('.swipeback-page-shadow');
        if (pageShadow.length === 0) {
          pageShadow = $('<div class="swipeback-page-shadow"></div>');
          currentPage.append(pageShadow);
        }
      }
      if (view.params.swipeBackPageAnimateOpacity) {
        pageOpacity = previousPage.find('.swipeback-page-opacity');
        if (pageOpacity.length === 0) {
          pageOpacity = $('<div class="swipeback-page-opacity"></div>');
          previousPage.append(pageOpacity);
        }
      }

      if (dynamicNavbar) {
        currentNavbar = $el.find('.navbar-current:not(.stacked)');
        previousNavbar = $el.find('.navbar-previous:not(.stacked)');
        currentNavElements = currentNavbar.find('.left, .center, .right, .subnavbar, .fading');
        previousNavElements = previousNavbar.find('.left, .center, .right, .subnavbar, .fading');
        if (app.params.animateNavBackIcon) {
          activeNavBackIcon = currentNavbar.find('.left.sliding .back .icon');
          previousNavBackIcon = previousNavbar.find('.left.sliding .back .icon');
        }
      }

      // Close/Hide Any Picker
      if ($('.picker.modal-in').length > 0) {
        app.closeModal($('.picker.modal-in'));
      }
    }
    e.f7PreventPanelSwipe = true;
    isMoved = true;
    e.preventDefault();

    // RTL inverter
    const inverter = app.rtl ? -1 : 1;

    // Touches diff
    touchesDiff = (pageX - touchesStart.x - view.params.swipeBackPageThreshold) * inverter;
    if (touchesDiff < 0) touchesDiff = 0;
    const percentage = touchesDiff / viewContainerWidth;

    // Swipe Back Callback
    const callbackData = {
      percentage,
      currentPage: currentPage[0],
      previousPage: previousPage[0],
      currentNavbar: currentNavbar[0],
      previousNavbar: previousNavbar[0],
    };
    view.emit('swipeBackMove swipeback:move', callbackData);
    $el.trigger('swipeBackMove swipeback:move', callbackData);

    // Transform pages
    let currentPageTranslate = touchesDiff * inverter;
    let previousPageTranslate = ((touchesDiff / 5) - (viewContainerWidth / 5)) * inverter;
    if (app.device.pixelRatio === 1) {
      currentPageTranslate = Math.round(currentPageTranslate);
      previousPageTranslate = Math.round(previousPageTranslate);
    }

    currentPage.transform(`translate3d(${currentPageTranslate}px,0,0)`);
    if (view.params.swipeBackPageAnimateShadow) pageShadow[0].style.opacity = 1 - (1 * percentage);

    previousPage.transform(`translate3d(${previousPageTranslate}px,0,0)`);
    if (view.params.swipeBackPageAnimateOpacity) pageOpacity[0].style.opacity = 1 - (1 * percentage);

    // Dynamic Navbars Animation
    if (dynamicNavbar) {
      currentNavElements.each((index, navEl) => {
        const $navEl = $(navEl);
        if (!$navEl.is('.subnavbar.sliding')) $el[0].style.opacity = (1 - (percentage * 1.3));
        if ($navEl[0].className.indexOf('sliding') >= 0) {
          let activeNavTranslate = percentage * $navEl[0].f7NavbarRightOffset;
          if (app.device.pixelRatio === 1) activeNavTranslate = Math.round(activeNavTranslate);
          $navEl.transform(`translate3d(${activeNavTranslate}px,0,0)`);
          if (view.router.params.animateNavbarBackIcon) {
            if ($navEl[0].className.indexOf('left') >= 0 && activeNavBackIcon.length > 0) {
              activeNavBackIcon.transform(`translate3d(${-activeNavTranslate}px,0,0)`);
            }
          }
        }
      });
      previousNavElements.each((index, navEl) => {
        const $navEl = $(navEl);
        if (!$navEl.is('.subnavbar.sliding')) $navEl[0].style.opacity = (percentage * 1.3) - 0.3;
        if ($navEl[0].className.indexOf('sliding') >= 0) {
          let previousNavTranslate = $navEl[0].f7NavbarLeftOffset * (1 - percentage);
          if (app.device.pixelRatio === 1) previousNavTranslate = Math.round(previousNavTranslate);
          $navEl.transform(`translate3d(${previousNavTranslate}px,0,0)`);
          if (view.router.params.animateNavbarBackIcon) {
            if ($navEl[0].className.indexOf('left') >= 0 && previousNavBackIcon.length > 0) {
              previousNavBackIcon.transform(`translate3d(${-previousNavTranslate}px,0,0)`);
            }
          }
        }
      });
    }
  }
  function handleTouchEnd() {
    let router = view.router;
    if (!isTouched || !isMoved) {
      isTouched = false;
      isMoved = false;
      return;
    }
    isTouched = false;
    isMoved = false;
    if (touchesDiff === 0) {
      $([currentPage[0], previousPage[0]]).transform('');
      if (dynamicNavbar) {
        currentNavElements.transform('').css({ opacity: '' });
        previousNavElements.transform('').css({ opacity: '' });
        if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.transform('');
        if (previousNavBackIcon && activeNavBackIcon.length > 0) previousNavBackIcon.transform('');
      }
      return;
    }
    const timeDiff = (new Date()).getTime() - touchStartTime;
    let pageChanged = false;
    // Swipe back to previous page
    if (
        (timeDiff < 300 && touchesDiff > 10) ||
        (timeDiff >= 300 && touchesDiff > viewContainerWidth / 2)
      ) {
      currentPage.removeClass('page-current').addClass('page-next');
      previousPage.removeClass('page-previous').addClass('page-current');
      if (pageShadow) pageShadow[0].style.opacity = '';
      if (pageOpacity) pageOpacity[0].style.opacity = '';
      if (dynamicNavbar) {
        currentNavbar.removeClass('navbar-current').addClass('navbar-next');
        previousNavbar.removeClass('navbar-previous').addClass('navbar-current');
      }
      pageChanged = true;
    }
    // Reset custom styles
    // Add transitioning class for transition-duration
    $([currentPage[0], previousPage[0]]).transform('').css({ opacity: '', boxShadow: '' }).addClass('page-transitioning');
    if (dynamicNavbar) {
      currentNavElements.css({ opacity: '' })
        .each(() => {
          const translate = pageChanged ? this.f7NavbarRightOffset : 0;
          const sliding = $(this);
          sliding.transform(`translate3d(${translate}px,0,0)`);
          if (view.router.params.animateNavbarBackIcon) {
            if (sliding.hasClass('left') && activeNavBackIcon.length > 0) {
              activeNavBackIcon.addClass('page-transitioning').transform(`translate3d(${-translate}px,0,0)`);
            }
          }
        }).addClass('page-transitioning');

      previousNavElements.transform('').css({ opacity: '' }).each(() => {
        const translate = pageChanged ? 0 : this.f7NavbarLeftOffset;
        const sliding = $(this);
        sliding.transform(`translate3d(${translate}px,0,0)`);
        if (view.router.params.animateNavbarBackIcon) {
          if (sliding.hasClass('left') && previousNavBackIcon.length > 0) {
            previousNavBackIcon.addClass('page-transitioning').transform(`translate3d(${-translate}px,0,0)`);
          }
        }
      }).addClass('page-transitioning');
    }
    allowViewTouchMove = false;
    view.allowPageChange = false;

    // Swipe Back Callback
    const callbackData = {
      currentPage: currentPage[0],
      previousPage: previousPage[0],
      currentNavbar: currentNavbar[0],
      previousNavbar: previousNavbar[0],
    };

    if (pageChanged) {
      // Update Route
      router.currentRoute = previousPage[0].f7Page.route;
      router.url = router.currentRoute.url;
      router.emit('routeChange route:change', router.currentRoute, router);

      // Page before animation callback
      view.router.pageBeforeOutCallback(currentPage[0], 'current', currentPage[0].f7Page.route);
      view.router.pageBeforeInCallback(previousPage[0], 'previous', previousPage[0].f7Page.route, { from: 'previous', to: 'next' });

      view.emit('swipeBackBeforeChange swipeback:beforechange', callbackData);
      $el.trigger('swipeBackBeforeChange swipeback:beforechange', callbackData);
    } else {
      view.emit('swipeBackBeforeReset swipeback:beforereset', callbackData);
      $el.trigger('swipeBackBeforeReset swipeback:beforereset', callbackData);
    }

    currentPage.transitionEnd(() => {
      $([currentPage[0], previousPage[0]]).removeClass('page-transitioning');
      if (dynamicNavbar) {
        currentNavElements.removeClass('page-transitioning').css({ opacity: '' });
        previousNavElements.removeClass('page-transitioning').css({ opacity: '' });
        if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.removeClass('page-transitioning');
        if (previousNavBackIcon && previousNavBackIcon.length > 0) previousNavBackIcon.removeClass('page-transitioning');
      }
      allowViewTouchMove = true;
      view.router.allowPageChange = true;
      if (pageChanged) {
        // if (app.params.pushState && view.main) history.back();
        // Page after animation callback
        view.router.pageAfterOutCallback(currentPage[0], 'current', currentPage[0].f7Page.route);
        view.router.pageAfterInCallback(previousPage[0], 'previous', previousPage[0].f7Page.route, { from: 'previous', to: 'next' });

        view.emit('swipeBackAfterChange swipeback:afterchange', callbackData);
        $el.trigger('swipeBackAfterChange swipeback:afterchange', callbackData);

        router.emit('routeChanged route:changed', router.currentRoute, router);
        // TODO
        // call router.afterBack to remove old page and preload previous page
        // pushState: history back
        // Update router history
      } else {
        view.emit('swipeBackAfterReset swipeback:afterreset', callbackData);
        $el.trigger('swipeBackAfterReset swipeback:afterreset', callbackData);
      }
      if (pageShadow && pageShadow.length > 0) pageShadow.remove();
      if (pageOpacity && pageOpacity.length > 0) pageOpacity.remove();
    });
  }

  function attachEvents(v) {
    view = v;
    $el = v.$el;
    app = v.app;
    const passiveListener = (app.touchEvents.start === 'touchstart' && Support.passiveListener) ? { passive: true, capture: false } : false;
    const activeListener = Support.passiveListener ? { passive: false, capture: false } : false;
    $el.on(app.touchEvents.start, handleTouchStart, passiveListener);
    $el.on(app.touchEvents.move, handleTouchMove, activeListener);
    $el.on(app.touchEvents.end, handleTouchEnd, passiveListener);
  }
  function detachEvents() {
    const passiveListener = (app.touchEvents.start === 'touchstart' && Support.passiveListener) ? { passive: true, capture: false } : false;
    const activeListener = Support.passiveListener ? { passive: false, capture: false } : false;
    $el.off(app.touchEvents.start, handleTouchStart, passiveListener);
    $el.off(app.touchEvents.move, handleTouchMove, activeListener);
    $el.off(app.touchEvents.end, handleTouchEnd, passiveListener);
  }

  return {
    init: attachEvents,
    destroy: detachEvents,
  };
}


export default SwipeBack();
