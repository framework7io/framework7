import { window, document } from 'ssr-window';
import $ from 'dom7';
import Template7 from 'template7';
import Utils from '../../utils/utils';
import vdom from './vdom';
import patch from './patch';

let counter = 0;

function renderEsTemplate(template, id) {
  const callbackName = `f7_component_es_template${id || new Date().getTime()}`;

  const scriptContent = `
    window.${callbackName} = function () {
      return \`${template}\`;
    }
  `;
  // Insert Script El
  const scriptEl = document.createElement('script');
  scriptEl.innerHTML = scriptContent;
  $('head').append(scriptEl);

  // Render function
  const render = window[callbackName];

  // Remove Script El
  $(scriptEl).remove();
  delete window[callbackName];

  return render;
}

class Framework7Component {
  constructor(app, options, extendContext = {}) {
    const id = `${Utils.now()}${counter}`;
    const self = Utils.merge(
      this,
      extendContext,
      {
        $,
        $$: $,
        $dom7: $,
        $app: app,
        $options: Utils.extend({ id }, options),
      }
    );
    const { $options } = self;
    counter += 1;

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

    // Apply context
    ('beforeCreate created beforeMount mounted beforeDestroy destroyed updated').split(' ').forEach((cycleKey) => {
      if ($options[cycleKey]) $options[cycleKey] = $options[cycleKey].bind(self);
    });

    if ($options.data) {
      $options.data = $options.data.bind(self);
      // Data
      Utils.extend(self, $options.data());
    }
    if ($options.render) $options.render = $options.render.bind(self);
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

    // Before create hook
    if ($options.beforeCreate) $options.beforeCreate();

    // Render
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
        self.el.setAttribute('data-scope', $options.id);
      }
    }

    self.$attachEvents();

    // Created callback
    if ($options.created) $options.created();

    // Store component instance
    self.el.f7Component = self;

    return self;
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
        if ($options.templateType === 't7' || !$options.templateType) {
          try {
            html = Template7.compile($options.template)(self);
          } catch (err) {
            throw err;
          }
        }
        if ($options.templateType === 'es') {
          $options.render = renderEsTemplate($options.template, $options.id).bind(self);
          html = $options.render();
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
    if (self.$options.beforeMount) self.$options.beforeMount();
    if (self.$styleEl) $('head').append(self.$styleEl);
    if (mountMethod) mountMethod(self.el);
    if (self.$options.mounted) self.$options.mounted();
  }

  $destroy() {
    const self = this;
    if (self.$options.beforeDestroy) self.$options.beforeDestroy();
    if (self.$styleEl) $(self.$styleEl).remove();
    self.$detachEvents();
    if (self.$options.destroyed) self.$options.destroyed();
    if (window[`f7_component_es_template${self.$options.id}`]) {
      delete window[`f7_component_es_template${self.$options.id}`];
    }
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
  }
}

export default Framework7Component;
