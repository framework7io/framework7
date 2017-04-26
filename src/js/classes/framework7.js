import t7 from 'template7';
import $ from 'dom7';
import Utils from '../utils/utils';
import Device from '../utils/device';
import Use from '../utils/use';

class Framework7 {
  constructor(params) {
    // App Instance
    const app = this;

    // Default
    const defaults = {
      root: 'body',
      theme: 'auto',
      init: true,
    };

    // Extend modules params
    Object.keys(app.modules).forEach((moduleName) => {
      const module = app.modules[moduleName];
      // Extend params
      if (module.params) {
        Utils.extend(defaults, module.params);
      }
    });

    // Extend defaults with passed params
    app.params = Utils.extend(defaults, params);

    // Root
    app.root = $(app.params.root);
    app.root.addClass('framework7-root');
    app.root[0].f7 = app;

    // Link to local storage
    app.ls = window.localStorage;

    // RTL
    app.rtl = app.root.css('direction') === 'rtl';
    if (app.rtl) {
      $('html').attr('dir', 'rtl');
    }

    // Theme
    if (app.params.theme === 'auto') {
      app.theme = Device.ios ? 'ios' : 'md';
    } else {
      app.theme = app.params.theme;
    }

    // Theme class
    $('html').addClass(app.theme);

    // Install Modules
    Object.keys(app.modules).forEach((moduleName) => {
      const module = app.modules[moduleName];
      // Extend app methods and props
      if (module.instance) {
        Object.keys(module.instance).forEach((modulePropName) => {
          const moduleProp = module.instance[modulePropName];
          if (typeof moduleProp === 'function') {
            app[modulePropName] = moduleProp.bind(app);
          } else {
            app[modulePropName] = moduleProp;
          }
        });
      }
      // Add event listeners
      if (module.on) {
        Object.keys(module.on).forEach((moduleEventName) => {
          app.on(moduleEventName, module.on[moduleEventName]);
        });
      }
      // Module create callback
      if (module.create) {
        module.create.bind(app)(app);
      }
    });

    if (app.params.init) {
      app.init();
    }

    // Return app instance
    return app;
  }
  init() {
    const app = this;

    // Emit, init other modules
    app.emit('init');
  }
}

// Modularity
Framework7.prototype.modules = {};
Use(Framework7);

export default Framework7;
