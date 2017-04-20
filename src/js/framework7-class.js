import t7 from 'template7';
import $ from 'dom7';

export default class {
  constructor(params) {
    // App Instance
    const app = this;

    // Default
    const defaults = {
      root: 'body',
    };

    // Install Modules
    Object.keys(app.modules).forEach((moduleName) => {
      const module = app.modules[moduleName];
      // Extend params
      if (module.params) {
        $.extend(defaults, module.params);
      }
      // Extend app methods and props
      if (module.app) {
        Object.keys(module.app).forEach((modulePropName) => {
          const moduleProp = module.app[modulePropName];
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
      // Init
      if (module.create) {
        module.create.bind(app)(app);
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

    // Return app instance
    return app;
  }
}
