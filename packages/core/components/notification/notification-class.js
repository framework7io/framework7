'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _ssrWindow = require('ssr-window');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _modalClass = require('../modal/modal-class');

var _modalClass2 = _interopRequireDefault(_modalClass);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Notification = function (_Modal) {
  _inherits(Notification, _Modal);

  function Notification(app, params) {
    var _ret3;

    _classCallCheck(this, Notification);

    var extendedParams = _utils2.default.extend({
      on: {}
    }, app.params.notification, params);

    // Extends with open/close Modal methods;

    var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, app, extendedParams));

    var notification = _this;

    notification.app = app;

    notification.params = extendedParams;

    var _notification$params = notification.params,
        icon = _notification$params.icon,
        title = _notification$params.title,
        titleRightText = _notification$params.titleRightText,
        subtitle = _notification$params.subtitle,
        text = _notification$params.text,
        closeButton = _notification$params.closeButton,
        closeTimeout = _notification$params.closeTimeout,
        cssClass = _notification$params.cssClass,
        closeOnClick = _notification$params.closeOnClick;

    var $el = void 0;
    if (!notification.params.el) {
      // Find Element
      var notificationHtml = notification.render({
        icon: icon,
        title: title,
        titleRightText: titleRightText,
        subtitle: subtitle,
        text: text,
        closeButton: closeButton,
        cssClass: cssClass
      });

      $el = (0, _dom2.default)(notificationHtml);
    } else {
      $el = (0, _dom2.default)(notification.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      var _ret;

      return _ret = $el[0].f7Modal, _possibleConstructorReturn(_this, _ret);
    }

    if ($el.length === 0) {
      var _ret2;

      return _ret2 = notification.destroy(), _possibleConstructorReturn(_this, _ret2);
    }

    _utils2.default.extend(notification, {
      $el: $el,
      el: $el[0],
      type: 'notification'
    });

    $el[0].f7Modal = notification;

    if (closeButton) {
      $el.find('.notification-close-button').on('click', function () {
        notification.close();
      });
    }
    $el.on('click', function (e) {
      if (closeButton && (0, _dom2.default)(e.target).closest('.notification-close-button').length) {
        return;
      }
      notification.emit('local::click notificationClick', notification);
      if (closeOnClick) notification.close();
    });

    notification.on('beforeDestroy', function () {
      $el.off('click');
    });

    /* Touch Events */
    var isTouched = void 0;
    var isMoved = void 0;
    var isScrolling = void 0;
    var touchesDiff = void 0;
    var touchStartTime = void 0;
    var notificationHeight = void 0;
    var touchesStart = {};
    function handleTouchStart(e) {
      if (isTouched) return;
      isTouched = true;
      isMoved = false;
      isScrolling = undefined;
      touchStartTime = _utils2.default.now();
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    }
    function handleTouchMove(e) {
      if (!isTouched) return;
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
      touchesDiff = pageY - touchesStart.y;
      var newTranslate = touchesDiff;
      if (touchesDiff > 0) {
        newTranslate = Math.pow(touchesDiff, 0.8);
      }
      notification.$el.transform('translate3d(0, ' + newTranslate + 'px, 0)');
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

      var timeDiff = _utils2.default.now() - touchStartTime;
      notification.$el.transition('');
      notification.$el.addClass('notification-transitioning');
      notification.$el.transform('');

      if (touchesDiff < -10 && timeDiff < 300 || -touchesDiff >= notificationHeight / 1) {
        notification.close();
      }
    }

    function attachTouchEvents() {
      if ("universal" !== 'desktop') {
        notification.$el.on(app.touchEvents.start, handleTouchStart, { passive: true });
        app.on('touchmove:active', handleTouchMove);
        app.on('touchend:passive', handleTouchEnd);
      }
    }
    function detachTouchEvents() {
      if (process.env.TARGET !== 'desktop') {
        notification.$el.off(app.touchEvents.start, handleTouchStart, { passive: true });
        app.off('touchmove:active', handleTouchMove);
        app.off('touchend:passive', handleTouchEnd);
      }
    }

    var timeoutId = void 0;
    function closeOnTimeout() {
      timeoutId = _utils2.default.nextTick(function () {
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
      (0, _dom2.default)('.notification.modal-in').each(function (index, openedEl) {
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
      _ssrWindow.window.clearTimeout(timeoutId);
    });

    return _ret3 = notification, _possibleConstructorReturn(_this, _ret3);
  }

  _createClass(Notification, [{
    key: 'render',
    value: function render() {
      var notification = this;
      if (notification.params.render) return notification.params.render.call(notification, notification);
      var _notification$params2 = notification.params,
          icon = _notification$params2.icon,
          title = _notification$params2.title,
          titleRightText = _notification$params2.titleRightText,
          subtitle = _notification$params2.subtitle,
          text = _notification$params2.text,
          closeButton = _notification$params2.closeButton,
          cssClass = _notification$params2.cssClass;

      return ('\n      <div class="notification ' + (cssClass || '') + '">\n        <div class="notification-header">\n          ' + (icon ? '<div class="notification-icon">' + icon + '</div>' : '') + '\n          ' + (title ? '<div class="notification-title">' + title + '</div>' : '') + '\n          ' + (titleRightText ? '<div class="notification-title-right-text">' + titleRightText + '</div>' : '') + '\n          ' + (closeButton ? '<span class="notification-close-button"></span>' : '') + '\n        </div>\n        <div class="notification-content">\n          ' + (subtitle ? '<div class="notification-subtitle">' + subtitle + '</div>' : '') + '\n          ' + (text ? '<div class="notification-text">' + text + '</div>' : '') + '\n        </div>\n      </div>\n    ').trim();
    }
  }]);

  return Notification;
}(_modalClass2.default);

exports.default = Notification;