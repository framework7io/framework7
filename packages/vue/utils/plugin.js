import Vue from 'vue';
/* eslint no-underscore-dangle: "off" */
import componentsRouter from './components-router';
import f7, { f7Instance } from './f7';

function f7ready(callback) {
  f7.ready(callback);
}

const f7Theme = {};

const Plugin = {
  name: 'phenomePlugin',
  installed: false,
  install(params = {}) {
    if (Plugin.installed) return;
    Plugin.installed = true;

    const Framework7 = this;
    f7.Framework7 = Framework7;
    f7.events = new Framework7.Events();

    // eslint-disable-next-line
    const Extend = params.Vue || Vue;

    
    // DEFINE_INSTANCE_PROTOS_START
    Object.defineProperty(Extend.prototype, '$f7', {
      get() {
        return f7.instance;
      },
    });
    // DEFINE_INSTANCE_PROTOS_END

    const { theme } = params;
    if (theme === 'md') f7Theme.md = true;
    if (theme === 'ios') f7Theme.ios = true;
    if (theme === 'aurora') f7Theme.aurora = true;
    if (!theme || theme === 'auto') {
      f7Theme.ios = !!Framework7.device.ios;
      f7Theme.aurora = Framework7.device.desktop && Framework7.device.electron;
      f7Theme.md = !f7Theme.ios && !f7Theme.aurora;
    }
    f7.ready(() => {
      f7Theme.ios = f7.instance.theme === 'ios';
      f7Theme.md = f7.instance.theme === 'md';
      f7Theme.aurora = f7.instance.theme === 'aurora';
    });

    // DEFINE_PROTOS_START
    Object.defineProperty(Extend.prototype, '$theme', {
      get() {
        return {
          ios: f7.instance ? f7.instance.theme === 'ios' : f7Theme.ios,
          md: f7.instance ? f7.instance.theme === 'md' : f7Theme.md,
          aurora: f7.instance ? f7.instance.theme === 'aurora' : f7Theme.aurora,
        };
      },
    });

    Extend.prototype.Dom7 = Framework7.$;
    Extend.prototype.$$ = Framework7.$;
    Extend.prototype.$device = Framework7.device;
    Extend.prototype.$request = Framework7.request;
    Extend.prototype.$utils = Framework7.utils;
    Extend.prototype.$f7ready = f7ready;

    Object.defineProperty(Extend.prototype, '$f7route', {
      get() {
        const self = this;
        if (self.props && self.props.f7route) return self.props.f7route;
        if (self.f7route) return self.f7route;
        if (self._f7route) return self._f7route;

        let route;
        // eslint-disable-next-line
        if ('vue' === 'vue') {
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
        if ('vue' === 'vue') {
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
    // DEFINE_PROTOS_END

    // Extend F7 Router
    Framework7.Router.use(componentsRouter);
  },
};

export { f7ready, f7Instance as f7, f7Theme as theme };
export default Plugin;
