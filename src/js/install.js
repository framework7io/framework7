function Install(module, params) {
  const Class = this;
  if (Class.prototype.modules && module.name) {
    Class.prototype.modules[module.name] = module;
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
    module.install(Class, params);
  }
}

export default Install;
