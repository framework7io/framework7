// IMPORT_LIBRARY
// IMPORT_COMPONENTS
/* eslint no-underscore-dangle: "off" */
import componentsRouter from './components-router';
import f7 from './f7';

const Plugin = {
  name: 'phenomePlugin',
  installed: false,
  install(params = {}) {
    if (Plugin.installed) return;
    Plugin.installed = true;

    const Framework7 = this;
    f7.Framework7 = Framework7;
    f7.events = new Framework7.Events();

    const Extend = EXTEND; // eslint-disable-line

    // REGISTER_COMPONENTS

    // Define protos
    Object.defineProperty(Extend.prototype, '$f7', {
      get() {
        return f7.instance;
      },
    });

    const $theme = {};
    const { theme } = params;
    if (theme === 'md') $theme.md = true;
    if (theme === 'ios') $theme.ios = true;
    if (theme === 'aurora') $theme.aurora = true;
    if (!theme || theme === 'auto') {
      $theme.ios = !!Framework7.device.ios;
      $theme.aurora = Framework7.device.desktop && Framework7.device.electron;
      $theme.md = !$theme.ios && !$theme.aurora;
    }
    Object.defineProperty(Extend.prototype, '$theme', {
      get() {
        return {
          ios: f7.instance ? f7.instance.theme === 'ios' : $theme.ios,
          md: f7.instance ? f7.instance.theme === 'md' : $theme.md,
          aurora: f7.instance ? f7.instance.theme === 'aurora' : $theme.aurora,
        };
      },
    });

    function f7ready(callback) {
      f7.ready(callback);
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
        if (self.props && self.props.f7route) return self.props.f7route;
        if (self.f7route) return self.f7route;
        if (self._f7route) return self._f7route;

        let route;
        // eslint-disable-next-line
        if (COMPILER === 'vue') {
          if (self.$vnode && self.$vnode.data && self.$vnode.data.props && self.$vnode.data.props.f7route) {
            route = self.$vnode.data.props.f7route;
          }
          let parent = self;
          while (parent && !route) {
            if (parent._f7route) route = parent._f7route;
            parent = parent.$parent;
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
        if (self.props && self.props.f7router) return self.props.f7router;
        if (self.f7router) return self.f7router;
        if (self._f7router) return self._f7router;

        let router;
        // eslint-disable-next-line
        if (COMPILER === 'vue') {
          if (self.$vnode && self.$vnode.data && self.$vnode.data.props && self.$vnode.data.props.f7route) {
            router = self.$vnode.data.props.f7router;
          }
          let parent = self;
          while (parent && !router) {
            if (parent._f7router) router = parent._f7router;
            else if (parent.f7View) {
              router = parent.f7View.router;
            } else if (parent.$refs && parent.$refs.el && parent.$refs.el.f7View) {
              router = parent.$refs.el.f7View.router;
            }
            parent = parent.$parent;
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
};

export default Plugin;
