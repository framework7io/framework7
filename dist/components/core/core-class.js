import $ from 'dom7';
import Template7 from 'template7';
import { window, document } from 'ssr-window';
import Utils from '../../utils/utils';
import Device from '../../utils/device';
import Framework7Class from '../../utils/class';

class Framework7 extends Framework7Class {
  constructor(params) {
    super(params);

    const passedParams = Utils.extend({}, params);

    // App Instance
    const app = this;

    // Default
    const defaults = {
      version: '1.0.0',
      id: 'io.framework7.testapp',
      root: 'body',
      theme: 'auto',
      language: window.navigator.language,
      routes: [],
      name: 'Framework7',
      initOnDeviceReady: true,
      init: true,
    };

    // Extend defaults with modules params
    app.useModulesParams(defaults);


    // Extend defaults with passed params
    app.params = Utils.extend(defaults, params);

    const $rootEl = $(app.params.root);

    Utils.extend(app, {
      // App Id
      id: app.params.id,
      // App Name
      name: app.params.name,
      // App version
      version: app.params.version,
      // Routes
      routes: app.params.routes,
      // Lang
      language: app.params.language,
      // Root
      root: $rootEl,
      // RTL
      rtl: $rootEl.css('direction') === 'rtl',
      // Theme
      theme: (function getTheme() {
        if (app.params.theme === 'auto') {
          return Device.ios ? 'ios' : 'md';
        }
        return app.params.theme;
      }()),
      // Initially passed parameters
      passedParams,
    });

    // Save Root
    if (app.root && app.root[0]) {
      app.root[0].f7 = app;
    }

    // Install Modules
    app.useModules();

    // Init
    if (app.params.init) {
      if (Device.cordova && app.params.initOnDeviceReady) {
        $(document).on('deviceready', () => {
          app.init();
        });
      } else {
        app.init();
      }
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
