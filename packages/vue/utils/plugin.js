import Vue from 'vue';
/* eslint no-underscore-dangle: "off" */
import componentsRouter from './components-router';
import f7 from './f7';

const Plugin = {
  name: 'phenomePlugin',
  install(params = {}) {
    const Framework7 = this;
    f7.Framework7 = Framework7;

    const Extend = Vue; // eslint-disable-line
    const compiler = 'vue'; // eslint-disable-line
    const refs = '$refs'; // eslint-disable-line

    
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
    if (!theme || theme === 'auto') {
      $theme.ios = !!(Framework7.Device || Framework7.device).ios;
      $theme.md = !(Framework7.Device || Framework7.device).ios;
    }
    Object.defineProperty(Extend.prototype, '$theme', {
      get() {
        return {
          ios: f7.instance ? f7.instance.theme === 'ios' : $theme.ios,
          md: f7.instance ? f7.instance.theme === 'md' : $theme.md,
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
        let parent = self;
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
        if (self.props && self.props.f7router) return self.props.f7router;
        if (self.f7router) return self.f7router;
        if (self._f7router) return self._f7router;
        let router;
        let parent = self;
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
};

export default Plugin;
