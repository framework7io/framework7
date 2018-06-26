'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultSelector = parameters.defaultSelector,
      constructor = parameters.constructor,
      app = parameters.app;

  var methods = _utils2.default.extend((0, _constructorMethods2.default)({
    defaultSelector: defaultSelector,
    constructor: constructor,
    app: app,
    domProp: 'f7Modal'
  }), {
    open: function open(el, animate) {
      var $el = (0, _dom2.default)(el);
      var instance = $el[0].f7Modal;
      if (!instance) instance = new constructor(app, { el: $el });
      return instance.open(animate);
    },
    close: function close() {
      var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSelector;
      var animate = arguments[1];

      var $el = (0, _dom2.default)(el);
      if ($el.length === 0) return undefined;
      var instance = $el[0].f7Modal;
      if (!instance) instance = new constructor(app, { el: $el });
      return instance.close(animate);
    }
  });
  return methods;
};

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _constructorMethods = require('./constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }