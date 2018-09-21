
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

  var PullToRefresh = (function (Framework7Class$$1) {
    function PullToRefresh(app, el) {
      Framework7Class$$1.call(this, {}, [app]);
      var ptr = this;
      var $el = $(el);
      var $preloaderEl = $el.find('.ptr-preloader');

      ptr.$el = $el;
      ptr.el = $el[0];
      ptr.app = app;

      // Extend defaults with modules params
      ptr.useModulesParams({});

      var isMaterial = app.theme === 'md';

      // Done
      ptr.done = function done() {
        var $transitionTarget = isMaterial ? $preloaderEl : $el;
        $transitionTarget.transitionEnd(function () {
          $el.removeClass('ptr-transitioning ptr-pull-up ptr-pull-down');
          $el.trigger('ptr:done');
          ptr.emit('local::done ptrDone', $el[0]);
        });
        $el.removeClass('ptr-refreshing').addClass('ptr-transitioning');
        return ptr;
      };

      ptr.refresh = function refresh() {
        if ($el.hasClass('ptr-refreshing')) { return ptr; }
        $el.addClass('ptr-transitioning ptr-refreshing');
        $el.trigger('ptr:refresh', ptr.done);
        ptr.emit('local::refresh ptrRefresh', $el[0], ptr.done);
        return ptr;
      };

      // Events handling
      var touchId;
      var isTouched;
      var isMoved;
      var touchesStart = {};
      var isScrolling;
      var touchesDiff;
      var refresh = false;
      var useTranslate = false;
      var startTranslate = 0;
      var translate;
      var scrollTop;
      var wasScrolled;
      var triggerDistance;
      var dynamicTriggerDistance;
      var pullStarted;
      var hasNavbar = false;
      var $pageEl = $el.parents('.page');

      if ($pageEl.find('.navbar').length > 0 || $pageEl.parents('.view').children('.navbar').length > 0) { hasNavbar = true; }
      if ($pageEl.hasClass('no-navbar')) { hasNavbar = false; }
      if (!hasNavbar) { $el.addClass('ptr-no-navbar'); }

      // Define trigger distance
      if ($el.attr('data-ptr-distance')) {
        dynamicTriggerDistance = true;
      } else {
        triggerDistance = isMaterial ? 66 : 44;
      }

      function handleTouchStart(e) {
        if (isTouched) {
          if (Device.os === 'android') {
            if ('targetTouches' in e && e.targetTouches.length > 1) { return; }
          } else { return; }
        }

        if ($el.hasClass('ptr-refreshing')) {
          return;
        }
        if ($(e.target).closest('.sortable-handler').length) { return; }

        isMoved = false;
        pullStarted = false;
        isTouched = true;
        isScrolling = undefined;
        wasScrolled = undefined;
        if (e.type === 'touchstart') { touchId = e.targetTouches[0].identifier; }
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      }

      function handleTouchMove(e) {
        if (!isTouched) { return; }
        var pageX;
        var pageY;
        var touch;
        if (e.type === 'touchmove') {
          if (touchId && e.touches) {
            for (var i = 0; i < e.touches.length; i += 1) {
              if (e.touches[i].identifier === touchId) {
                touch = e.touches[i];
              }
            }
          }
          if (!touch) { touch = e.targetTouches[0]; }
          pageX = touch.pageX;
          pageY = touch.pageY;
        } else {
          pageX = e.pageX;
          pageY = e.pageY;
        }
        if (!pageX || !pageY) { return; }


        if (typeof isScrolling === 'undefined') {
          isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
        }
        if (!isScrolling) {
          isTouched = false;
          return;
        }

        scrollTop = $el[0].scrollTop;
        if (typeof wasScrolled === 'undefined' && scrollTop !== 0) { wasScrolled = true; }

        if (!isMoved) {
          $el.removeClass('ptr-transitioning');
          if (scrollTop > $el[0].offsetHeight) {
            isTouched = false;
            return;
          }
          if (dynamicTriggerDistance) {
            triggerDistance = $el.attr('data-ptr-distance');
            if (triggerDistance.indexOf('%') >= 0) { triggerDistance = ($el[0].offsetHeight * parseInt(triggerDistance, 10)) / 100; }
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
          if (Device.os === 'ios' && parseInt(Device.osVersion.split('.')[0], 10) > 7 && scrollTop === 0 && !wasScrolled) { useTranslate = true; }

          if (useTranslate) {
            e.preventDefault();
            translate = (Math.pow( touchesDiff, 0.85 )) + startTranslate;
            if (isMaterial) {
              $preloaderEl.transform(("translate3d(0," + translate + "px,0)"))
                .find('.ptr-arrow').transform(("rotate(" + ((180 * (touchesDiff / 66)) + 100) + "deg)"));
            } else {
              $el.transform(("translate3d(0," + translate + "px,0)"));
            }
          }
          if ((useTranslate && (Math.pow( touchesDiff, 0.85 )) > triggerDistance) || (!useTranslate && touchesDiff >= triggerDistance * 2)) {
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
            scrollTop: scrollTop,
            translate: translate,
            touchesDiff: touchesDiff,
          });
          ptr.emit('local::pullMove ptrPullMove', $el[0], {
            event: e,
            scrollTop: scrollTop,
            translate: translate,
            touchesDiff: touchesDiff,
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

      if (!$pageEl.length || !$el.length) { return ptr; }

      $el[0].f7PullToRefresh = ptr;

      // Events
      ptr.attachEvents = function attachEvents() {
        var passive = Support.passiveListener ? { passive: true } : false;
        $el.on(app.touchEvents.start, handleTouchStart, passive);
        app.on('touchmove', handleTouchMove);
        app.on('touchend:passive', handleTouchEnd);
      };
      ptr.detachEvents = function detachEvents() {
        var passive = Support.passiveListener ? { passive: true } : false;
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

    if ( Framework7Class$$1 ) PullToRefresh.__proto__ = Framework7Class$$1;
    PullToRefresh.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    PullToRefresh.prototype.constructor = PullToRefresh;

    PullToRefresh.prototype.init = function init () {
      var ptr = this;
      ptr.attachEvents();
    };

    PullToRefresh.prototype.destroy = function destroy () {
      var ptr = this;
      ptr.emit('local::beforeDestroy ptrBeforeDestroy', ptr);
      ptr.$el.trigger('ptr:beforedestroy', ptr);
      delete ptr.el.f7PullToRefresh;
      ptr.detachEvents();
      Utils.deleteProps(ptr);
      ptr = null;
    };

    return PullToRefresh;
  }(Framework7Class));

  var pullToRefresh = {
    name: 'pullToRefresh',
    create: function create() {
      var app = this;
      app.ptr = Utils.extend(
        ConstructorMethods({
          defaultSelector: '.ptr-content',
          constructor: PullToRefresh,
          app: app,
          domProp: 'f7PullToRefresh',
        }),
        {
          done: function done(el) {
            var ptr = app.ptr.get(el);
            if (ptr) { return ptr.done(); }
            return undefined;
          },
          refresh: function refresh(el) {
            var ptr = app.ptr.get(el);
            if (ptr) { return ptr.refresh(); }
            return undefined;
          },
        }
      );
    },
    static: {
      PullToRefresh: PullToRefresh,
    },
    on: {
      tabMounted: function tabMounted(tabEl) {
        var app = this;
        var $tabEl = $(tabEl);
        $tabEl.find('.ptr-content').each(function (index, el) {
          app.ptr.create(el);
        });
      },
      tabBeforeRemove: function tabBeforeRemove(tabEl) {
        var $tabEl = $(tabEl);
        var app = this;
        $tabEl.find('.ptr-content').each(function (index, el) {
          app.ptr.destroy(el);
        });
      },
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.ptr-content').each(function (index, el) {
          app.ptr.create(el);
        });
      },
      pageBeforeRemove: function pageBeforeRemove(page) {
        var app = this;
        page.$el.find('.ptr-content').each(function (index, el) {
          app.ptr.destroy(el);
        });
      },
    },
  };

  return pullToRefresh;
}
framework7ComponentLoader.componentName = 'pullToRefresh';

