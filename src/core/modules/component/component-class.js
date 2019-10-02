/* eslint no-underscore-dangle: "off" */
import { window, document } from 'ssr-window';
import $ from 'dom7';
import Template7 from 'template7';
import Utils from '../../utils/utils';
import vdom from './vdom';
import patch from './patch';

import componentMixins from './component-mixins';

class Component {
  constructor(app, options = {}, extendContext = {}, children) {
    const id = Utils.id();
    const self = this;
    Utils.merge(
      self,
      { $props: {} },
      extendContext,
      {
        $,
        $$: $,
        $dom7: $,
        $app: app,
        $f7: app,
        $options: Utils.extend({ id }, options),
        $id: options.isClassComponent ? self.constructor.id : (options.id || id),
        $mixins: options.isClassComponent ? self.constructor.mixins : options.mixins,
        $children: children || [],
      }
    );
    const { $options } = self;


    if (self.$mixins && self.$mixins.length) {
      for (let i = self.$mixins.length - 1; i >= 0; i -= 1) {
        const mixin = self.$mixins[i];
        if (typeof mixin === 'string') {
          if (componentMixins[mixin]) self.$mixins[i] = componentMixins[mixin];
          else self.$mixins.splice(i, 1);
        }
      }
    }

    Object.defineProperty(self, '$slots', {
      enumerable: true,
      configurable: true,
      get() {
        const slots = {};
        self.$children.forEach((childVNode) => {
          let childSlotName = 'default';
          if (childVNode.data) {
            childSlotName = (childVNode.data.attrs && childVNode.data.attrs.slot) || 'default';
          }
          if (!slots[childSlotName]) slots[childSlotName] = [];
          slots[childSlotName].push(childVNode);
        });
        return slots;
      },
    });


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

    // Bind render
    if ($options.render) $options.render = $options.render.bind(self);

    // Bind methods
    const methods = {};
    if (self.$mixins && self.$mixins.length) {
      self.$mixins.forEach((mixin) => {
        if (mixin.methods) Object.assign(methods, mixin.methods);
      });
    }
    if ($options.methods) {
      Object.assign(methods, $options.methods);
    }
    Object.keys(methods).forEach((methodName) => {
      self[methodName] = methods[methodName].bind(self);
    });

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

    return new Promise((resolve, reject) => {
      self.$hook('data', true)
        .then((datas) => {
          const data = {};
          datas.forEach((dt) => {
            Object.assign(data, dt || {});
          });
          Utils.extend(self, data);
          self.$hook('beforeCreate');
          let html = self.$render();
          const style = $options.isClassComponent ? self.constructor.style : $options.style;
          const styleScoped = $options.isClassComponent ? self.constructor.styleScoped : $options.styleScoped;

          if (self.$options.el) {
            html = html.trim();
            self.$vnode = vdom(html, self, true);
            if (style) {
              self.$styleEl = document.createElement('style');
              self.$styleEl.innerHTML = style;
              if (styleScoped) {
                self.$vnode.data.attrs[`data-f7-${self.$id}`] = '';
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
            if (style && styleScoped) {
              self.$vnode.data.attrs[`data-f7-${self.$id}`] = '';
            }
            self.el = document.createElement(self.$vnode.sel || 'div');
            patch(self.el, self.$vnode);
            self.$el = $(self.el);
          } else if (html) {
            self.el = html;
            self.$el = $(self.el);
            if (style && styleScoped) {
              self.el.setAttribute(`data-f7-${self.$id}`, '');
            }
          }
          if (style) {
            self.$styleEl = document.createElement('style');
            self.$styleEl.innerHTML = style;
          }

          self.$attachEvents();

          if (self.el) {
            self.el.f7Component = self;
          }

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
    if (self.$mixins && self.$mixins.length) {
      self.$detachEventsHandlers = {};
      self.$mixins.forEach((mixin) => {
        if (mixin.on) {
          Object.keys(mixin.on).forEach((eventName) => {
            const handler = mixin.on[eventName].bind(self);
            if (!self.$detachEventsHandlers[eventName]) self.$detachEventsHandlers[eventName] = [];
            self.$detachEventsHandlers[eventName].push(handler);
            $el.on(Utils.eventNameToColonCase(eventName), handler);
          });
        }
        if (mixin.once) {
          Object.keys(mixin.once).forEach((eventName) => {
            const handler = mixin.once[eventName].bind(self);
            if (!self.$detachEventsHandlers[eventName]) self.$detachEventsHandlers[eventName] = [];
            self.$detachEventsHandlers[eventName].push(handler);
            $el.once(Utils.eventNameToColonCase(eventName), handler);
          });
        }
      });
    }
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
    if (!self.$detachEventsHandlers) return;
    Object.keys(self.$detachEventsHandlers).forEach((eventName) => {
      const handlers = self.$detachEventsHandlers[eventName];
      handlers.forEach((handler) => {
        $el.off(Utils.eventNameToColonCase(eventName), handler);
      });
      self.$detachEventsHandlers[eventName] = [];
      delete self.$detachEventsHandlers[eventName];
    });
    self.$detachEventsHandlers = null;
    delete self.$detachEventsHandlers;
  }

  $render() {
    const self = this;
    const { $options } = self;
    let html = '';
    if ($options.render) {
      html = $options.render();
    } else if (self.render) {
      html = self.render.call(self);
    } else if ($options.template) {
      if (typeof $options.template === 'string') {
        html = Template7.compile($options.template)(self);
      } else {
        // Supposed to be function
        html = $options.template(self);
      }
    }
    return html;
  }

  $tick(callback) {
    const self = this;
    return new Promise((resolve) => {
      window.requestAnimationFrame(() => {
        if (self.__updateIsPending) {
          window.requestAnimationFrame(() => {
            resolve();
            callback();
          });
        } else {
          resolve();
          callback();
        }
      });
    });
  }

  $update(callback) {
    const self = this;
    window.cancelAnimationFrame(self.__requestAnimationFrameId);
    delete self.__requestAnimationFrameId;
    self.__updateIsPending = true;
    return new Promise((resolve) => {
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
        if (callback) callback();
        resolve();
      });
    });
  }

  $setState(mergeState, callback) {
    const self = this;
    Utils.merge(self, mergeState);
    return self.$update(callback);
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
      const promises = [];
      if (self.$mixins && self.$mixins.length) {
        self.$mixins.forEach((mixin) => {
          if (mixin[name]) promises.push(mixin[name].call(self));
        });
      }
      if (self[name]) {
        promises.push(self[name].call(self));
      }
      if (self.$options[name]) {
        promises.push(self.$options[name].call(self));
      }
      return Promise.all(promises);
    }
    if (self.$mixins && self.$mixins.length) {
      self.$mixins.forEach((mixin) => {
        if (mixin[name] && typeof mixin[name] === 'function') {
          mixin[name].call(self);
        }
      });
    }
    if (self.$options[name]) return self.$options[name].call(self);
    if (self[name]) return self[name].call(self);
    return undefined;
  }
}

export default Component;
