import $ from 'dom7';
import Template7 from 'template7';
import Utils from '../utils/utils';
import morphdom from 'morphdom';

const eventAttrNamePrefix = 'data-f7event-';

class Framework7Component {
  constructor(c, extend = {}) {
    const context = Utils.extend({}, extend);
    const component = Utils.extend(this, c, { context });

    let tempDom = document.createElement('div');

    // Apply context
    ('beforeCreate created beforeMount mounted beforeDestroy destroyed').split(' ').forEach((cycleKey) => {
      if (component[cycleKey]) component[cycleKey] = component[cycleKey].bind(context);
    });

    if (component.data) {
      component.data = component.data.bind(context);
      // Data
      context.data = wrapComponentDataWithProxy(component.data());
    }
    if (component.render) component.render = component.render.bind(context);
    if (component.methods) {
      Object.keys(component.methods).forEach((methodName) => {
        context[methodName] = component.methods[methodName].bind(context);
      });
    }
    if (component.on) {
      Object.keys(component.on).forEach((eventName) => {
        component.on[eventName] = component.on[eventName].bind(context);
      });
    }

    if (component.beforeCreate) component.beforeCreate();

    // Watchers
    if (component.watch) {
      Object.keys(component.watch).forEach((watchKey) => {
        let dataKeyValue = component.context[watchKey];
        Object.defineProperty(component.context, watchKey, {
          enumerable: true,
          configurable: true,
          set(newValue) {
            dataKeyValue = newValue;
            component.watch[watchKey].call(context, dataKeyValue);
          },
          get() {
            return dataKeyValue;
          },
        });
      });
    }

    // Render template
    let html = '';
    if (component.render) {
      html = component.render();
    } else if (component.template) {

      let t7context = {
        $root: context.$root,
        $route: context.$route,
        $theme: context.$theme
      }

      if (context.data) {
        Utils.extend(t7context, context.data);
      }

      if (typeof component.template === 'string') {
        html = Template7.compile(component.template)(t7context);
      } else {
        // Supposed to be function
        html = component.template(t7context);
      }
    }

    // Make Dom
    if (html && typeof html === 'string') {
      html = html.trim();
      // Replace '@click'-style attributes with 'data-f7event-click'-style to receive DOM api compatible "morphable" nodes
      html = html.replace(/@/g, eventAttrNamePrefix);
      tempDom.innerHTML = html;
    } else if (html) {
      tempDom.innerHTML = '';
      tempDom.appendChild(html);
    }

    // Extend context with $el
    const el = tempDom.children[0];
    context.$el = $(el);
    component.el = el;

    // Find Events
    const events = [];
    findEvents();

    function findEvents() {
      $(tempDom).find('*').each((index, element) => {
        for (let i = 0; i < element.attributes.length; i += 1) {
          const attr = element.attributes[i];
          if (attr.name.indexOf(eventAttrNamePrefix) === 0) {
            const event = attr.name.replace(eventAttrNamePrefix, '');
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
 
            const value = attr.value;
            element.removeAttribute(attr.name);
            events.push({
              el: element,
              name,
              once,
              handler: (...args) => {
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
                        if (!deepArg) deepArg = context;
                        deepArg = deepArg[path];
                      });
                      arg = deepArg;
                    } else {
                      arg = context[arg];
                    }
                    customArgs.push(arg);
                  });
                }
                if (methodName.indexOf('.') >= 0) {
                  methodName.split('.').forEach((path, pathIndex) => {
                    if (!method) method = context;
                    if (method[path]) method = method[path];
                    else {
                      throw new Error(`Component doesn't have method "${methodName.split('.').slice(0, pathIndex + 1).join('.')}"`);
                    }
                  });
                } else {
                  if (!context[methodName]) {
                    throw new Error(`Component doesn't have method "${methodName}"`);
                  }
                  method = context[methodName];
                }
                method(...customArgs);
              },
            });
          }
        }
      });
    }

    // Set styles scope ID
    let styleEl;
    if (component.style) {
      styleEl = document.createElement('style');
      styleEl.innerHTML = component.style;
    }
    if (component.styleScopeId) {
      el.setAttribute('data-scope', component.styleScopeId);
    }

    // Attach events
    function attachEvents() {
      events.forEach((event) => {
        $(event.el)[event.once ? 'once' : 'on'](event.name, event.handler);
      });
    }

    function detachEvents() {
      events.forEach((event) => {
        $(event.el).off(event.name, event.handler);
      });
    }

    attachEvents();

    // Created callback
    if (component.created) component.created();

    // Mount
    component.mount = function mount(mountMethod) {
      if (component.beforeMount) component.beforeMount();
      if (styleEl) $('head').append(styleEl);
      if (mountMethod) mountMethod(el);
      if (component.mounted) component.mounted();
    };

    // Destroy
    component.destroy = function destroy() {
      if (component.beforeDestroy) component.beforeDestroy();
      if (styleEl) $(styleEl).remove();
      detachEvents();
      if (component.destroyed) component.destroyed();
    };

    // Store component instance
    function storeComponentInstance() {
      for (let i = 0; i < tempDom.children.length; i += 1) {
        tempDom.children[i].f7Component = component;
      }
    }

    storeComponentInstance();


    // Wrap component data elements with proxy objects to catch viewmodel changes
    function wrapComponentDataWithProxy(obj) {
      var result = new Proxy({}, {set: onViewModelChange});

      for (var p in obj) {
        if( obj.hasOwnProperty(p) ) {
          var t = "";
          if (typeof obj[p] === "object") { t = "object" }
          if (Array.isArray(obj[p])) { t = "array" }
          if (typeof obj[p] === "string") { t = "string" }
          if (Number.isFinite(obj[p])) { t = "number" }
          if (Number.isInteger(obj[p])) { t = "integer" }
          if (Object.prototype.toString.call(obj[p]) === "[object Date]") { t = "date" }

          if (t === "object") {
            result[p] = wrapComponentDataWithProxy(obj[p]);
          } else if (t === "array") {
            result[p] = new Proxy(obj[p], {set: onViewModelChange});
          } else {
            result[p] = obj[p];
          }
        }
      }

      return result;
    }

    // Proxy's set interceptor to transform the dom on a viewmodel (component.data) change
    function onViewModelChange(obj, prop, newval, receiver) {

      let oldval = obj[prop];

      if (oldval !== newval) {

        obj[prop] = newval;

        if (oldval) {

          let t7context = {
            $root: context.$root,
            $route: context.$route,
            $theme: context.$theme
          }

          if (context.data) {
            Utils.extend(t7context, context.data);
          }

          let newHtml = '';
          if (typeof component.template === 'string') {
            newHtml = Template7.compile(component.template)(t7context);
          } else {
            // Supposed to be function
            newHtml = component.template(t7context);
          }
          if (newHtml && typeof newHtml === 'string') {
            newHtml = newHtml.trim();
          }
          newHtml = newHtml.replace(/@/g, eventAttrNamePrefix);

          tempDom = component.el;

          detachEvents();
          events.length = 0;

          morphdom(tempDom, newHtml, {childrenOnly: true});

          findEvents();
          attachEvents();

          let el = tempDom.children[0];
          context.$el = $(el);

          storeComponentInstance();
        }
      }
      return true;
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
      template = componentString.split('<template>')[1].split('</template>')[0].trim();
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
      scriptContent = componentString.split('<script>')[1].split('</script>')[0].trim();
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
