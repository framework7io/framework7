import Utils from './utils';

export default function Use(c) {
  const Class = c;

  function installModule(module, ...params) {
    const name = module.name || Utils.now();
    if (!Class.prototype.modules) Class.prototype.modules = {};
    Class.prototype.modules[name] = module;
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

  // Modules Parameters
  Class.prototype.useInstanceModulesParams = function useInstanceModules(instanceParams) {
    const instance = this;
    Object.keys(instance.modules).forEach((moduleName) => {
      const module = instance.modules[moduleName];
      // Extend params
      if (module.params) {
        if (!instanceParams[moduleName]) instanceParams[moduleName] = {};
        Utils.extend(instanceParams[moduleName], module.params);
      }
    });
  };

  // Instance Modules
  Class.prototype.useInstanceModules = function useInstanceModules(modulesParams = {}) {
    const instance = this;
    Object.keys(instance.modules).forEach((moduleName) => {
      const module = instance.modules[moduleName];
      const moduleParams = modulesParams[moduleName] || {};
      // Extend instance methods and props
      if (module.instance) {
        Object.keys(module.instance).forEach((modulePropName) => {
          const moduleProp = module.instance[modulePropName];
          if (typeof moduleProp === 'function') {
            instance[modulePropName] = moduleProp.bind(instance);
          } else {
            instance[modulePropName] = moduleProp;
          }
        });
      }
      // Add event listeners
      if (module.on && instance.on) {
        Object.keys(module.on).forEach((moduleEventName) => {
          instance.on(moduleEventName, module.on[moduleEventName]);
        });
      }

      // Module create callback
      if (module.create) {
        module.create.bind(instance)(moduleParams);
      }
    });
  };

  return Class;
}
