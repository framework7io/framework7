import $ from 'dom7';

export default function (parameters = {}) {
  const {
    defaultSelector,
    constructor,
    domProp,
    app,
    addMethods,
  } = parameters;
  const methods = {
    create(...args) {
      if (app) return new constructor(app, ...args);
      return new constructor(...args);
    },
    get(el = defaultSelector) {
      if (el instanceof constructor) return el;
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

