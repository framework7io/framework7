
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

  var Notification = (function (Modal$$1) {
    function Notification(app, params) {
      var extendedParams = Utils.extend({
        on: {},
      }, app.params.notification, params);

      // Extends with open/close Modal methods;
      Modal$$1.call(this, app, extendedParams);

      var notification = this;

      notification.app = app;

      notification.params = extendedParams;

      var ref = notification.params;
      var icon = ref.icon;
      var title = ref.title;
      var titleRightText = ref.titleRightText;
      var subtitle = ref.subtitle;
      var text = ref.text;
      var closeButton = ref.closeButton;
      var closeTimeout = ref.closeTimeout;
      var cssClass = ref.cssClass;
      var closeOnClick = ref.closeOnClick;

      var $el;
      if (!notification.params.el) {
        // Find Element
        var notificationHtml = notification.render({
          icon: icon,
          title: title,
          titleRightText: titleRightText,
          subtitle: subtitle,
          text: text,
          closeButton: closeButton,
          cssClass: cssClass,
        });

        $el = $(notificationHtml);
      } else {
        $el = $(notification.params.el);
      }

      if ($el && $el.length > 0 && $el[0].f7Modal) {
        return $el[0].f7Modal;
      }

      if ($el.length === 0) {
        return notification.destroy();
      }

      Utils.extend(notification, {
        $el: $el,
        el: $el[0],
        type: 'notification',
      });

      $el[0].f7Modal = notification;

      if (closeButton) {
        $el.find('.notification-close-button').on('click', function () {
          notification.close();
        });
      }
      $el.on('click', function (e) {
        if (closeButton && $(e.target).closest('.notification-close-button').length) {
          return;
        }
        notification.emit('local::click notificationClick', notification);
        if (closeOnClick) { notification.close(); }
      });

      notification.on('beforeDestroy', function () {
        $el.off('click');
      });

      /* Touch Events */
      var isTouched;
      var isMoved;
      var isScrolling;
      var touchesDiff;
      var touchStartTime;
      var notificationHeight;
      var touchesStart = {};
      function handleTouchStart(e) {
        if (isTouched) { return; }
        isTouched = true;
        isMoved = false;
        isScrolling = undefined;
        touchStartTime = Utils.now();
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      }
      function handleTouchMove(e) {
        if (!isTouched) { return; }
        var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if (typeof isScrolling === 'undefined') {
          isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) < Math.abs(pageX - touchesStart.x));
        }
        if (isScrolling) {
          isTouched = false;
          return;
        }
        e.preventDefault();
        if (!isMoved) {
          notification.$el.removeClass('notification-transitioning');
          notification.$el.transition(0);
          notificationHeight = notification.$el[0].offsetHeight / 2;
        }
        isMoved = true;
        touchesDiff = (pageY - touchesStart.y);
        var newTranslate = touchesDiff;
        if (touchesDiff > 0) {
          newTranslate = Math.pow( touchesDiff, 0.8 );
        }
        notification.$el.transform(("translate3d(0, " + newTranslate + "px, 0)"));
      }
      function handleTouchEnd() {
        if (!isTouched || !isMoved) {
          isTouched = false;
          isMoved = false;
          return;
        }
        isTouched = false;
        isMoved = false;
        if (touchesDiff === 0) {
          return;
        }

        var timeDiff = Utils.now() - touchStartTime;
        notification.$el.transition('');
        notification.$el.addClass('notification-transitioning');
        notification.$el.transform('');

        if (
          (touchesDiff < -10 && timeDiff < 300)
          || (-touchesDiff >= notificationHeight / 1)
        ) {
          notification.close();
        }
      }

      function attachTouchEvents() {
        {
          notification.$el.on(app.touchEvents.start, handleTouchStart, { passive: true });
          app.on('touchmove:active', handleTouchMove);
          app.on('touchend:passive', handleTouchEnd);
        }
      }
      function detachTouchEvents() {
        {
          notification.$el.off(app.touchEvents.start, handleTouchStart, { passive: true });
          app.off('touchmove:active', handleTouchMove);
          app.off('touchend:passive', handleTouchEnd);
        }
      }

      var timeoutId;
      function closeOnTimeout() {
        timeoutId = Utils.nextTick(function () {
          if (isTouched && isMoved) {
            closeOnTimeout();
            return;
          }
          notification.close();
        }, closeTimeout);
      }
      notification.on('open', function () {
        if (notification.params.swipeToClose) {
          attachTouchEvents();
        }
        $('.notification.modal-in').each(function (index, openedEl) {
          var notificationInstance = app.notification.get(openedEl);
          if (openedEl !== notification.el && notificationInstance) {
            notificationInstance.close();
          }
        });
        if (closeTimeout) {
          closeOnTimeout();
        }
      });
      notification.on('close beforeDestroy', function () {
        if (notification.params.swipeToClose) {
          detachTouchEvents();
        }
        win.clearTimeout(timeoutId);
      });

      return notification;
    }

    if ( Modal$$1 ) Notification.__proto__ = Modal$$1;
    Notification.prototype = Object.create( Modal$$1 && Modal$$1.prototype );
    Notification.prototype.constructor = Notification;

    Notification.prototype.render = function render () {
      var notification = this;
      if (notification.params.render) { return notification.params.render.call(notification, notification); }
      var ref = notification.params;
      var icon = ref.icon;
      var title = ref.title;
      var titleRightText = ref.titleRightText;
      var subtitle = ref.subtitle;
      var text = ref.text;
      var closeButton = ref.closeButton;
      var cssClass = ref.cssClass;
      return ("\n      <div class=\"notification " + (cssClass || '') + "\">\n        <div class=\"notification-header\">\n          " + (icon ? ("<div class=\"notification-icon\">" + icon + "</div>") : '') + "\n          " + (title ? ("<div class=\"notification-title\">" + title + "</div>") : '') + "\n          " + (titleRightText ? ("<div class=\"notification-title-right-text\">" + titleRightText + "</div>") : '') + "\n          " + (closeButton ? '<span class="notification-close-button"></span>' : '') + "\n        </div>\n        <div class=\"notification-content\">\n          " + (subtitle ? ("<div class=\"notification-subtitle\">" + subtitle + "</div>") : '') + "\n          " + (text ? ("<div class=\"notification-text\">" + text + "</div>") : '') + "\n        </div>\n      </div>\n    ").trim();
    };

    return Notification;
  }(Modal));

  var notification = {
    name: 'notification',
    static: {
      Notification: Notification,
    },
    create: function create() {
      var app = this;
      app.notification = Utils.extend(
        {},
        ModalMethods({
          app: app,
          constructor: Notification,
          defaultSelector: '.notification.modal-in',
        })
      );
    },
    params: {
      notification: {
        icon: null,
        title: null,
        titleRightText: null,
        subtitle: null,
        text: null,
        closeButton: false,
        closeTimeout: null,
        closeOnClick: false,
        swipeToClose: true,
        cssClass: null,
        render: null,
      },
    },
  };

  return notification;
}
framework7ComponentLoader.componentName = 'notification';

