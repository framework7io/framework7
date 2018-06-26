'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _modalClass = require('../modal/modal-class');

var _modalClass2 = _interopRequireDefault(_modalClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popover = function (_Modal) {
  _inherits(Popover, _Modal);

  function Popover(app, params) {
    var _ret3;

    _classCallCheck(this, Popover);

    var extendedParams = _utils2.default.extend({ on: {} }, app.params.popover, params);

    // Extends with open/close Modal methods;

    var _this = _possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).call(this, app, extendedParams));

    var popover = _this;

    popover.params = extendedParams;

    // Find Element
    var $el = void 0;
    if (!popover.params.el) {
      $el = (0, _dom2.default)(popover.params.content);
    } else {
      $el = (0, _dom2.default)(popover.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      var _ret;

      return _ret = $el[0].f7Modal, _possibleConstructorReturn(_this, _ret);
    }

    // Find Target
    var $targetEl = (0, _dom2.default)(popover.params.targetEl).eq(0);

    if ($el.length === 0) {
      var _ret2;

      return _ret2 = popover.destroy(), _possibleConstructorReturn(_this, _ret2);
    }

    // Backdrop
    var $backdropEl = void 0;
    if (popover.params.backdrop) {
      $backdropEl = app.root.children('.popover-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = (0, _dom2.default)('<div class="popover-backdrop"></div>');
        app.root.append($backdropEl);
      }
    }

    // Find Angle
    var $angleEl = void 0;
    if ($el.find('.popover-angle').length === 0) {
      $angleEl = (0, _dom2.default)('<div class="popover-angle"></div>');
      $el.prepend($angleEl);
    } else {
      $angleEl = $el.find('.popover-angle');
    }

    // Open
    var originalOpen = popover.open;

    _utils2.default.extend(popover, {
      app: app,
      $el: $el,
      el: $el[0],
      $targetEl: $targetEl,
      targetEl: $targetEl[0],
      $angleEl: $angleEl,
      angleEl: $angleEl[0],
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'popover',
      open: function open() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var targetEl = args[0],
            animate = args[1];

        if (typeof args[0] === 'boolean') {
          ;
          animate = args[0];
          targetEl = args[1];
        }if (targetEl) {
          popover.$targetEl = (0, _dom2.default)(targetEl);
          popover.targetEl = popover.$targetEl[0];
        }
        originalOpen.call(popover, animate);
      }
    });

    function handleResize() {
      popover.resize();
    }
    popover.on('popoverOpen', function () {
      popover.resize();
      app.on('resize', handleResize);
      popover.on('popoverClose popoverBeforeDestroy', function () {
        app.off('resize', handleResize);
      });
    });

    function handleClick(e) {
      var target = e.target;
      var $target = (0, _dom2.default)(target);
      if ($target.closest(popover.el).length === 0) {
        if (popover.params.closeByBackdropClick && popover.params.backdrop && popover.backdropEl && popover.backdropEl === target) {
          popover.close();
        } else if (popover.params.closeByOutsideClick) {
          popover.close();
        }
      }
    }

    popover.on('popoverOpened', function () {
      if (popover.params.closeByOutsideClick || popover.params.closeByBackdropClick) {
        app.on('click', handleClick);
      }
    });
    popover.on('popoverClose', function () {
      if (popover.params.closeByOutsideClick || popover.params.closeByBackdropClick) {
        app.off('click', handleClick);
      }
    });

    $el[0].f7Modal = popover;

    return _ret3 = popover, _possibleConstructorReturn(_this, _ret3);
  }

  _createClass(Popover, [{
    key: 'resize',
    value: function resize() {
      var popover = this;
      var app = popover.app,
          $el = popover.$el,
          $targetEl = popover.$targetEl,
          $angleEl = popover.$angleEl;
      var _popover$params = popover.params,
          targetX = _popover$params.targetX,
          targetY = _popover$params.targetY;

      $el.css({ left: '', top: '' });
      var _ref = [$el.width(), $el.height()],
          width = _ref[0],
          height = _ref[1];

      var angleSize = 0;
      var angleLeft = void 0;
      var angleTop = void 0;
      if (app.theme === 'ios') {
        $angleEl.removeClass('on-left on-right on-top on-bottom').css({ left: '', top: '' });
        angleSize = $angleEl.width() / 2;
      } else {
        $el.removeClass('popover-on-left popover-on-right popover-on-top popover-on-bottom').css({ left: '', top: '' });
      }

      var targetWidth = void 0;
      var targetHeight = void 0;
      var targetOffsetLeft = void 0;
      var targetOffsetTop = void 0;
      if ($targetEl && $targetEl.length > 0) {
        targetWidth = $targetEl.outerWidth();
        targetHeight = $targetEl.outerHeight();

        var targetOffset = $targetEl.offset();
        targetOffsetLeft = targetOffset.left - app.left;
        targetOffsetTop = targetOffset.top - app.top;

        var targetParentPage = $targetEl.parents('.page');
        if (targetParentPage.length > 0) {
          targetOffsetTop -= targetParentPage[0].scrollTop;
        }
      } else if (typeof targetX !== 'undefined' && targetY !== 'undefined') {
        targetOffsetLeft = targetX;
        targetOffsetTop = targetY;
        targetWidth = popover.params.targetWidth || 0;
        targetHeight = popover.params.targetHeight || 0;
      }

      var left = 0,
          top = 0,
          diff = 0;
      // Top Position

      var position = app.theme === 'md' ? 'bottom' : 'top';
      if (app.theme === 'md') {
        if (height < app.height - targetOffsetTop - targetHeight) {
          // On bottom
          position = 'bottom';
          top = targetOffsetTop;
        } else if (height < targetOffsetTop) {
          // On top
          top = targetOffsetTop - height + targetHeight;
          position = 'top';
        } else {
          // On middle
          position = 'bottom';
          top = targetOffsetTop;
        }

        if (top <= 0) {
          top = 8;
        } else if (top + height >= app.height) {
          top = app.height - height - 8;
        }

        // Horizontal Position
        left = targetOffsetLeft + targetWidth - width - 8;
        if (left + width >= app.width - 8) {
          left = targetOffsetLeft + targetWidth - width - 8;
        }
        if (left < 8) {
          left = 8;
        }
        if (position === 'top') {
          $el.addClass('popover-on-top');
        }
        if (position === 'bottom') {
          $el.addClass('popover-on-bottom');
        }
      } else {
        if (height + angleSize < targetOffsetTop) {
          // On top
          top = targetOffsetTop - height - angleSize;
        } else if (height + angleSize < app.height - targetOffsetTop - targetHeight) {
          // On bottom
          position = 'bottom';
          top = targetOffsetTop + targetHeight + angleSize;
        } else {
          // On middle
          position = 'middle';
          top = targetHeight / 2 + targetOffsetTop - height / 2;
          diff = top;
          if (top <= 0) {
            top = 5;
          } else if (top + height >= app.height) {
            top = app.height - height - 5;
          }
          diff -= top;
        }

        // Horizontal Position
        if (position === 'top' || position === 'bottom') {
          left = targetWidth / 2 + targetOffsetLeft - width / 2;
          diff = left;
          if (left < 5) left = 5;
          if (left + width > app.width) left = app.width - width - 5;
          if (left < 0) left = 0;
          if (position === 'top') {
            $angleEl.addClass('on-bottom');
          }
          if (position === 'bottom') {
            $angleEl.addClass('on-top');
          }
          diff -= left;
          angleLeft = width / 2 - angleSize + diff;
          angleLeft = Math.max(Math.min(angleLeft, width - angleSize * 2 - 13), 13);
          $angleEl.css({ left: angleLeft + 'px' });
        } else if (position === 'middle') {
          left = targetOffsetLeft - width - angleSize;
          $angleEl.addClass('on-right');
          if (left < 5 || left + width > app.width) {
            if (left < 5) left = targetOffsetLeft + targetWidth + angleSize;
            if (left + width > app.width) left = app.width - width - 5;
            $angleEl.removeClass('on-right').addClass('on-left');
          }
          angleTop = height / 2 - angleSize + diff;
          angleTop = Math.max(Math.min(angleTop, height - angleSize * 2 - 13), 13);
          $angleEl.css({ top: angleTop + 'px' });
        }
      }

      // Apply Styles
      $el.css({ top: top + 'px', left: left + 'px' });
    }
  }]);

  return Popover;
}(_modalClass2.default);

exports.default = Popover;