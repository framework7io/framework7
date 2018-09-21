import { a as $ } from './chunk-537afb9a.js';

function ConstructorMethods (parameters) {
  if ( parameters === void 0 ) parameters = {};

  var defaultSelector = parameters.defaultSelector;
  var constructor = parameters.constructor;
  var domProp = parameters.domProp;
  var app = parameters.app;
  var addMethods = parameters.addMethods;
  var methods = {
    create: function create() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (app) { return new (Function.prototype.bind.apply( constructor, [ null ].concat( [app], args) )); }
      return new (Function.prototype.bind.apply( constructor, [ null ].concat( args) ));
    },
    get: function get(el) {
      if ( el === void 0 ) el = defaultSelector;

      if (el instanceof constructor) { return el; }
      var $el = $(el);
      if ($el.length === 0) { return undefined; }
      return $el[0][domProp];
    },
    destroy: function destroy(el) {
      var instance = methods.get(el);
      if (instance && instance.destroy) { return instance.destroy(); }
      return undefined;
    },
  };
  if (addMethods && Array.isArray(addMethods)) {
    addMethods.forEach(function (methodName) {
      methods[methodName] = function (el) {
        if ( el === void 0 ) el = defaultSelector;
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        var instance = methods.get(el);
        if (instance && instance[methodName]) { return instance[methodName].apply(instance, args); }
        return undefined;
      };
    });
  }
  return methods;
}

export { ConstructorMethods as a };
