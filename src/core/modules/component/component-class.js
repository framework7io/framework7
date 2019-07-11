/* eslint no-underscore-dangle: "off" */
import { window, document } from 'ssr-window';
import $ from 'dom7';
import Template7 from 'template7';
import Utils from '../../utils/utils';
import vdom from './vdom';
import patch from './patch';

class Framework7Component {
  constructor(app, options, extendContext = {}, children = []) {
    const id = Utils.id();
    const self = Utils.merge(
      this,
      extendContext,
      {
        $,
        $$: $,
        $dom7: $,
        $app: app,
        $f7: app,
        $options: Utils.extend({ id }, options),
        $id: options.id || id,
        $children: children,
      }
    );
    const { $options } = self;

    // Root data and methods
    Object.defineProperty(self, '$root', {
      enumerable: true,
      configurable: true,
      get() {
        let root = Utils.merge({}, app.data, app.methods);
        if (window && window.Proxy) {
          root = new window.Proxy(root, {
            set(target, name, val) {
              app.data[name] = val;
            },
            deleteProperty(target, name) {
              delete app.data[name];
              delete app.methods[name];
            },
            has(target, name) {
              return (name in app.data || name in app.methods);
            },
          });
        }
        return root;
      },
      set() {},
    });

    // Bind hooks
    ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'updated']
      .forEach((cycleKey) => {
        if ($options[cycleKey]) $options[cycleKey] = $options[cycleKey].bind(self);
      });

    // Bind render
    if ($options.render) $options.render = $options.render.bind(self);

    // Bind methods
    if ($options.methods) {
      Object.keys($options.methods).forEach((methodName) => {
        self[methodName] = $options.methods[methodName].bind(self);
      });
    }

    // Bind Events
    if ($options.on) {
      Object.keys($options.on).forEach((eventName) => {
        $options.on[eventName] = $options.on[eventName].bind(self);
      });
    }
    if ($options.once) {
      Object.keys($options.once).forEach((eventName) => {
        $options.once[eventName] = $options.once[eventName].bind(self);
      });
    }

    // Bind Data
    if ($options.data) $options.data = $options.data.bind(self);

    return new Promise((resolve, reject) => {
      self.$hook('data', true)
        .then((data) => {
          if (data) Utils.extend(self, data);
          self.$hook('beforeCreate');
          let html = self.$render();

          if (self.$options.el) {
            html = html.trim();
            self.$vnode = vdom(html, self, true);
            if ($options.style) {
              self.$styleEl = document.createElement('style');
              self.$styleEl.innerHTML = $options.style;
              if ($options.styleScoped) {
                self.$vnode.data.attrs[`data-f7-${$options.id}`] = '';
              }
            }
            self.el = self.$options.el;
            patch(self.el, self.$vnode);
            self.el = self.$vnode.elm;
            self.$el = $(self.el);

            self.$attachEvents();
            self.el.f7Component = self;
            self.$hook('created');
            self.$mount();
            resolve(self);
            return;
          }
          // Make Dom
          if (html && typeof html === 'string') {
            html = html.trim();
            self.$vnode = vdom(html, self, true);
            if ($options.style && $options.styleScoped) {
              self.$vnode.data.attrs[`data-f7-${$options.id}`] = '';
            }
            self.el = document.createElement(self.$vnode.sel || 'div');
            patch(self.el, self.$vnode);
            self.$el = $(self.el);
          } else if (html) {
            self.el = html;
            self.$el = $(self.el);
            if ($options.style && $options.styleScoped) {
              self.el.setAttribute(`data-f7-${$options.id}`, '');
            }
          }
          if ($options.style) {
            self.$styleEl = document.createElement('style');
            self.$styleEl.innerHTML = $options.style;
          }

          self.$attachEvents();

          self.el.f7Component = self;

          self.$hook('created');
          resolve(self);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  $attachEvents() {
    const self = this;
    const { $options, $el } = self;
    if ($options.on) {
      Object.keys($options.on).forEach((eventName) => {
        $el.on(Utils.eventNameToColonCase(eventName), $options.on[eventName]);
      });
    }
    if ($options.once) {
      Object.keys($options.once).forEach((eventName) => {
        $el.once(Utils.eventNameToColonCase(eventName), $options.once[eventName]);
      });
    }
  }

  $detachEvents() {
    const self = this;
    const { $options, $el } = self;
    if ($options.on) {
      Object.keys($options.on).forEach((eventName) => {
        $el.off(Utils.eventNameToColonCase(eventName), $options.on[eventName]);
      });
    }
    if ($options.once) {
      Object.keys($options.once).forEach((eventName) => {
        $el.off(Utils.eventNameToColonCase(eventName), $options.once[eventName]);
      });
    }
  }

  $render() {
    const self = this;
    const { $options } = self;
    let html = '';
    if ($options.render) {
      html = $options.render();
    } else if ($options.template) {
      if (typeof $options.template === 'string') {
        try {
          html = Template7.compile($options.template)(self);
        } catch (err) {
          throw err;
        }
      } else {
        // Supposed to be function
        html = $options.template(self);
      }
    }
    return html;
  }

  $tick(callback) {
    const self = this;
    window.requestAnimationFrame(() => {
      if (self.__updateIsPending) {
        window.requestAnimationFrame(() => {
          callback();
        });
      } else {
        callback();
      }
    });
  }

  $update() {
    const self = this;
    window.cancelAnimationFrame(self.__requestAnimationFrameId);
    delete self.__requestAnimationFrameId;
    self.__updateIsPending = true;
    self.__requestAnimationFrameId = window.requestAnimationFrame(() => {
      let html = self.$render();

      // Make Dom
      if (html && typeof html === 'string') {
        html = html.trim();
        const newVNode = vdom(html, self, false);
        self.$vnode = patch(self.$vnode, newVNode);
      }
      self.__updateIsPending = false;
      delete self.__updateIsPending;
    });
  }

  $setState(mergeState) {
    const self = this;
    Utils.merge(self, mergeState);
    self.$update();
  }

  $mount(mountMethod) {
    const self = this;
    self.$hook('beforeMount');
    if (self.$styleEl) $('head').append(self.$styleEl);
    if (mountMethod) mountMethod(self.el);
    self.$hook('mounted');
  }

  $destroy() {
    const self = this;
    self.$hook('beforeDestroy');

    if (self.$styleEl) $(self.$styleEl).remove();
    self.$detachEvents();
    self.$hook('destroyed');
    // Delete component instance
    if (self.el && self.el.f7Component) {
      self.el.f7Component = null;
      delete self.el.f7Component;
    }
    // Patch with empty node
    if (self.$vnode) {
      self.$vnode = patch(self.$vnode, { sel: self.$vnode.sel, data: {} });
    }
    // Clear update queue
    window.cancelAnimationFrame(self.__requestAnimationFrameId);

    // Delete all props
    Utils.deleteProps(self);
  }

  $hook(name, async) {
    const self = this;
    if (async) {
      return new Promise((resolve, reject) => {
        if (!self.$options[name]) {
          resolve();
          return;
        }
        const result = self.$options[name]();
        if (result instanceof Promise) {
          result
            .then(res => resolve(res))
            .catch(err => reject(err));
          return;
        }
        resolve(result);
      });
    }
    if (self.$options[name]) return self.$options[name]();
    return undefined;
  }
}

export default Framework7Component;
