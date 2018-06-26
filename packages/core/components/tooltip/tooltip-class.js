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

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _support = require('../../utils/support');

var _support2 = _interopRequireDefault(_support);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

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

var Tooltip = function (_Framework7Class) {
  _inherits(Tooltip, _Framework7Class);

  function Tooltip(app) {
    var _ret, _ret2, _ret3;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, app, params));

    var tooltip = _this;

    var defaults = _utils2.default.extend({}, app.params.tooltip);

    // Extend defaults with modules params
    tooltip.useModulesParams(defaults);

    tooltip.params = _utils2.default.extend(defaults, params);

    var targetEl = tooltip.params.targetEl;

    if (!targetEl) return _ret = tooltip, _possibleConstructorReturn(_this, _ret);

    var $targetEl = (0, _dom2.default)(targetEl);
    if ($targetEl.length === 0) return _ret2 = tooltip, _possibleConstructorReturn(_this, _ret2);

    var $el = (0, _dom2.default)(tooltip.render()).eq(0);

    _utils2.default.extend(tooltip, {
      app: app,
      $targetEl: $targetEl,
      targetEl: $targetEl && $targetEl[0],
      $el: $el,
      el: $el && $el[0],
      text: tooltip.params.text || '',
      visible: false,
      opened: false
    });

    $targetEl[0].f7Tooltip = tooltip;

    var touchesStart = {};
    var isTouched = void 0;
    function handleTouchStart(e) {
      if (isTouched) return;
      isTouched = true;
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      tooltip.show(this);
    }
    function handleTouchMove(e) {
      if (!isTouched) return;
      var x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      var y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      var distance = Math.pow(Math.pow(x - touchesStart.x, 2) + Math.pow(y - touchesStart.y, 2), 0.5);
      if (distance > 50) {
        isTouched = false;
        tooltip.hide();
      }
    }
    function handleTouchEnd() {
      if (!isTouched) return;
      isTouched = false;
      tooltip.hide();
    }
    function handleMouseEnter() {
      tooltip.show(this);
    }
    function handleMouseLeave() {
      tooltip.hide();
    }
    function handleTransitionEnd() {
      if (!$el.hasClass('tooltip-in')) {
        $el.removeClass('tooltip-out').remove();
      }
    }

    tooltip.attachEvents = function attachEvents() {
      if (_support2.default.touch) {
        var passive = _support2.default.passiveListener ? { passive: true } : false;
        $targetEl.on(app.touchEvents.start, handleTouchStart, passive);
        app.on('touchmove', handleTouchMove);
        app.on('touchend:passive', handleTouchEnd);
        return;
      }
      $el.on('transitionend webkitTransitionEnd', handleTransitionEnd);
      $targetEl.on('mouseenter', handleMouseEnter);
      $targetEl.on('mouseleave', handleMouseLeave);
    };
    tooltip.detachEvents = function detachEvents() {
      if (_support2.default.touch) {
        var passive = _support2.default.passiveListener ? { passive: true } : false;
        $targetEl.off(app.touchEvents.start, handleTouchStart, passive);
        app.off('touchmove', handleTouchMove);
        app.off('touchend:passive', handleTouchEnd);
        return;
      }
      $el.off('transitionend webkitTransitionEnd', handleTransitionEnd);
      $targetEl.off('mouseenter', handleMouseEnter);
      $targetEl.off('mouseleave', handleMouseLeave);
    };

    // Install Modules
    tooltip.useModules();

    tooltip.init();

    return _ret3 = tooltip, _possibleConstructorReturn(_this, _ret3);
  }

  _createClass(Tooltip, [{
    key: 'position',
    value: function position(targetEl) {
      var tooltip = this;
      var $el = tooltip.$el,
          app = tooltip.app;

      $el.css({ left: '', top: '' });
      var $targetEl = (0, _dom2.default)(targetEl || tooltip.el);
      var _ref = [$el.width(), $el.height()],
          width = _ref[0],
          height = _ref[1];

      $el.css({ left: '', top: '' });

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
      }
      var _ref2 = [0, 0, 0],
          left = _ref2[0],
          top = _ref2[1];

      // Top Position

      var position = 'top';

      if (height < targetOffsetTop) {
        // On top
        top = targetOffsetTop - height;
      } else if (height < app.height - targetOffsetTop - targetHeight) {
        // On bottom
        position = 'bottom';
        top = targetOffsetTop + targetHeight;
      } else {
        // On middle
        position = 'middle';
        top = targetHeight / 2 + targetOffsetTop - height / 2;
        if (top <= 0) {
          top = 8;
        } else if (top + height >= app.height) {
          top = app.height - height - 8;
        }
      }

      // Horizontal Position
      if (position === 'top' || position === 'bottom') {
        left = targetWidth / 2 + targetOffsetLeft - width / 2;
        if (left < 8) left = 8;
        if (left + width > app.width) left = app.width - width - 8;
        if (left < 0) left = 0;
      } else if (position === 'middle') {
        left = targetOffsetLeft - width;
        if (left < 8 || left + width > app.width) {
          if (left < 8) left = targetOffsetLeft + targetWidth;
          if (left + width > app.width) left = app.width - width - 8;
        }
      }

      // Apply Styles
      $el.css({ top: top + 'px', left: left + 'px' });
    }
  }, {
    key: 'show',
    value: function show(aroundEl) {
      var tooltip = this;
      var app = tooltip.app,
          $el = tooltip.$el,
          $targetEl = tooltip.$targetEl;

      app.root.append($el);
      tooltip.position(aroundEl);
      var $aroundEl = (0, _dom2.default)(aroundEl);
      tooltip.visible = true;
      tooltip.opened = true;
      $targetEl.trigger('tooltip:show', tooltip);
      $el.trigger('tooltip:show', tooltip);
      if ($aroundEl.length && $aroundEl[0] !== $targetEl[0]) {
        $aroundEl.trigger('tooltip:show', tooltip);
      }
      tooltip.emit('local::show tooltipShow', tooltip);
      $el.removeClass('tooltip-out').addClass('tooltip-in');
      return tooltip;
    }
  }, {
    key: 'hide',
    value: function hide() {
      var tooltip = this;
      var $el = tooltip.$el,
          $targetEl = tooltip.$targetEl;

      tooltip.visible = false;
      tooltip.opened = false;
      $targetEl.trigger('tooltip:hide', tooltip);
      $el.trigger('tooltip:hide', tooltip);
      tooltip.emit('local::hide tooltipHide', tooltip);
      $el.addClass('tooltip-out').removeClass('tooltip-in');
      return tooltip;
    }
  }, {
    key: 'render',
    value: function render() {
      var tooltip = this;
      if (tooltip.params.render) return tooltip.params.render.call(tooltip, tooltip);
      var _tooltip$params = tooltip.params,
          cssClass = _tooltip$params.cssClass,
          text = _tooltip$params.text;

      return ('\n      <div class="tooltip ' + (cssClass || '') + '">\n        <div class="tooltip-content">' + (text || '') + '</div>\n      </div>\n    ').trim();
    }
  }, {
    key: 'setText',
    value: function setText(newText) {
      var tooltip = this;
      if (typeof newText === 'undefined') {
        return tooltip;
      }
      tooltip.params.text = newText;
      tooltip.text = newText;
      if (tooltip.$el) {
        tooltip.$el.children('.tooltip-content').html(newText);
      }
      if (tooltip.opened) {
        tooltip.position();
      }
      return tooltip;
    }
  }, {
    key: 'init',
    value: function init() {
      var tooltip = this;
      tooltip.attachEvents();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var tooltip = this;
      if (!tooltip.$targetEl || tooltip.destroyed) return;
      tooltip.$targetEl.trigger('tooltip:beforedestroy', tooltip);
      tooltip.emit('local::beforeDestroy tooltipBeforeDestroy', tooltip);
      tooltip.$el.remove();
      delete tooltip.$targetEl[0].f7Tooltip;
      tooltip.detachEvents();
      _utils2.default.deleteProps(tooltip);
      tooltip.destroyed = true;
    }
  }]);

  return Tooltip;
}(_class2.default);

exports.default = Tooltip;