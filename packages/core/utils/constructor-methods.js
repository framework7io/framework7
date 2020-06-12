import $ from 'dom7';

export default function (parameters = {}) {
  const {
    defaultSelector,
    constructor: Constructor,
    domProp,
    app,
    addMethods,
  } = parameters;
  const methods = {
    create(...args) {
      if (app) return new Constructor(app, ...args);
      return new Constructor(...args);
    },
    get(el = defaultSelector) {
      if (el instanceof Constructor) return el;
      const $el = $(el);
      if ($el.length === 0) return undefined;
      return $el[0][domProp];
    },
    destroy(el) {
      const instance = methods.get(el);
      if (instance && instance.destroy) return instance.destroy();
      return undefined;
    },
  };
  if (addMethods && Array.isArray(addMethods)) {
    addMethods.forEach((methodName) => {
      methods[methodName] = (el = defaultSelector, ...args) => {
        const instance = methods.get(el);
        if (instance && instance[methodName]) return instance[methodName](...args);
        return undefined;
      };
    });
  }
  return methods;
}
