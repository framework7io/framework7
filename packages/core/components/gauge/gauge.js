'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _gaugeClass = require('./gauge-class');

var _gaugeClass2 = _interopRequireDefault(_gaugeClass);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'gauge',
  static: {
    Gauge: _gaugeClass2.default
  },
  create: function create() {
    var app = this;
    app.gauge = (0, _constructorMethods2.default)({
      defaultSelector: '.gauge',
      constructor: _gaugeClass2.default,
      app: app,
      domProp: 'f7Gauge'
    });
    app.gauge.update = function update(el, newParams) {
      var $el = (0, _dom2.default)(el);
      if ($el.length === 0) return undefined;
      var gauge = app.gauge.get(el);
      if (!gauge) return undefined;
      gauge.update(newParams);
      return gauge;
    };
  },

  params: {
    gauge: {
      el: null,
      type: 'circle',
      value: 0,
      size: 200,
      bgColor: 'transparent',
      borderBgColor: '#eeeeee',
      borderColor: '#000000',
      borderWidth: 10,
      valueText: null,
      valueTextColor: '#000000',
      valueFontSize: 31,
      valueFontWeight: 500,
      labelText: null,
      labelTextColor: '#888888',
      labelFontSize: 14,
      labelFontWeight: 400
    }
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.gauge-init').each(function (index, el) {
        app.gauge.create(_utils2.default.extend({ el: el }, (0, _dom2.default)(el).dataset() || {}));
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      (0, _dom2.default)(tabEl).find('.gauge-init').each(function (index, el) {
        if (el.f7Gauge) el.f7Gauge.destroy();
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.gauge-init').each(function (index, el) {
        app.gauge.create(_utils2.default.extend({ el: el }, (0, _dom2.default)(el).dataset() || {}));
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      page.$el.find('.gauge-init').each(function (index, el) {
        if (el.f7Gauge) el.f7Gauge.destroy();
      });
    }
  }
};