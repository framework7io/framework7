'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _tooltipClass = require('./tooltip-class');

var _tooltipClass2 = _interopRequireDefault(_tooltipClass);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'tooltip',
  static: {
    Tooltip: _tooltipClass2.default
  },
  create: function create() {
    var app = this;
    app.tooltip = (0, _constructorMethods2.default)({
      defaultSelector: '.tooltip',
      constructor: _tooltipClass2.default,
      app: app,
      domProp: 'f7Tooltip'
    });
    app.tooltip.show = function show(el) {
      var $el = (0, _dom2.default)(el);
      if ($el.length === 0) return undefined;
      var tooltip = $el[0].f7Tooltip;
      if (!tooltip) return undefined;
      tooltip.show($el[0]);
      return tooltip;
    };
    app.tooltip.hide = function hide(el) {
      var $el = (0, _dom2.default)(el);
      if ($el.length === 0) return undefined;
      var tooltip = $el[0].f7Tooltip;
      if (!tooltip) return undefined;
      tooltip.hide();
      return tooltip;
    };
    app.tooltip.setText = function text(el, newText) {
      var $el = (0, _dom2.default)(el);
      if ($el.length === 0) return undefined;
      var tooltip = $el[0].f7Tooltip;
      if (!tooltip) return undefined;
      tooltip.setText(newText);
      return tooltip;
    };
  },

  params: {
    tooltip: {
      targetEl: null,
      text: null,
      cssClass: null,
      render: null
    }
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.tooltip-init').each(function (index, el) {
        var text = (0, _dom2.default)(el).attr('data-tooltip');
        if (!text) return;
        app.tooltip.create({ targetEl: el, text: text });
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      (0, _dom2.default)(tabEl).find('.tooltip-init').each(function (index, el) {
        if (el.f7Tooltip) el.f7Tooltip.destroy();
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.tooltip-init').each(function (index, el) {
        var text = (0, _dom2.default)(el).attr('data-tooltip');
        if (!text) return;
        app.tooltip.create({ targetEl: el, text: text });
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      page.$el.find('.tooltip-init').each(function (index, el) {
        if (el.f7Tooltip) el.f7Tooltip.destroy();
      });
    }
  }
};