import Utils from './utils';

export default function Use(c) {
  const Class = c;
  function installModule(module, ...params) {
    const name = module.name || Utils.now();
    if (Class.prototype.modules) {
      Class.prototype.modules[name] = module;
    }
    // Prototype
    if (module.proto) {
      Object.keys(module.proto).forEach((key) => {
        Class.prototype[key] = module.proto[key];
      });
    }
    // Class
    if (module.class) {
      Object.keys(module.class).forEach((key) => {
        Class[key] = module.class[key];
      });
    }
    // Callback
    if (module.install) {
      module.install.apply(Class, params);
    }
    return Class;
  }
  Class.use = function use(module, ...params) {
    if (Array.isArray(module)) {
      module.forEach((m) => {
        installModule(m);
      });
    } else {
      installModule(module, ...params);
    }
    return Class;
  };
  return Class;
}
