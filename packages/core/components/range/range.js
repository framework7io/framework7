'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _rangeClass = require('./range-class');

var _rangeClass2 = _interopRequireDefault(_rangeClass);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'range',
  create: function create() {
    var app = this;
    app.range = _utils2.default.extend((0, _constructorMethods2.default)({
      defaultSelector: '.range-slider',
      constructor: _rangeClass2.default,
      app: app,
      domProp: 'f7Range'
    }), {
      getValue: function getValue() {
        var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.range-slider';

        var range = app.range.get(el);
        if (range) return range.getValue();
        return undefined;
      },
      setValue: function setValue() {
        var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.range-slider';
        var value = arguments[1];

        var range = app.range.get(el);
        if (range) return range.setValue(value);
        return undefined;
      }
    });
  },

  static: {
    Range: _rangeClass2.default
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.range-slider-init').each(function (index, rangeEl) {
        return new _rangeClass2.default(app, {
          el: rangeEl
        });
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      (0, _dom2.default)(tabEl).find('.range-slider-init').each(function (index, rangeEl) {
        if (rangeEl.f7Range) rangeEl.f7Range.destroy();
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.range-slider-init').each(function (index, rangeEl) {
        return new _rangeClass2.default(app, {
          el: rangeEl
        });
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      page.$el.find('.range-slider-init').each(function (index, rangeEl) {
        if (rangeEl.f7Range) rangeEl.f7Range.destroy();
      });
    }
  }
};