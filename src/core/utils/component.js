import { window, document } from 'ssr-window';
import $ from 'dom7';
import Template7 from 'template7';
import Utils from './utils';

const tempDom = document.createElement('div');

class Framework7Component {
  constructor(opts, extendContext = {}) {
    const options = Utils.extend({}, opts);
    let component = Utils.merge(this, extendContext, { $options: options });

    // Apply context
    ('beforeCreate created beforeMount mounted beforeDestroy destroyed').split(' ').forEach((cycleKey) => {
      if (options[cycleKey]) options[cycleKey] = options[cycleKey].bind(component);
    });

    if (options.data) {
      options.data = options.data.bind(component);
      // Data
      Utils.extend(component, options.data());
    }
    if (options.render) options.render = options.render.bind(component);
    if (options.methods) {
      Object.keys(options.methods).forEach((methodName) => {
        component[methodName] = options.methods[methodName].bind(component);
      });
    }

    // Bind Events
    if (options.on) {
      Object.keys(options.on).forEach((eventName) => {
        options.on[eventName] = options.on[eventName].bind(component);
      });
    }
    if (options.once) {
      Object.keys(options.once).forEach((eventName) => {
        options.once[eventName] = options.once[eventName].bind(component);
      });
    }

    if (options.beforeCreate) options.beforeCreate();

    // Watchers
    if (options.watch) {
      Object.keys(options.watch).forEach((watchKey) => {
        let dataKeyValue = component[watchKey];
        Object.defineProperty(component, watchKey, {
          enumerable: true,
          configurable: true,
          set(newValue) {
            const previousValue = dataKeyValue;
            dataKeyValue = newValue;
            if (previousValue === newValue) return;
            options.watch[watchKey].call(component, newValue, previousValue);
          },
          get() {
            return dataKeyValue;
          },
        });
      });
    }

    // Render template

    function render() {
      let html = '';
      if (options.render) {
        html = options.render();
      } else if (options.template) {
        if (typeof options.template === 'string') {
          try {
            html = Template7.compile(options.template)(component);
          } catch (err) {
            throw err;
          }
        } else {
          // Supposed to be function
          html = options.template(component);
        }
      }
      return html;
    }

    let html = render();

    // Make Dom
    if (html && typeof html === 'string') {
      html = html.trim();
      tempDom.innerHTML = html;
    } else if (html) {
      tempDom.innerHTML = '';
      tempDom.appendChild(html);
    }

    // Extend component with $el
    const el = tempDom.children[0];
    const $el = $(el);
    component.$el = $el;
    component.el = el;
    component.el = el;

    // Find Events
    const events = [];
    $(tempDom).find('*').each((index, element) => {
      const attrs = [];
      for (let i = 0; i < element.attributes.length; i += 1) {
        const attr = element.attributes[i];
        if (attr.name.indexOf('@') === 0) {
          attrs.push({
            name: attr.name,
            value: attr.value,
          });
        }
      }
      attrs.forEach((attr) => {
        element.removeAttribute(attr.name);
        const event = attr.name.replace('@', '');
        let name = event;
        let stop = false;
        let prevent = false;
        let once = false;
        if (event.indexOf('.') >= 0) {
          event.split('.').forEach((eventNamePart, eventNameIndex) => {
            if (eventNameIndex === 0) name = eventNamePart;
            else {
              if (eventNamePart === 'stop') stop = true;
              if (eventNamePart === 'prevent') prevent = true;
              if (eventNamePart === 'once') once = true;
            }
          });
        }
        const value = attr.value.toString();
        events.push({
          el: element,
          name,
          once,
          handler(...args) {
            const e = args[0];
            if (stop) e.stopPropagation();
            if (prevent) e.preventDefault();
            let methodName;
            let method;
            let customArgs = [];
            if (value.indexOf('(') < 0) {
              customArgs = args;
              methodName = value;
            } else {
              methodName = value.split('(')[0];
              value.split('(')[1].split(')')[0].split(',').forEach((argument) => {
                let arg = argument.trim();
                // eslint-disable-next-line
                if (!isNaN(arg)) arg = parseFloat(arg);
                else if (arg === 'true') arg = true;
                else if (arg === 'false') arg = false;
                else if (arg === 'null') arg = null;
                else if (arg === 'undefined') arg = undefined;
                else if (arg[0] === '"') arg = arg.replace(/"/g, '');
                else if (arg[0] === '\'') arg = arg.replace(/'/g, '');
                else if (arg.indexOf('.') > 0) {
                  let deepArg;
                  arg.split('.').forEach((path) => {
                    if (!deepArg) deepArg = component;
                    deepArg = deepArg[path];
                  });
                  arg = deepArg;
                } else {
                  arg = component[arg];
                }
                customArgs.push(arg);
              });
            }
            if (methodName.indexOf('.') >= 0) {
              methodName.split('.').forEach((path, pathIndex) => {
                if (!method) method = component;
                if (method[path]) method = method[path];
                else {
                  throw new Error(`Component doesn't have method "${methodName.split('.').slice(0, pathIndex + 1).join('.')}"`);
                }
              });
            } else {
              if (!component[methodName]) {
                throw new Error(`Component doesn't have method "${methodName}"`);
              }
              method = component[methodName];
            }
            method(...customArgs);
          },
        });
      });
    });

    // Set styles scope ID
    let styleEl;
    if (options.style) {
      styleEl = document.createElement('style');
      styleEl.innerHTML = options.style;
    }
    if (options.styleScopeId) {
      el.setAttribute('data-scope', options.styleScopeId);
    }

    // Attach events
    function attachEvents() {
      if (options.on) {
        Object.keys(options.on).forEach((eventName) => {
          $el.on(Utils.eventNameToColonCase(eventName), options.on[eventName]);
        });
      }
      if (options.once) {
        Object.keys(options.once).forEach((eventName) => {
          $el.once(Utils.eventNameToColonCase(eventName), options.once[eventName]);
        });
      }
      events.forEach((event) => {
        $(event.el)[event.once ? 'once' : 'on'](event.name, event.handler);
      });
    }

    function detachEvents() {
      if (options.on) {
        Object.keys(options.on).forEach((eventName) => {
          $el.off(Utils.eventNameToColonCase(eventName), options.on[eventName]);
        });
      }
      if (options.once) {
        Object.keys(options.once).forEach((eventName) => {
          $el.off(Utils.eventNameToColonCase(eventName), options.once[eventName]);
        });
      }
      events.forEach((event) => {
        $(event.el).off(event.name, event.handler);
      });
    }

    attachEvents();

    // Created callback
    if (options.created) options.created();

    // Mount
    component.$mount = function mount(mountMethod) {
      if (options.beforeMount) options.beforeMount();
      if (styleEl) $('head').append(styleEl);
      if (mountMethod) mountMethod(el);
      if (options.mounted) options.mounted();
    };

    // Destroy
    component.$destroy = function destroy() {
      if (options.beforeDestroy) options.beforeDestroy();
      if (styleEl) $(styleEl).remove();
      detachEvents();
      if (options.destroyed) options.destroyed();
      // Delete component instance
      if (el && el.f7Component) {
        el.f7Component = null;
        delete el.f7Component;
      }
      Utils.deleteProps(component);
      component = null;
    };

    // Store component instance
    for (let i = 0; i < tempDom.children.length; i += 1) {
      tempDom.children[i].f7Component = component;
    }

    return component;
  }
}


const Component = {
  parse(componentString) {
    const callbackName = `f7_component_callback_${new Date().getTime()}`;

    // Template
    let template;
    if (componentString.indexOf('<template>') >= 0) {
      template = componentString
        .split('<template>')
        .filter((item, index) => index > 0)
        .join('<template>')
        .split('</template>')
        .filter((item, index, arr) => index < arr.length - 1)
        .join('</template>')
        .replace(/{{#raw}}([ \n]*)<template/g, '{{#raw}}<template')
        .replace(/\/template>([ \n]*){{\/raw}}/g, '/template>{{/raw}}')
        .replace(/([ \n])<template/g, '$1{{#raw}}<template')
        .replace(/\/template>([ \n])/g, '/template>{{/raw}}$1');
    }

    // Styles
    let style;
    const styleScopeId = Utils.now();
    if (componentString.indexOf('<style>') >= 0) {
      style = componentString.split('<style>')[1].split('</style>')[0];
    } else if (componentString.indexOf('<style scoped>') >= 0) {
      style = componentString.split('<style scoped>')[1].split('</style>')[0];
      style = style.split('\n').map((line) => {
        if (line.indexOf('{') >= 0) {
          if (line.indexOf('{{this}}') >= 0) {
            return line.replace('{{this}}', `[data-scope="${styleScopeId}"]`);
          }
          return `[data-scope="${styleScopeId}"] ${line.trim()}`;
        }
        return line;
      }).join('\n');
    }

    let scriptContent;
    if (componentString.indexOf('<script>') >= 0) {
      const scripts = componentString.split('<script>');
      scriptContent = scripts[scripts.length - 1].split('</script>')[0].trim();
    } else {
      scriptContent = 'return {}';
    }
    scriptContent = `window.${callbackName} = function () {${scriptContent}}`;

    // Insert Script El
    const scriptEl = document.createElement('script');
    scriptEl.innerHTML = scriptContent;
    $('head').append(scriptEl);

    const component = window[callbackName]();

    // Remove Script El
    $(scriptEl).remove();

    if (!component.template && !component.render) {
      component.template = template;
    }
    if (style) {
      component.style = style;
      component.styleScopeId = styleScopeId;
    }
    return component;
  },
  create(c, extendContext = {}) {
    return new Framework7Component(c, extendContext);
  },
};
export default Component;
