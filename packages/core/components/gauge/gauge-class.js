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
} /* eslint no-nested-ternary: off */

var Gauge = function (_Framework7Class) {
  _inherits(Gauge, _Framework7Class);

  function Gauge(app) {
    var _ret, _ret2, _ret3;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Gauge);

    var _this = _possibleConstructorReturn(this, (Gauge.__proto__ || Object.getPrototypeOf(Gauge)).call(this, app, params));
    // Extends with open/close Modal methods;


    var gauge = _this;

    var defaults = _utils2.default.extend({}, app.params.gauge);

    // Extend defaults with modules params
    gauge.useModulesParams(defaults);

    gauge.params = _utils2.default.extend(defaults, params);

    var el = gauge.params.el;

    if (!el) return _ret = gauge, _possibleConstructorReturn(_this, _ret);

    var $el = (0, _dom2.default)(el);
    if ($el.length === 0) return _ret2 = gauge, _possibleConstructorReturn(_this, _ret2);

    _utils2.default.extend(gauge, {
      app: app,
      $el: $el,
      el: $el && $el[0]
    });

    $el[0].f7Gauge = gauge;

    // Install Modules
    gauge.useModules();

    gauge.init();

    return _ret3 = gauge, _possibleConstructorReturn(_this, _ret3);
  }

  _createClass(Gauge, [{
    key: 'calcRadius',
    value: function calcRadius() {
      var gauge = this;
      var _gauge$params = gauge.params,
          size = _gauge$params.size,
          borderWidth = _gauge$params.borderWidth;

      return size / 2 - borderWidth / 2;
    }
  }, {
    key: 'calcBorderLength',
    value: function calcBorderLength() {
      var gauge = this;
      var radius = gauge.calcRadius();
      return 2 * Math.PI * radius;
    }
  }, {
    key: 'render',
    value: function render() {
      var gauge = this;
      if (gauge.params.render) return gauge.params.render.call(gauge, gauge);

      var _gauge$params2 = gauge.params,
          type = _gauge$params2.type,
          value = _gauge$params2.value,
          size = _gauge$params2.size,
          bgColor = _gauge$params2.bgColor,
          borderBgColor = _gauge$params2.borderBgColor,
          borderColor = _gauge$params2.borderColor,
          borderWidth = _gauge$params2.borderWidth,
          valueText = _gauge$params2.valueText,
          valueTextColor = _gauge$params2.valueTextColor,
          valueFontSize = _gauge$params2.valueFontSize,
          valueFontWeight = _gauge$params2.valueFontWeight,
          labelText = _gauge$params2.labelText,
          labelTextColor = _gauge$params2.labelTextColor,
          labelFontSize = _gauge$params2.labelFontSize,
          labelFontWeight = _gauge$params2.labelFontWeight;

      var semiCircle = type === 'semicircle';
      var radius = gauge.calcRadius();
      var length = gauge.calcBorderLength();
      var progress = Math.max(Math.min(value, 1), 0);

      return ('\n      <svg class="gauge-svg" width="' + size + 'px" height="' + (semiCircle ? size / 2 : size) + 'px" viewBox="0 0 ' + size + ' ' + (semiCircle ? size / 2 : size) + '">\n        ' + (semiCircle ? '\n          <path\n            class="gauge-back-semi"\n            d="M' + (size - borderWidth / 2) + ',' + size / 2 + ' a1,1 0 0,0 -' + (size - borderWidth) + ',0"\n            stroke="' + borderBgColor + '"\n            stroke-width="' + borderWidth + '"\n            fill="' + (bgColor || 'none') + '"\n          />\n          <path\n            class="gauge-front-semi"\n            d="M' + (size - borderWidth / 2) + ',' + size / 2 + ' a1,1 0 0,0 -' + (size - borderWidth) + ',0"\n            stroke="' + borderColor + '"\n            stroke-width="' + borderWidth + '"\n            stroke-dasharray="' + length / 2 + '"\n            stroke-dashoffset="' + length / 2 * (progress - 1) + '"\n            fill="' + (borderBgColor ? 'none' : bgColor || 'none') + '"\n          />\n        ' : '\n          ' + (borderBgColor ? '\n            <circle\n              class="gauge-back-circle"\n              stroke="' + borderBgColor + '"\n              stroke-width="' + borderWidth + '"\n              fill="' + (bgColor || 'none') + '"\n              cx="' + size / 2 + '"\n              cy="' + size / 2 + '"\n              r="' + radius + '"\n            ></circle>\n          ' : '') + '\n          <circle\n            class="gauge-front-circle"\n            transform="' + ('rotate(-90 ' + size / 2 + ' ' + size / 2 + ')') + '"\n            stroke="' + borderColor + '"\n            stroke-width="' + borderWidth + '"\n            stroke-dasharray="' + length + '"\n            stroke-dashoffset="' + length * (1 - progress) + '"\n            fill="' + (borderBgColor ? 'none' : bgColor || 'none') + '"\n            cx="' + size / 2 + '"\n            cy="' + size / 2 + '"\n            r="' + radius + '"\n          ></circle>\n        ') + '\n        ' + (valueText ? '\n          <text\n            class="gauge-value-text"\n            x="50%"\n            y="' + (semiCircle ? '100%' : '50%') + '"\n            font-weight="' + valueFontWeight + '"\n            font-size="' + valueFontSize + '"\n            fill="' + valueTextColor + '"\n            dy="' + (semiCircle ? labelText ? -labelFontSize - 15 : -5 : 0) + '"\n            text-anchor="middle"\n            dominant-baseline="' + (!semiCircle && 'middle') + '"\n          >' + valueText + '</text>\n        ' : '') + '\n        ' + (labelText ? '\n          <text\n            class="gauge-label-text"\n            x="50%"\n            y="' + (semiCircle ? '100%' : '50%') + '"\n            font-weight="' + labelFontWeight + '"\n            font-size="' + labelFontSize + '"\n            fill="' + labelTextColor + '"\n            dy="' + (semiCircle ? -5 : valueText ? valueFontSize / 2 + 10 : 0) + '"\n            text-anchor="middle"\n            dominant-baseline="' + (!semiCircle && 'middle') + '"\n          >' + labelText + '</text>\n        ' : '') + '\n      </svg>\n    ').trim();
    }
  }, {
    key: 'update',
    value: function update() {
      var newParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var gauge = this;
      var params = gauge.params,
          $gaugeSvgEl = gauge.$gaugeSvgEl;

      Object.keys(newParams).forEach(function (param) {
        if (typeof newParams[param] !== 'undefined') {
          params[param] = newParams[param];
        }
      });
      if ($gaugeSvgEl.length === 0) return gauge;

      var value = params.value,
          size = params.size,
          bgColor = params.bgColor,
          borderBgColor = params.borderBgColor,
          borderColor = params.borderColor,
          borderWidth = params.borderWidth,
          valueText = params.valueText,
          valueTextColor = params.valueTextColor,
          valueFontSize = params.valueFontSize,
          valueFontWeight = params.valueFontWeight,
          labelText = params.labelText,
          labelTextColor = params.labelTextColor,
          labelFontSize = params.labelFontSize,
          labelFontWeight = params.labelFontWeight;

      var length = gauge.calcBorderLength();
      var progress = Math.max(Math.min(value, 1), 0);
      var radius = gauge.calcRadius();
      var semiCircle = params.type === 'semicircle';

      var svgAttrs = {
        width: size + 'px',
        height: (semiCircle ? size / 2 : size) + 'px',
        viewBox: '0 0 ' + size + ' ' + (semiCircle ? size / 2 : size)
      };
      Object.keys(svgAttrs).forEach(function (attr) {
        $gaugeSvgEl.attr(attr, svgAttrs[attr]);
      });
      if (semiCircle) {
        var backAttrs = {
          d: 'M' + (size - borderWidth / 2) + ',' + size / 2 + ' a1,1 0 0,0 -' + (size - borderWidth) + ',0',
          stroke: borderBgColor,
          'stroke-width': borderWidth,
          fill: bgColor || 'none'
        };
        var frontAttrs = {
          d: 'M' + (size - borderWidth / 2) + ',' + size / 2 + ' a1,1 0 0,0 -' + (size - borderWidth) + ',0',
          stroke: borderColor,
          'stroke-width': borderWidth,
          'stroke-dasharray': length / 2,
          'stroke-dashoffset': length / 2 * (progress - 1),
          fill: borderBgColor ? 'none' : bgColor || 'none'
        };
        Object.keys(backAttrs).forEach(function (attr) {
          $gaugeSvgEl.find('.gauge-back-semi').attr(attr, backAttrs[attr]);
        });
        Object.keys(frontAttrs).forEach(function (attr) {
          $gaugeSvgEl.find('.gauge-front-semi').attr(attr, frontAttrs[attr]);
        });
      } else {
        var _backAttrs = {
          stroke: borderBgColor,
          'stroke-width': borderWidth,
          fill: bgColor || 'none',
          cx: size / 2,
          cy: size / 2,
          r: radius
        };
        var _frontAttrs = {
          transform: 'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')',
          stroke: borderColor,
          'stroke-width': borderWidth,
          'stroke-dasharray': length,
          'stroke-dashoffset': length * (1 - progress),
          fill: borderBgColor ? 'none' : bgColor || 'none',
          cx: size / 2,
          cy: size / 2,
          r: radius
        };
        Object.keys(_backAttrs).forEach(function (attr) {
          $gaugeSvgEl.find('.gauge-back-circle').attr(attr, _backAttrs[attr]);
        });
        Object.keys(_frontAttrs).forEach(function (attr) {
          $gaugeSvgEl.find('.gauge-front-circle').attr(attr, _frontAttrs[attr]);
        });
      }
      if (valueText) {
        if (!$gaugeSvgEl.find('.gauge-value-text').length) {
          $gaugeSvgEl.append('<text class="gauge-value-text"></text>');
        }
        var textAttrs = {
          x: '50%',
          y: semiCircle ? '100%' : '50%',
          'font-weight': valueFontWeight,
          'font-size': valueFontSize,
          fill: valueTextColor,
          dy: semiCircle ? labelText ? -labelFontSize - 15 : -5 : 0,
          'text-anchor': 'middle',
          'dominant-baseline': !semiCircle && 'middle'
        };
        Object.keys(textAttrs).forEach(function (attr) {
          $gaugeSvgEl.find('.gauge-value-text').attr(attr, textAttrs[attr]);
        });
        $gaugeSvgEl.find('.gauge-value-text').text(valueText);
      } else {
        $gaugeSvgEl.find('.gauge-value-text').remove();
      }
      if (labelText) {
        if (!$gaugeSvgEl.find('.gauge-label-text').length) {
          $gaugeSvgEl.append('<text class="gauge-label-text"></text>');
        }
        var labelAttrs = {
          x: '50%',
          y: semiCircle ? '100%' : '50%',
          'font-weight': labelFontWeight,
          'font-size': labelFontSize,
          fill: labelTextColor,
          dy: semiCircle ? -5 : valueText ? valueFontSize / 2 + 10 : 0,
          'text-anchor': 'middle',
          'dominant-baseline': !semiCircle && 'middle'
        };
        Object.keys(labelAttrs).forEach(function (attr) {
          $gaugeSvgEl.find('.gauge-label-text').attr(attr, labelAttrs[attr]);
        });
        $gaugeSvgEl.find('.gauge-label-text').text(labelText);
      } else {
        $gaugeSvgEl.find('.gauge-label-text').remove();
      }
      return gauge;
    }
  }, {
    key: 'init',
    value: function init() {
      var gauge = this;
      var $gaugeSvgEl = (0, _dom2.default)(gauge.render()).eq(0);
      $gaugeSvgEl.f7Gauge = gauge;
      _utils2.default.extend(gauge, {
        $gaugeSvgEl: $gaugeSvgEl,
        gaugeSvgEl: $gaugeSvgEl && $gaugeSvgEl[0]
      });
      gauge.$el.append($gaugeSvgEl);
      return gauge;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var gauge = this;
      if (!gauge.$el || gauge.destroyed) return;
      gauge.$el.trigger('gauge:beforedestroy', gauge);
      gauge.emit('local::beforeDestroy gaugeBeforeDestroy', gauge);
      gauge.$gaugeSvgEl.remove();
      delete gauge.$el[0].f7Gauge;
      _utils2.default.deleteProps(gauge);
      gauge.destroyed = true;
    }
  }]);

  return Gauge;
}(_class2.default);

exports.default = Gauge;