import $ from 'dom7';
import Template7 from 'template7';
import { window, document } from 'ssr-window';
import Utils from '../../utils/utils';
import Device from '../../utils/device';
import Framework7Class from '../../utils/class';
import Support from '../../utils/support';
import ConstructorMethods from '../../utils/constructor-methods';
import ModalMethods from '../../utils/modal-methods';
import Modal from '../modal/modal-class';

class Framework7 extends Framework7Class {
  constructor(params) {
    super(params);

    const passedParams = Utils.extend({}, params);

    // App Instance
    const app = this;

    Framework7.instance = app;

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
    if (app.initialized) return app;

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
      Object.keys(app.params.methods).forEach((methodName) => {
        if (typeof app.params.methods[methodName] === 'function') {
          app.methods[methodName] = app.params.methods[methodName].bind(app);
        } else {
          app.methods[methodName] = app.params.methods[methodName];
        }
      });
    }
    // Init class
    Utils.nextFrame(() => {
      app.root.removeClass('framework7-initializing');
    });
    // Emit, init other modules
    app.initialized = true;
    app.emit('init');

    return app;
  }

  // eslint-disable-next-line
  loadComponent(...args) {
    return Framework7.loadComponent(...args);
  }

  // eslint-disable-next-line
  loadComponents(...args) {
    return Framework7.loadComponents(...args);
  }

  getVnodeHooks(hook, id) {
    const app = this;
    if (!app.vnodeHooks || !app.vnodeHooks[hook]) return [];
    return app.vnodeHooks[hook][id] || [];
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

Framework7.loadComponent = function loadComponent(path) {
  return new Promise((resolve, reject) => {
    if (typeof path !== 'string') {
      reject(new Error('Framework7: Component path must be a string'));
      return;
    }
    if (!path) {
      reject(new Error('Framework7: Component path must be specified'));
      return;
    }
    Framework7.request.get(
      path,
      (scriptContent) => {
        const id = Utils.id();
        const callbackLoadName = `f7_component_loader_callback_${id}`;

        const scriptEl = document.createElement('script');
        scriptEl.innerHTML = `window.${callbackLoadName} = function () {${scriptContent}\nreturn framework7ComponentLoader}`;
        $('head').append(scriptEl);

        const componentLoader = window[callbackLoadName]();
        delete window[callbackLoadName];
        $(scriptEl).remove();

        if (!componentLoader) {
          reject(new Error(`Framework7: Can't find Framework7 component in ${path} file`));
          return;
        }

        // Check if it was already added
        if (Framework7.prototype.modules && Framework7.prototype.modules[componentLoader.componentName]) {
          resolve();
          return;
        }

        // Then execure
        const module = componentLoader({
          $,
          Template7,
          Utils,
          Device,
          Support,
          ConstructorMethods,
          ModalMethods,
          Framework7Class,
          Modal,
        });

        if (!module) {
          reject(new Error(`Framework7: Can't find Framework7 component in ${path} file`));
          return;
        }

        // One more check if it was added
        if (Framework7.prototype.modules && Framework7.prototype.modules[module.name]) {
          resolve();
          return;
        }

        // Install It
        Framework7.use(module);

        // Extend app instance
        const app = Framework7.instance;

        if (app) {
          app.useModuleParams(module, app.params);
          app.useModule(module);
        }

        resolve();
      },
      (xhr, status) => {
        reject(xhr, status);
      }
    );
  });
};
Framework7.loadComponents = function loadComponents(paths) {
  return Promise.all(paths.map(path => Framework7.loadComponent(path)));
};

export default Framework7;
