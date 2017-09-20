import $ from 'dom7';
import Template7 from 'template7';
import Utils from '../../utils/utils';
import Device from '../../utils/device';
import Framework7Class from '../../utils/class';

class Framework7 extends Framework7Class {
  constructor(params) {
    super(params);

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
    app.useModulesParams(defaults);

    // Extend defaults with passed params
    app.params = Utils.extend(defaults, params);

    // Routes
    app.routes = app.params.routes;

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
    app.useModules();

    // Init
    if (app.params.init) {
      app.init();
    }

    // Return app instance
    return app;
  }
  init() {
    const app = this;
    if (app.initialized) return;

    app.root.addClass('framework7-initializing');

    // RTL attr
    if (app.rtl) {
      $('html').attr('dir', 'rtl');
    }

    // Root class
    app.root.addClass('framework7-root');

    // Theme class
    $('html').removeClass('ios md').addClass(app.theme);

    // Data
    app.data = {};
    if (app.params.data && typeof app.params.data === 'function') {
      Utils.extend(app.data, app.params.data.bind(app)());
    } else if (app.params.data) {
      Utils.extend(app.data, app.params.data);
    }
    // Methods
    app.methods = {};
    if (app.params.methods) {
      Utils.extend(app.methods, app.params.methods);
    }
    // Init class
    Utils.nextFrame(() => {
      app.root.removeClass('framework7-initializing');
    });
    // Emit, init other modules
    app.initialized = true;
    app.emit('init');
  }
  // eslint-disable-next-line
  get $() {
    return $;
  }
  // eslint-disable-next-line
  get t7() {
    return Template7;
  }
  static get Dom7() {
    return $;
  }
  static get $() {
    return $;
  }
  static get Template7() {
    return Template7;
  }
  static get Class() {
    return Framework7Class;
  }
}

export default Framework7;
