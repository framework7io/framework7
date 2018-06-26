'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _stepperClass = require('./stepper-class');

var _stepperClass2 = _interopRequireDefault(_stepperClass);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'stepper',
  create: function create() {
    var app = this;
    app.stepper = _utils2.default.extend((0, _constructorMethods2.default)({
      defaultSelector: '.stepper',
      constructor: _stepperClass2.default,
      app: app,
      domProp: 'f7Stepper'
    }), {
      getValue: function getValue() {
        var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.stepper';

        var stepper = app.stepper.get(el);
        if (stepper) return stepper.getValue();
        return undefined;
      },
      setValue: function setValue() {
        var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.stepper';
        var value = arguments[1];

        var stepper = app.stepper.get(el);
        if (stepper) return stepper.setValue(value);
        return undefined;
      }
    });
  },

  static: {
    Stepper: _stepperClass2.default
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.stepper-init').each(function (index, stepperEl) {
        var dataset = (0, _dom2.default)(stepperEl).dataset();
        // eslint-disable-next-line
        new _stepperClass2.default(app, _utils2.default.extend({ el: stepperEl }, dataset || {}));
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      (0, _dom2.default)(tabEl).find('.stepper-init').each(function (index, stepperEl) {
        if (stepperEl.f7Stepper) stepperEl.f7Stepper.destroy();
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.stepper-init').each(function (index, stepperEl) {
        var dataset = (0, _dom2.default)(stepperEl).dataset();
        // eslint-disable-next-line
        new _stepperClass2.default(app, _utils2.default.extend({ el: stepperEl }, dataset || {}));
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      page.$el.find('.stepper-init').each(function (index, stepperEl) {
        if (stepperEl.f7Stepper) stepperEl.f7Stepper.destroy();
      });
    }
  }
};