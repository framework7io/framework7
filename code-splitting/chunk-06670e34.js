import { b as Utils } from './chunk-537afb9a.js';

var Framework7Class = function Framework7Class(params, parents) {
  if ( params === void 0 ) params = {};
  if ( parents === void 0 ) parents = [];

  var self = this;
  self.params = params;

  // Events
  self.eventsParents = parents;
  self.eventsListeners = {};

  if (self.params && self.params.on) {
    Object.keys(self.params.on).forEach(function (eventName) {
      self.on(eventName, self.params.on[eventName]);
    });
  }
};

var staticAccessors = { components: { configurable: true } };

Framework7Class.prototype.on = function on (events, handler, priority) {
  var self = this;
  if (typeof handler !== 'function') { return self; }
  var method = priority ? 'unshift' : 'push';
  events.split(' ').forEach(function (event) {
    if (!self.eventsListeners[event]) { self.eventsListeners[event] = []; }
    self.eventsListeners[event][method](handler);
  });
  return self;
};

Framework7Class.prototype.once = function once (events, handler, priority) {
  var self = this;
  if (typeof handler !== 'function') { return self; }
  function onceHandler() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    handler.apply(self, args);
    self.off(events, onceHandler);
  }
  return self.on(events, onceHandler, priority);
};

Framework7Class.prototype.off = function off (events, handler) {
  var self = this;
  if (!self.eventsListeners) { return self; }
  events.split(' ').forEach(function (event) {
    if (typeof handler === 'undefined') {
      self.eventsListeners[event] = [];
    } else if (self.eventsListeners[event]) {
      self.eventsListeners[event].forEach(function (eventHandler, index) {
        if (eventHandler === handler) {
          self.eventsListeners[event].splice(index, 1);
        }
      });
    }
  });
  return self;
};

Framework7Class.prototype.emit = function emit () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

  var self = this;
  if (!self.eventsListeners) { return self; }
  var events;
  var data;
  var context;
  var eventsParents;
  if (typeof args[0] === 'string' || Array.isArray(args[0])) {
    events = args[0];
    data = args.slice(1, args.length);
    context = self;
    eventsParents = self.eventsParents;
  } else {
    events = args[0].events;
    data = args[0].data;
    context = args[0].context || self;
    eventsParents = args[0].local ? [] : args[0].parents || self.eventsParents;
  }
  var eventsArray = Array.isArray(events) ? events : events.split(' ');
  var localEvents = eventsArray.map(function (eventName) { return eventName.replace('local::', ''); });
  var parentEvents = eventsArray.filter(function (eventName) { return eventName.indexOf('local::') < 0; });

  localEvents.forEach(function (event) {
    if (self.eventsListeners && self.eventsListeners[event]) {
      var handlers = [];
      self.eventsListeners[event].forEach(function (eventHandler) {
        handlers.push(eventHandler);
      });
      handlers.forEach(function (eventHandler) {
        eventHandler.apply(context, data);
      });
    }
  });
  if (eventsParents && eventsParents.length > 0) {
    eventsParents.forEach(function (eventsParent) {
      eventsParent.emit.apply(eventsParent, [ parentEvents ].concat( data ));
    });
  }
  return self;
};

Framework7Class.prototype.useModulesParams = function useModulesParams (instanceParams) {
  var instance = this;
  if (!instance.modules) { return; }
  Object.keys(instance.modules).forEach(function (moduleName) {
    var module = instance.modules[moduleName];
    // Extend params
    if (module.params) {
      Utils.extend(instanceParams, module.params);
    }
  });
};

Framework7Class.prototype.useModules = function useModules (modulesParams) {
    if ( modulesParams === void 0 ) modulesParams = {};

  var instance = this;
  if (!instance.modules) { return; }
  Object.keys(instance.modules).forEach(function (moduleName) {
    var module = instance.modules[moduleName];
    var moduleParams = modulesParams[moduleName] || {};
    // Extend instance methods and props
    if (module.instance) {
      Object.keys(module.instance).forEach(function (modulePropName) {
        var moduleProp = module.instance[modulePropName];
        if (typeof moduleProp === 'function') {
          instance[modulePropName] = moduleProp.bind(instance);
        } else {
          instance[modulePropName] = moduleProp;
        }
      });
    }
    // Add event listeners
    if (module.on && instance.on) {
      Object.keys(module.on).forEach(function (moduleEventName) {
        instance.on(moduleEventName, module.on[moduleEventName]);
      });
    }
    // Add vnode hooks
    if (module.vnode) {
      if (!instance.vnodeHooks) { instance.vnodeHooks = {}; }
      Object.keys(module.vnode).forEach(function (vnodeId) {
        Object.keys(module.vnode[vnodeId]).forEach(function (hookName) {
          var handler = module.vnode[vnodeId][hookName];
          if (!instance.vnodeHooks[hookName]) { instance.vnodeHooks[hookName] = {}; }
          if (!instance.vnodeHooks[hookName][vnodeId]) { instance.vnodeHooks[hookName][vnodeId] = []; }
          instance.vnodeHooks[hookName][vnodeId].push(handler.bind(instance));
        });
      });
    }
    // Module create callback
    if (module.create) {
      module.create.bind(instance)(moduleParams);
    }
  });
};

staticAccessors.components.set = function (components) {
  var Class = this;
  if (!Class.use) { return; }
  Class.use(components);
};

Framework7Class.installModule = function installModule (module) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

  var Class = this;
  if (!Class.prototype.modules) { Class.prototype.modules = {}; }
  var name = module.name || (((Object.keys(Class.prototype.modules).length) + "_" + (Utils.now())));
  Class.prototype.modules[name] = module;
  // Prototype
  if (module.proto) {
    Object.keys(module.proto).forEach(function (key) {
      Class.prototype[key] = module.proto[key];
    });
  }
  // Class
  if (module.static) {
    Object.keys(module.static).forEach(function (key) {
      Class[key] = module.static[key];
    });
  }
  // Callback
  if (module.install) {
    module.install.apply(Class, params);
  }
  return Class;
};

Framework7Class.use = function use (module) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

  var Class = this;
  if (Array.isArray(module)) {
    module.forEach(function (m) { return Class.installModule(m); });
    return Class;
  }
  return Class.installModule.apply(Class, [ module ].concat( params ));
};

Object.defineProperties( Framework7Class, staticAccessors );

export { Framework7Class as a };
