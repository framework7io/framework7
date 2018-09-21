import { a as $, b as Utils } from './chunk-537afb9a.js';
import { a as ConstructorMethods } from './chunk-3504b84e.js';

function ModalMethods (parameters) {
  if ( parameters === void 0 ) parameters = {};

  var defaultSelector = parameters.defaultSelector;
  var constructor = parameters.constructor;
  var app = parameters.app;
  var methods = Utils.extend(
    ConstructorMethods({
      defaultSelector: defaultSelector,
      constructor: constructor,
      app: app,
      domProp: 'f7Modal',
    }),
    {
      open: function open(el, animate) {
        var $el = $(el);
        var instance = $el[0].f7Modal;
        if (!instance) { instance = new constructor(app, { el: $el }); }
        return instance.open(animate);
      },
      close: function close(el, animate) {
        if ( el === void 0 ) el = defaultSelector;

        var $el = $(el);
        if ($el.length === 0) { return undefined; }
        var instance = $el[0].f7Modal;
        if (!instance) { instance = new constructor(app, { el: $el }); }
        return instance.close(animate);
      },
    }
  );
  return methods;
}

export { ModalMethods as a };
