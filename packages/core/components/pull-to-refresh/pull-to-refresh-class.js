import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';
import Support from '../../utils/support';
import Device from '../../utils/device';

class PullToRefresh extends Framework7Class {
  constructor(app, el) {
    super({}, [app]);
    const ptr = this;
    const $el = $(el);
    const $preloaderEl = $el.find('.ptr-preloader');

    ptr.$el = $el;
    ptr.el = $el[0];
    ptr.app = app;

    // Extend defaults with modules params
    ptr.useModulesParams({});

    const isMaterial = app.theme === 'md';

    // Done
    ptr.done = function done() {
      const $transitionTarget = isMaterial ? $preloaderEl : $el;
      $transitionTarget.transitionEnd(() => {
        $el.removeClass('ptr-transitioning ptr-pull-up ptr-pull-down');
        $el.trigger('ptr:done');
        ptr.emit('local::done ptrDone', $el[0]);
      });
      $el.removeClass('ptr-refreshing').addClass('ptr-transitioning');
      return ptr;
    };

    ptr.refresh = function refresh() {
      if ($el.hasClass('ptr-refreshing')) return ptr;
      $el.addClass('ptr-transitioning ptr-refreshing');
      $el.trigger('ptr:refresh', ptr.done);
      ptr.emit('local::refresh ptrRefresh', $el[0], ptr.done);
      return ptr;
    };

    // Events handling
    let touchId;
    let isTouched;
    let isMoved;
    const touchesStart = {};
    let isScrolling;
    let touchesDiff;
    let refresh = false;
    let useTranslate = false;
    let startTranslate = 0;
    let translate;
    let scrollTop;
    let wasScrolled;
    let triggerDistance;
    let dynamicTriggerDistance;
    let pullStarted;
    let hasNavbar = false;
    const $pageEl = $el.parents('.page');

    if ($pageEl.find('.navbar').length > 0 || $pageEl.parents('.view').children('.navbar').length > 0) hasNavbar = true;
    if ($pageEl.hasClass('no-navbar')) hasNavbar = false;
    if (!hasNavbar) $el.addClass('ptr-no-navbar');

    // Define trigger distance
    if ($el.attr('data-ptr-distance')) {
      dynamicTriggerDistance = true;
    } else {
      triggerDistance = isMaterial ? 66 : 44;
    }

    function handleTouchStart(e) {
      if (isTouched) {
        if (Device.os === 'android') {
          if ('targetTouches' in e && e.targetTouches.length > 1) return;
        } else return;
      }

      if ($el.hasClass('ptr-refreshing')) {
        return;
      }
      if ($(e.target).closest('.sortable-handler').length) return;

      isMoved = false;
      pullStarted = false;
      isTouched = true;
      isScrolling = undefined;
      wasScrolled = undefined;
      if (e.type === 'touchstart') touchId = e.targetTouches[0].identifier;
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    }

    function handleTouchMove(e) {
      if (!isTouched) return;
      let pageX;
      let pageY;
      let touch;
      if (e.type === 'touchmove') {
        if (touchId && e.touches) {
          for (let i = 0; i < e.touches.length; i += 1) {
            if (e.touches[i].identifier === touchId) {
              touch = e.touches[i];
            }
          }
        }
        if (!touch) touch = e.targetTouches[0];
        pageX = touch.pageX;
        pageY = touch.pageY;
      } else {
        pageX = e.pageX;
        pageY = e.pageY;
      }
      if (!pageX || !pageY) return;


      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (!isScrolling) {
        isTouched = false;
        return;
      }

      scrollTop = $el[0].scrollTop;
      if (typeof wasScrolled === 'undefined' && scrollTop !== 0) wasScrolled = true;

      if (!isMoved) {
        $el.removeClass('ptr-transitioning');
        if (scrollTop > $el[0].offsetHeight) {
          isTouched = false;
          return;
        }
        if (dynamicTriggerDistance) {
          triggerDistance = $el.attr('data-ptr-distance');
          if (triggerDistance.indexOf('%') >= 0) triggerDistance = ($el[0].offsetHeight * parseInt(triggerDistance, 10)) / 100;
        }
        startTranslate = $el.hasClass('ptr-refreshing') ? triggerDistance : 0;
        if ($el[0].scrollHeight === $el[0].offsetHeight || Device.os !== 'ios' || isMaterial) {
          useTranslate = true;
        } else {
          useTranslate = false;
        }
      }
      isMoved = true;
      touchesDiff = pageY - touchesStart.y;

      if ((touchesDiff > 0 && scrollTop <= 0) || scrollTop < 0) {
        // iOS 8 fix
        if (Device.os === 'ios' && parseInt(Device.osVersion.split('.')[0], 10) > 7 && scrollTop === 0 && !wasScrolled) useTranslate = true;

        if (useTranslate) {
          e.preventDefault();
          translate = (touchesDiff ** 0.85) + startTranslate;
          if (isMaterial) {
            $preloaderEl.transform(`translate3d(0,${translate}px,0)`)
              .find('.ptr-arrow').transform(`rotate(${(180 * (touchesDiff / 66)) + 100}deg)`);
          } else {
            $el.transform(`translate3d(0,${translate}px,0)`);
          }
        }
        if ((useTranslate && (touchesDiff ** 0.85) > triggerDistance) || (!useTranslate && touchesDiff >= triggerDistance * 2)) {
          refresh = true;
          $el.addClass('ptr-pull-up').removeClass('ptr-pull-down');
        } else {
          refresh = false;
          $el.removeClass('ptr-pull-up').addClass('ptr-pull-down');
        }
        if (!pullStarted) {
          $el.trigger('ptr:pullstart');
          ptr.emit('local::pullStart ptrPullStart', $el[0]);
          pullStarted = true;
        }
        $el.trigger('ptr:pullmove', {
          event: e,
          scrollTop,
          translate,
          touchesDiff,
        });
        ptr.emit('local::pullMove ptrPullMove', $el[0], {
          event: e,
          scrollTop,
          translate,
          touchesDiff,
        });
      } else {
        pullStarted = false;
        $el.removeClass('ptr-pull-up ptr-pull-down');
        refresh = false;
      }
    }
    function handleTouchEnd(e) {
      if (e.type === 'touchend' && e.changedTouches && e.changedTouches.length > 0 && touchId) {
        if (e.changedTouches[0].identifier !== touchId) {
          isTouched = false;
          isScrolling = false;
          isMoved = false;
          touchId = null;
          return;
        }
      }
      if (!isTouched || !isMoved) {
        isTouched = false;
        isMoved = false;
        return;
      }
      if (translate) {
        $el.addClass('ptr-transitioning');
        translate = 0;
      }
      if (isMaterial) {
        $preloaderEl.transform('')
          .find('.ptr-arrow').transform('');
      } else {
        $el.transform('');
      }

      if (refresh) {
        $el.addClass('ptr-refreshing');
        $el.trigger('ptr:refresh', ptr.done);
        ptr.emit('local::refresh ptrRefresh', $el[0], ptr.done);
      } else {
        $el.removeClass('ptr-pull-down');
      }
      isTouched = false;
      isMoved = false;
      if (pullStarted) {
        $el.trigger('ptr:pullend');
        ptr.emit('local::pullEnd ptrPullEnd', $el[0]);
      }
    }

    if (!$pageEl.length || !$el.length) return ptr;

    $el[0].f7PullToRefresh = ptr;

    // Events
    ptr.attachEvents = function attachEvents() {
      const passive = Support.passiveListener ? { passive: true } : false;
      $el.on(app.touchEvents.start, handleTouchStart, passive);
      app.on('touchmove', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
    };
    ptr.detachEvents = function detachEvents() {
      const passive = Support.passiveListener ? { passive: true } : false;
      $el.off(app.touchEvents.start, handleTouchStart, passive);
      app.off('touchmove', handleTouchMove);
      app.off('touchend:passive', handleTouchEnd);
    };

    // Install Modules
    ptr.useModules();

    // Init
    ptr.init();

    return ptr;
  }

  init() {
    const ptr = this;
    ptr.attachEvents();
  }

  destroy() {
    let ptr = this;
    ptr.emit('local::beforeDestroy ptrBeforeDestroy', ptr);
    ptr.$el.trigger('ptr:beforedestroy', ptr);
    delete ptr.el.f7PullToRefresh;
    ptr.detachEvents();
    Utils.deleteProps(ptr);
    ptr = null;
  }
}

export default PullToRefresh;
