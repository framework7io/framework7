import t7 from 'template7';
import $ from 'dom7';

export default class {
  constructor(params) {
    // App Instance
    const app = this;

    // Default
    const defaults = {
      root: 'body',
      theme: 'auto',
    };

    // Extend modules params
    Object.keys(app.modules).forEach((moduleName) => {
      const module = app.modules[moduleName];
      // Extend params
      if (module.params) {
        $.extend(defaults, module.params);
      }
    });

    // Extend defaults with passed params
    app.params = $.extend(defaults, params);

    // Root
    app.root = $(app.params.root);
    app.root.addClass('framework7-root');

    // Link to local storage
    app.ls = window.localStorage;

    // RTL
    app.rtl = app.root.css('direction') === 'rtl';
    if (app.rtl) $('html').attr('dir', 'rtl');

    // Theme
    if (app.params.theme === 'auto') {
      app.theme = app.device.ios ? 'ios' : 'md';
    } else {
      app.theme = app.params.theme;
    }
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

    // Return app instance
    return app;
  }
}
