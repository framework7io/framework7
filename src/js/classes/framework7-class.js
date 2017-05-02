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
      routes: [],
    };

    // Extend defaults with modules params
    app.useInstanceModulesParams(defaults);

    // Extend defaults with passed params
    app.params = Utils.extend(defaults, params);

    // Root
    app.root = $(app.params.root);
    app.root[0].f7 = app;

    // Link to local storage
    app.ls = window.localStorage;

    // RTL
    app.rtl = app.root.css('direction') === 'rtl';

    // Theme
    if (app.params.theme === 'auto') {
      app.theme = Device.ios ? 'ios' : 'md';
    } else {
      app.theme = app.params.theme;
    }

    // Install Modules
    app.useInstanceModules();

    // Init
    if (app.params.init) {
      app.init();
    }

    // Return app instance
    return app;
  }
  init() {
    const app = this;

    // RTL attr
    if (app.rtl) {
      $('html').attr('dir', 'rtl');
    }

    // Root class
    app.root.addClass('framework7-root');

    // Theme class
    $('html').addClass(app.theme);

    // Emit, init other modules
    app.emit('init');
  }
}

// Modularity
Use(Framework7);

export default Framework7;
