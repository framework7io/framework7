// IMPORT_LIBRARY
// IMPORT_COMPONENTS
/* eslint no-underscore-dangle: "off" */
import Utils from './utils';
import componentsRouter from './components-router';
import routers from './routers';
import events from './events';

const Plugin = {
  name: 'phenomePlugin',
  Framework7: null,
  instance: null,
  events,
  routers,
  init(rootEl, params = {}, routes) {
    const f7Params = Utils.extend({}, params, {
      root: rootEl,
    });
    if (routes && routes.length && !f7Params.routes) f7Params.routes = routes;

    Plugin.instance = new Plugin.Framework7(f7Params);
    Plugin.events.emit('ready', Plugin.instance);
  },
  install(params) {
    const Framework7 = this;
    Plugin.Framework7 = Framework7;

    const Extend = EXTEND; // eslint-disable-line
    const compiler = COMPILER; // eslint-disable-line
    const refs = REFS_PROP; // eslint-disable-line

    // REGISTER_COMPONENTS

    // Define protos
    Object.defineProperty(Extend.prototype, '$f7', {
      get() {
        return Plugin.instance;
      },
    });

    const $theme = {};
    const { theme } = params;
    if (theme === 'md') $theme.md = true;
    if (theme === 'ios') $theme.ios = true;
    if (!theme || theme === 'auto') {
      $theme.ios = !!(Framework7.Device || Framework7.device).ios;
      $theme.md = !(Framework7.Device || Framework7.device).ios;
    }
    Object.defineProperty(Extend.prototype, '$theme', {
      get() {
        return {
          ios: Plugin.instance ? Plugin.instance.theme === 'ios' : $theme.ios,
          md: Plugin.instance ? Plugin.instance.theme === 'md' : $theme.md,
        };
      },
    });

    function f7ready(callback) {
      Plugin.ready(callback);
    }
    Extend.prototype.Dom7 = Framework7.$;
    Extend.prototype.$$ = Framework7.$;
    Extend.prototype.$device = Framework7.device;
    Extend.prototype.$request = Framework7.request;
    Extend.prototype.$utils = Framework7.utils;
    Extend.prototype.$f7ready = f7ready;
    Extend.prototype.$f7Ready = f7ready;

    Object.defineProperty(Extend.prototype, '$f7route', {
      get() {
        const self = this;
        let route;
        let parent = self;
        if (self._f7route) route = self._f7route;
        while (parent && !route) {
          if (parent._f7route) route = parent._f7route;
          if (compiler === 'vue') {
            parent = parent.$parent;
          } else {
            parent = parent._reactInternalFiber._debugOwner.stateNode;
          }
        }
        return route;
      },
      set(value) {
        const self = this;
        self._f7route = value;
      },
    });
    Object.defineProperty(Extend.prototype, '$f7router', {
      get() {
        const self = this;
        let router;
        let parent = self;
        if (self._f7router) router = self._f7router;
        while (parent && !router) {
          if (parent._f7router) router = parent._f7router;
          else if (parent.f7View) {
            router = parent.f7View.router;
          } else if (parent[refs] && parent[refs].el && parent[refs].el.f7View) {
            router = parent[refs].el.f7View.router;
          }
          if (compiler === 'vue') {
            parent = parent.$parent;
          } else {
            parent = parent._reactInternalFiber._debugOwner.stateNode;
          }
        }
        return router;
      },
      set(value) {
        const self = this;
        self._f7router = value;
      },
    });

    // Extend F7 Router
    Framework7.Router.use(componentsRouter);
  },
  ready(callback) {
    if (!callback) return;
    if (Plugin.instance) callback(Plugin.instance);
    else {
      events.once('ready', callback);
    }
  },
};

export default Plugin;
