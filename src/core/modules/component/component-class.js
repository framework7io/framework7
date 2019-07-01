import { window, document } from 'ssr-window';
import $ from 'dom7';
import Template7 from 'template7';
import Utils from '../../utils/utils';
import vdom from './vdom';
import patch from './patch';

class Framework7Component {
  constructor(app, options, extendContext = {}) {
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
    ('beforeCreate created beforeMount mounted beforeDestroy destroyed updated').split(' ').forEach((cycleKey) => {
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
      self.$hook('data')
        .then((data) => {
          if (data) Utils.extend(self, data);
          return self.$hook('beforeCreate');
        })
        .then(() => {
          let html = self.$render();

          // Make Dom
          if (html && typeof html === 'string') {
            html = html.trim();
            self.$vnode = vdom(html, self, app, true);
            self.el = document.createElement('div');
            patch(self.el, self.$vnode);
          } else if (html) {
            self.el = html;
          }
          self.$el = $(self.el);

          // Set styles scope ID
          if ($options.style) {
            self.$styleEl = document.createElement('style');
            self.$styleEl.innerHTML = $options.style;
            if ($options.styleScoped) {
              self.el.setAttribute(`data-f7-${$options.id}`, '');
            }
          }

          self.$attachEvents();

          self.el.f7Component = self;

          return self.$hook('created');
        })
        .then(() => {
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

  $forceUpdate() {
    const self = this;
    let html = self.$render();

    // Make Dom
    if (html && typeof html === 'string') {
      html = html.trim();
      const newVNode = vdom(html, self, self.$app);
      self.$vnode = patch(self.$vnode, newVNode);
    }
  }

  $setState(mergeState) {
    const self = this;
    Utils.merge(self, mergeState);
    self.$forceUpdate();
  }

  $mount(mountMethod) {
    const self = this;
    return self.$hook('beforeMount')
      .then(() => {
        if (self.$styleEl) $('head').append(self.$styleEl);
        if (mountMethod) mountMethod(self.el);
        return self.$hook('mounted');
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  $destroy() {
    const self = this;
    return self.$hook('beforeDestroy')
      .then(() => {
        if (self.$styleEl) $(self.$styleEl).remove();
        self.$detachEvents();
        return self.$hook('destroyed');
      })
      .then(() => {
        // Delete component instance
        if (self.el && self.el.f7Component) {
          self.el.f7Component = null;
          delete self.el.f7Component;
        }
        // Patch with empty node
        if (self.$vnode) {
          self.$vnode = patch(self.$vnode, { sel: self.$vnode.sel, data: {} });
        }
        Utils.deleteProps(self);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  $hook(name) {
    const self = this;
    return new Promise((resolve, reject) => {
      if (!self.$options[name]) resolve();
      const result = self.$options[name]();
      if (result instanceof Promise) {
        result
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        resolve(result);
      }
    });
  }
}

export default Framework7Component;
