'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultSelector = parameters.defaultSelector,
      constructor = parameters.constructor,
      domProp = parameters.domProp,
      app = parameters.app,
      addMethods = parameters.addMethods;

  var methods = {
    create: function create() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (app) return new (Function.prototype.bind.apply(constructor, [null].concat([app], args)))();
      return new (Function.prototype.bind.apply(constructor, [null].concat(args)))();
    },
    get: function get() {
      var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSelector;

      if (el instanceof constructor) return el;
      var $el = (0, _dom2.default)(el);
      if ($el.length === 0) return undefined;
      return $el[0][domProp];
    },
    destroy: function destroy(el) {
      var instance = methods.get(el);
      if (instance && instance.destroy) return instance.destroy();
      return undefined;
    }
  };
  if (addMethods && Array.isArray(addMethods)) {
    addMethods.forEach(function (methodName) {
      methods[methodName] = function () {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSelector;

        var instance = methods.get(el);
        if (instance && instance[methodName]) return instance[methodName].apply(instance, args);
        return undefined;
      };
    });
  }
  return methods;
};

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}