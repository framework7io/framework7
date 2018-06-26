'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

var _support = require('../../utils/support');

var _support2 = _interopRequireDefault(_support);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toggle = function (_Framework7Class) {
  _inherits(Toggle, _Framework7Class);

  function Toggle(app) {
    var _ret, _ret2;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Toggle);

    var _this = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, params, [app]));

    var toggle = _this;

    var defaults = {};

    // Extend defaults with modules params
    toggle.useModulesParams(defaults);

    toggle.params = _utils2.default.extend(defaults, params);

    var el = toggle.params.el;
    if (!el) return _ret = toggle, _possibleConstructorReturn(_this, _ret);

    var $el = (0, _dom2.default)(el);
    if ($el.length === 0) return _ret2 = toggle, _possibleConstructorReturn(_this, _ret2);

    var $inputEl = $el.children('input[type="checkbox"]');

    _utils2.default.extend(toggle, {
      app: app,
      $el: $el,
      el: $el[0],
      $inputEl: $inputEl,
      inputEl: $inputEl[0],
      disabled: $el.hasClass('disabled') || $inputEl.hasClass('disabled') || $inputEl.attr('disabled') || $inputEl[0].disabled
    });

    Object.defineProperty(toggle, 'checked', {
      enumerable: true,
      configurable: true,
      set: function set(checked) {
        if (!toggle || typeof toggle.$inputEl === 'undefined') return;
        if (toggle.checked === checked) return;
        $inputEl[0].checked = checked;
        toggle.$inputEl.trigger('change');
      },
      get: function get() {
        return $inputEl[0].checked;
      }
    });

    $el[0].f7Toggle = toggle;

    var isTouched = void 0;
    var touchesStart = {};
    var isScrolling = void 0;
    var touchesDiff = void 0;
    var toggleWidth = void 0;
    var touchStartTime = void 0;
    var touchStartChecked = void 0;
    function handleTouchStart(e) {
      if (isTouched || toggle.disabled) return;
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      touchesDiff = 0;

      isTouched = true;
      isScrolling = undefined;
      touchStartTime = _utils2.default.now();
      touchStartChecked = toggle.checked;

      toggleWidth = $el[0].offsetWidth;
      _utils2.default.nextTick(function () {
        if (isTouched) {
          $el.addClass('toggle-active-state');
        }
      });
    }
    function handleTouchMove(e) {
      if (!isTouched || toggle.disabled) return;
      var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      var inverter = app.rtl ? -1 : 1;

      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (isScrolling) {
        isTouched = false;
        return;
      }
      e.preventDefault();

      touchesDiff = pageX - touchesStart.x;

      var changed = void 0;
      if (touchesDiff * inverter < 0 && Math.abs(touchesDiff) > toggleWidth / 3 && touchStartChecked) {
        changed = true;
      }
      if (touchesDiff * inverter > 0 && Math.abs(touchesDiff) > toggleWidth / 3 && !touchStartChecked) {
        changed = true;
      }
      if (changed) {
        touchesStart.x = pageX;
        toggle.checked = !touchStartChecked;
        touchStartChecked = !touchStartChecked;
      }
    }
    function handleTouchEnd() {
      if (!isTouched || toggle.disabled) {
        if (isScrolling) $el.removeClass('toggle-active-state');
        isTouched = false;
        return;
      }
      var inverter = app.rtl ? -1 : 1;
      isTouched = false;

      $el.removeClass('toggle-active-state');

      var changed = void 0;
      if (_utils2.default.now() - touchStartTime < 300) {
        if (touchesDiff * inverter < 0 && touchStartChecked) {
          changed = true;
        }
        if (touchesDiff * inverter > 0 && !touchStartChecked) {
          changed = true;
        }
        if (changed) {
          toggle.checked = !touchStartChecked;
        }
      }
    }
    function handleInputChange() {
      toggle.$el.trigger('toggle:change', toggle);
      toggle.emit('local::change toggleChange', toggle);
    }
    toggle.attachEvents = function attachEvents() {
      if ("universal" !== 'desktop' && _support2.default.touch) {
        var passive = _support2.default.passiveListener ? { passive: true } : false;
        $el.on(app.touchEvents.start, handleTouchStart, passive);
        app.on('touchmove', handleTouchMove);
        app.on('touchend:passive', handleTouchEnd);
      }
      toggle.$inputEl.on('change', handleInputChange);
    };
    toggle.detachEvents = function detachEvents() {
      if (process.env.TARGET !== 'desktop' && _support2.default.touch) {
        var passive = _support2.default.passiveListener ? { passive: true } : false;
        $el.off(app.touchEvents.start, handleTouchStart, passive);
        app.off('touchmove', handleTouchMove);
        app.off('touchend:passive', handleTouchEnd);
      }
      toggle.$inputEl.off('change', handleInputChange);
    };

    // Install Modules
    toggle.useModules();

    // Init
    toggle.init();
    return _this;
  }

  _createClass(Toggle, [{
    key: 'toggle',
    value: function toggle() {
      var toggle = this;
      toggle.checked = !toggle.checked;
    }
  }, {
    key: 'init',
    value: function init() {
      var toggle = this;
      toggle.attachEvents();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var toggle = this;
      toggle.$el.trigger('toggle:beforedestroy', toggle);
      toggle.emit('local::beforeDestroy toggleBeforeDestroy', toggle);
      delete toggle.$el[0].f7Toggle;
      toggle.detachEvents();
      _utils2.default.deleteProps(toggle);
      toggle = null;
    }
  }]);

  return Toggle;
}(_class2.default);

exports.default = Toggle;