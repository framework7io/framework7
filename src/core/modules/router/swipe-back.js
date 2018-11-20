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
  let activeNavBackIconText;
  let previousNavBackIcon;
  // let previousNavBackIconText;
  let dynamicNavbar;
  let separateNavbar;
  let pageShadow;
  let pageOpacity;
  let navbarWidth;

  let toLarge;
  let fromLarge;

  const paramsSwipeBackAnimateShadow = params[`${app.theme}SwipeBackAnimateShadow`];
  const paramsSwipeBackAnimateOpacity = params[`${app.theme}SwipeBackAnimateOpacity`];
  const paramsSwipeBackActiveArea = params[`${app.theme}SwipeBackActiveArea`];
  const paramsSwipeBackThreshold = params[`${app.theme}SwipeBackThreshold`];

  function handleTouchStart(e) {
    const swipeBackEnabled = params[`${app.theme}SwipeBack`];
    if (!allowViewTouchMove || !swipeBackEnabled || isTouched || (app.swipeout && app.swipeout.el) || !router.allowPageChange) return;
    if ($(e.target).closest('.range-slider, .calendar-months').length > 0) return;
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

      currentPage = target.closest('.page');
      if (currentPage.hasClass('no-swipeback') || target.closest('.no-swipeback').length > 0) cancel = true;
      previousPage = $el.find('.page-previous:not(.stacked)');

      let notFromBorder = touchesStart.x - $el.offset().left > paramsSwipeBackActiveArea;
      viewContainerWidth = $el.width();
      if (app.rtl) {
        notFromBorder = touchesStart.x < ($el.offset().left - $el[0].scrollLeft) + (viewContainerWidth - paramsSwipeBackActiveArea);
      } else {
        notFromBorder = touchesStart.x - $el.offset().left > paramsSwipeBackActiveArea;
      }
      if (notFromBorder) cancel = true;
      if (previousPage.length === 0 || currentPage.length === 0) cancel = true;
      if (cancel) {
        isTouched = false;
        return;
      }

      if (paramsSwipeBackAnimateShadow) {
        pageShadow = currentPage.find('.page-shadow-effect');
        if (pageShadow.length === 0) {
          pageShadow = $('<div class="page-shadow-effect"></div>');
          currentPage.append(pageShadow);
        }
      }
      if (paramsSwipeBackAnimateOpacity) {
        pageOpacity = previousPage.find('.page-opacity-effect');
        if (pageOpacity.length === 0) {
          pageOpacity = $('<div class="page-opacity-effect"></div>');
          previousPage.append(pageOpacity);
        }
      }

      if (dynamicNavbar) {
        if (separateNavbar) {
          currentNavbar = $navbarEl.find('.navbar-current:not(.stacked)');
          previousNavbar = $navbarEl.find('.navbar-previous:not(.stacked)');
          navbarWidth = $navbarEl[0].offsetWidth;
        } else {
          currentNavbar = currentPage.children('.navbar').children('.navbar-inner');
          previousNavbar = previousPage.children('.navbar').children('.navbar-inner');
          navbarWidth = currentPage[0].offsetWidth;
        }

        fromLarge = currentNavbar.hasClass('navbar-inner-large') && !currentNavbar.hasClass('navbar-inner-large-collapsed');
        toLarge = previousNavbar.hasClass('navbar-inner-large') && !previousNavbar.hasClass('navbar-inner-large-collapsed');

        currentNavElements = currentNavbar.children('.left, .title, .right, .subnavbar, .fading, .title-large');
        previousNavElements = previousNavbar.children('.left, .title, .right, .subnavbar, .fading, .title-large');

        if (params.iosAnimateNavbarBackIcon) {
          if (currentNavbar.hasClass('sliding')) {
            activeNavBackIcon = currentNavbar.children('.left').find('.back .icon');
            activeNavBackIconText = currentNavbar.children('.left').find('.back span').eq(0);
          } else {
            activeNavBackIcon = currentNavbar.children('.left.sliding').find('.back .icon');
            activeNavBackIconText = currentNavbar.children('.left.sliding').find('.back span').eq(0);
          }
          if (previousNavbar.hasClass('sliding')) {
            previousNavBackIcon = previousNavbar.children('.left').find('.back .icon');
          } else {
            previousNavBackIcon = previousNavbar.children('.left.sliding').find('.back .icon');
          }
        }
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
      currentPageEl: currentPage[0],
      previousPageEl: previousPage[0],
      currentNavbarEl: currentNavbar[0],
      previousNavbarEl: previousNavbar[0],
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
    $([currentPage[0], previousPage[0]]).addClass('page-swipeback-active');

    currentPage.transform(`translate3d(${currentPageTranslate}px,0,0)`);
    if (paramsSwipeBackAnimateShadow) pageShadow[0].style.opacity = 1 - (1 * percentage);

    if (app.theme !== 'md') {
      previousPage.transform(`translate3d(${previousPageTranslate}px,0,0)`);
    }
    if (paramsSwipeBackAnimateOpacity) pageOpacity[0].style.opacity = 1 - (1 * percentage);

    // Dynamic Navbars Animation
    if (dynamicNavbar) {
      currentNavElements.each((index, navEl) => {
        const $navEl = $(navEl);
        if (!fromLarge && $navEl.hasClass('.title-large')) return;
        if (fromLarge) {
          if ($navEl.hasClass('title')) return;
          if ($navEl.hasClass('title-large')) {
            if (toLarge) {
              $navEl.css('overflow', 'visible').transform('translateX(100%)');
              $navEl.find('.title-large-text, .title-large-inner').transform(`translateX(${-100 + percentage * 100}%)`);
            } else {
              $navEl.transform(`translateY(calc(${-percentage} * var(--f7-navbar-large-title-height)))`);
              $navEl.find('.title-large-text, .title-large-inner')
                .transform(`translateX(${percentage * 100}%) translateY(calc(${percentage} * var(--f7-navbar-large-title-height)))`);
            }
            return;
          }
        }
        if (toLarge) {
          if (!fromLarge) {
            if ($navEl.hasClass('title-large')) {
              $navEl.css('opacity', 0);
            }
          }
          if ($navEl.hasClass('left')) {
            $navEl[0].style.opacity = (1 - (percentage ** 0.33));
            $navEl.find('.back span')
              .css({
                'transform-origin': 'left center',
              })
              .transform(`translateY(calc(var(--f7-navbar-height) * ${percentage})) scale(${1 + (1 * percentage)})`);
            return;
          }
        }
        if ($navEl.hasClass('title-large')) return;
        if (!$navEl.is('.subnavbar')) $navEl[0].style.opacity = (1 - (percentage ** 0.33));
        if ($navEl[0].className.indexOf('sliding') >= 0 || currentNavbar.hasClass('sliding')) {
          let activeNavTranslate = percentage * $navEl[0].f7NavbarRightOffset;
          if (Device.pixelRatio === 1) activeNavTranslate = Math.round(activeNavTranslate);
          $navEl.transform(`translate3d(${activeNavTranslate}px,0,0)`);
          if (params.iosAnimateNavbarBackIcon) {
            if ($navEl[0].className.indexOf('left') >= 0 && activeNavBackIcon.length > 0) {
              let iconTranslate = -activeNavTranslate;
              if (!separateNavbar) {
                iconTranslate -= navbarWidth * percentage;
              }
              activeNavBackIcon.transform(`translate3d(${iconTranslate}px,0,0)`);
            }
          }
        }
      });
      previousNavElements.each((index, navEl) => {
        const $navEl = $(navEl);
        if (toLarge) {
          if ($navEl.hasClass('title')) return;

          if ($navEl.hasClass('title-large')) {
            if (fromLarge) {
              $navEl
                .transform('translateY(0)')
                .css({
                  opacity: 1,
                  overflow: 'visible',
                });
              $navEl.find('.title-large-text, .title-large-inner')
                .css({
                  'transform-origin': 'left center',
                  opacity: (percentage ** 3),
                })
                .transform(`translateY(calc(${-1 + percentage * 1} * var(--f7-navbar-large-title-height))) scale(${0.5 + percentage * 0.5})`);
              return;
              // eslint-disable-next-line
            } else {
              $navEl
                .transform(`translateY(calc(${percentage - 1} * var(--f7-navbar-large-title-height)))`)
                .css({
                  opacity: 1,
                  overflow: 'visible',
                });
              $navEl.find('.title-large-text, .title-large-inner')
                .css({
                  'transform-origin': 'left center',
                  opacity: (percentage ** 3),
                })
                .transform(`scale(${0.5 + percentage * 0.5})`);
            }
            return;
          }
        }
        if ($navEl.hasClass('title-large')) return;
        if (!$navEl.is('.subnavbar')) $navEl[0].style.opacity = (percentage ** 3);
        if ($navEl[0].className.indexOf('sliding') >= 0 || previousNavbar.hasClass('sliding')) {
          let previousNavTranslate = $navEl[0].f7NavbarLeftOffset * (1 - percentage);
          if ($navEl[0].className.indexOf('title') >= 0 && activeNavBackIcon && activeNavBackIcon.length && activeNavBackIconText.length) {
            previousNavTranslate = ($navEl[0].f7NavbarLeftOffset + activeNavBackIconText[0].offsetLeft) * (1 - percentage);
          } else {
            previousNavTranslate = $navEl[0].f7NavbarLeftOffset * (1 - percentage);
          }
          if (Device.pixelRatio === 1) previousNavTranslate = Math.round(previousNavTranslate);
          $navEl.transform(`translate3d(${previousNavTranslate}px,0,0)`);
          if (params.iosAnimateNavbarBackIcon) {
            if ($navEl[0].className.indexOf('left') >= 0 && previousNavBackIcon.length > 0) {
              let iconTranslate = -previousNavTranslate;
              if (!separateNavbar) {
                iconTranslate += (navbarWidth / 5) * (1 - percentage);
              }
              previousNavBackIcon.transform(`translate3d(${iconTranslate}px,0,0)`);
            }
          }
        }
      });
    }
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
    $([currentPage[0], previousPage[0]]).removeClass('page-swipeback-active');
    if (touchesDiff === 0) {
      $([currentPage[0], previousPage[0]]).transform('');
      if (pageShadow && pageShadow.length > 0) pageShadow.remove();
      if (pageOpacity && pageOpacity.length > 0) pageOpacity.remove();
      if (dynamicNavbar) {
        currentNavElements.transform('').css({ opacity: '' });
        previousNavElements.transform('').css({ opacity: '' });
        if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.transform('');
        if (previousNavBackIcon && activeNavBackIcon.length > 0) previousNavBackIcon.transform('');
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
      currentPage.removeClass('page-current').addClass(`page-next${app.theme === 'md' ? ' page-next-on-right' : ''}`);
      previousPage.removeClass('page-previous').addClass('page-current').removeAttr('aria-hidden');
      if (pageShadow) pageShadow[0].style.opacity = '';
      if (pageOpacity) pageOpacity[0].style.opacity = '';
      if (dynamicNavbar) {
        currentNavbar.removeClass('navbar-current').addClass('navbar-next');
        previousNavbar.removeClass('navbar-previous').addClass('navbar-current').removeAttr('aria-hidden');
      }
      pageChanged = true;
    }
    // Reset custom styles
    // Add transitioning class for transition-duration
    $([currentPage[0], previousPage[0]]).addClass('page-transitioning page-transitioning-swipeback').transform('');

    if (dynamicNavbar) {
      currentNavElements
        .css({ opacity: '' })
        .each((navElIndex, navEl) => {
          const $navEl = $(navEl);
          if ($navEl.hasClass('title-large')) {
            const $titleTextEl = $navEl.find('.title-large-text, .title-large-inner');
            if (pageChanged) {
              if (fromLarge && !toLarge) {
                $navEl.css({
                  overflow: 'hidden',
                  opacity: 1,
                }).transform('translateY(calc(-1 * var(--f7-navbar-large-title-height)))');
                $titleTextEl.css({
                  opacity: 1,
                }).transform('translateX(100%) translateY(var(--f7-navbar-large-title-height))');
              }
              if (fromLarge && toLarge) {
                $navEl.css({
                  overflow: 'visible',
                  opacity: 1,
                }).transform('translateX(100%)');
                $titleTextEl.css({
                  opacity: 1,
                }).transform('translateX(0%)');
              }
              if (!fromLarge) {
                $navEl.css({
                  overflow: '',
                  opacity: 0,
                }).transform('translateY(calc(-1 * var(--f7-navbar-large-title-height)))');
              }
            } else {
              $navEl.css({
                overflow: fromLarge && toLarge ? 'visible' : '',
                opacity: !fromLarge ? 0 : '',
              }).transform('');
              $titleTextEl.css({
                opacity: '',
              }).transform('');
            }
            return;
          }
          if (toLarge) {
            if ($navEl.hasClass('left')) {
              // $navEl
              $navEl.find('.back span')
                .css({
                  'transform-origin': 'left center',
                })
                .transform(pageChanged ? 'translateY(var(--f7-navbar-height)) scale(2)' : '')
                .addClass('navbar-page-transitioning');
              return;
            }
          }
          const translate = pageChanged ? navEl.f7NavbarRightOffset : 0;
          let iconTranslate = pageChanged ? -translate : 0;
          if (!separateNavbar && pageChanged) iconTranslate -= navbarWidth;
          $navEl.transform(`translate3d(${translate}px,0,0)`);
          if (params.iosAnimateNavbarBackIcon) {
            if ($navEl.hasClass('left') && activeNavBackIcon.length > 0) {
              activeNavBackIcon.addClass('navbar-page-transitioning').transform(`translate3d(${iconTranslate}px,0,0)`);
            }
          }
        }).addClass('navbar-page-transitioning');

      previousNavElements
        .transform('')
        .css({ opacity: '' })
        .each((navElIndex, navEl) => {
          const $navEl = $(navEl);
          if ($navEl.hasClass('title-large')) {
            const $titleTextEl = $navEl.find('.title-large-text, .title-large-inner');
            $navEl.css({
              overflow: '',
              opacity: toLarge ? 1 : 0,
            });
            if (pageChanged) {
              if (toLarge) {
                $navEl.transform('translateY(0)');
              }
              $titleTextEl.css({ opacity: '' }).transform('');
            } else {
              // eslint-disable-next-line
              if (toLarge) {
                if (!fromLarge) {
                  $navEl.transform('translateY(calc(-1 * var(--f7-navbar-large-title-height)))');
                  $titleTextEl.css({ opacity: 0 }).transform('scale(0.5)');
                } else {
                  $navEl.transform('translateY(0)');
                  $titleTextEl.css({ opacity: 0 }).transform('translateY(calc(-1 * var(--f7-navbar-large-title-height))) scale(0.5)');
                }
              } else {
                $titleTextEl.transform('');
              }
            }
            return;
          }
          const translate = pageChanged ? 0 : navEl.f7NavbarLeftOffset;
          let iconTranslate = pageChanged ? 0 : -translate;
          if (!separateNavbar && !pageChanged) iconTranslate += navbarWidth / 5;
          $navEl.transform(`translate3d(${translate}px,0,0)`);
          if (params.iosAnimateNavbarBackIcon) {
            if ($navEl.hasClass('left') && previousNavBackIcon.length > 0) {
              previousNavBackIcon.addClass('navbar-page-transitioning').transform(`translate3d(${iconTranslate}px,0,0)`);
            }
          }
        })
        .addClass('navbar-page-transitioning');
    }
    allowViewTouchMove = false;
    router.allowPageChange = false;

    // Swipe Back Callback
    const callbackData = {
      currentPageEl: currentPage[0],
      previousPageEl: previousPage[0],
      currentNavbarEl: currentNavbar[0],
      previousNavbarEl: previousNavbar[0],
    };

    if (pageChanged) {
      // Update Route
      router.currentRoute = previousPage[0].f7Page.route;
      router.currentPage = previousPage[0];

      // Page before animation callback
      router.pageCallback('beforeOut', currentPage, currentNavbar, 'current', 'next', { route: currentPage[0].f7Page.route, swipeBack: true });
      router.pageCallback('beforeIn', previousPage, previousNavbar, 'previous', 'current', { route: previousPage[0].f7Page.route, swipeBack: true });

      $el.trigger('swipeback:beforechange', callbackData);
      router.emit('swipebackBeforeChange', callbackData);
    } else {
      $el.trigger('swipeback:beforereset', callbackData);
      router.emit('swipebackBeforeReset', callbackData);
    }

    currentPage.transitionEnd(() => {
      $([currentPage[0], previousPage[0]]).removeClass('page-transitioning page-transitioning-swipeback');

      if (dynamicNavbar) {
        currentNavElements.removeClass('navbar-page-transitioning')
          .css({ opacity: '', 'transform-origin': '', overflow: '' })
          .transform('')
          .find('.title-large-text, .title-large-inner')
          .css({ opacity: '', 'transform-origin': '' })
          .transform('');
        currentNavElements
          .find('.navbar-page-transitioning')
          .removeClass('navbar-page-transitioning');
        previousNavElements.removeClass('navbar-page-transitioning')
          .css({ opacity: '', 'transform-origin': '', overflow: '' })
          .transform('')
          .find('.title-large-text, .title-large-inner')
          .css({ opacity: '', 'transform-origin': '' })
          .transform('');
        previousNavElements
          .find('.navbar-page-transitioning')
          .removeClass('navbar-page-transitioning');
        if (toLarge && !pageChanged) {
          currentNavElements.find('.left .back span').css('transform-origin', '');
        }
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
        router.pageCallback('afterOut', currentPage, currentNavbar, 'current', 'next', { route: currentPage[0].f7Page.route, swipeBack: true });
        router.pageCallback('afterIn', previousPage, previousNavbar, 'previous', 'current', { route: previousPage[0].f7Page.route, swipeBack: true });

        // Remove Old Page
        if (params.stackPages && router.initialPages.indexOf(currentPage[0]) >= 0) {
          currentPage.addClass('stacked');
          if (separateNavbar) {
            currentNavbar.addClass('stacked');
          }
        } else {
          router.pageCallback('beforeRemove', currentPage, currentNavbar, 'next', { swipeBack: true });
          router.removePage(currentPage);
          if (separateNavbar) {
            router.removeNavbar(currentNavbar);
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
      if (pageShadow && pageShadow.length > 0) pageShadow.remove();
      if (pageOpacity && pageOpacity.length > 0) pageOpacity.remove();
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
