'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ssrWindow = require('ssr-window');

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _template = require('template7');

var _template2 = _interopRequireDefault(_template);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tempDom = _ssrWindow.document.createElement('div');

var Framework7Component = function Framework7Component(opts) {
  var extendContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, Framework7Component);

  var options = _utils2.default.extend({}, opts);
  var component = _utils2.default.merge(this, extendContext, { $options: options });

  // Apply context
  'beforeCreate created beforeMount mounted beforeDestroy destroyed'.split(' ').forEach(function (cycleKey) {
    if (options[cycleKey]) options[cycleKey] = options[cycleKey].bind(component);
  });

  if (options.data) {
    options.data = options.data.bind(component);
    // Data
    _utils2.default.extend(component, options.data());
  }
  if (options.render) options.render = options.render.bind(component);
  if (options.methods) {
    Object.keys(options.methods).forEach(function (methodName) {
      component[methodName] = options.methods[methodName].bind(component);
    });
  }

  // Bind Events
  if (options.on) {
    Object.keys(options.on).forEach(function (eventName) {
      options.on[eventName] = options.on[eventName].bind(component);
    });
  }
  if (options.once) {
    Object.keys(options.once).forEach(function (eventName) {
      options.once[eventName] = options.once[eventName].bind(component);
    });
  }

  if (options.beforeCreate) options.beforeCreate();

  // Watchers
  if (options.watch) {
    Object.keys(options.watch).forEach(function (watchKey) {
      var dataKeyValue = component[watchKey];
      Object.defineProperty(component, watchKey, {
        enumerable: true,
        configurable: true,
        set: function set(newValue) {
          var previousValue = dataKeyValue;
          dataKeyValue = newValue;
          if (previousValue === newValue) return;
          options.watch[watchKey].call(component, newValue, previousValue);
        },
        get: function get() {
          return dataKeyValue;
        }
      });
    });
  }

  // Render template

  function render() {
    var html = '';
    if (options.render) {
      html = options.render();
    } else if (options.template) {
      if (typeof options.template === 'string') {
        try {
          html = _template2.default.compile(options.template)(component);
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

  var html = render();

  // Make Dom
  if (html && typeof html === 'string') {
    html = html.trim();
    tempDom.innerHTML = html;
  } else if (html) {
    tempDom.innerHTML = '';
    tempDom.appendChild(html);
  }

  // Extend component with $el
  var el = tempDom.children[0];
  var $el = (0, _dom2.default)(el);
  component.$el = $el;
  component.el = el;
  component.el = el;

  // Find Events
  var events = [];
  (0, _dom2.default)(tempDom).find('*').each(function (index, element) {
    var attrs = [];
    for (var i = 0; i < element.attributes.length; i += 1) {
      var attr = element.attributes[i];
      if (attr.name.indexOf('@') === 0) {
        attrs.push({
          name: attr.name,
          value: attr.value
        });
      }
    }
    attrs.forEach(function (attr) {
      element.removeAttribute(attr.name);
      var event = attr.name.replace('@', '');
      var name = event;
      var stop = false;
      var prevent = false;
      var once = false;
      if (event.indexOf('.') >= 0) {
        event.split('.').forEach(function (eventNamePart, eventNameIndex) {
          if (eventNameIndex === 0) name = eventNamePart;else {
            if (eventNamePart === 'stop') stop = true;
            if (eventNamePart === 'prevent') prevent = true;
            if (eventNamePart === 'once') once = true;
          }
        });
      }
      var value = attr.value.toString();
      events.push({
        el: element,
        name: name,
        once: once,
        handler: function handler() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var e = args[0];
          if (stop) e.stopPropagation();
          if (prevent) e.preventDefault();
          var methodName = void 0;
          var method = void 0;
          var customArgs = [];
          if (value.indexOf('(') < 0) {
            customArgs = args;
            methodName = value;
          } else {
            methodName = value.split('(')[0];
            value.split('(')[1].split(')')[0].split(',').forEach(function (argument) {
              var arg = argument.trim();
              // eslint-disable-next-line
              if (!isNaN(arg)) arg = parseFloat(arg);else if (arg === 'true') arg = true;else if (arg === 'false') arg = false;else if (arg === 'null') arg = null;else if (arg === 'undefined') arg = undefined;else if (arg[0] === '"') arg = arg.replace(/"/g, '');else if (arg[0] === '\'') arg = arg.replace(/'/g, '');else if (arg.indexOf('.') > 0) {
                var deepArg = void 0;
                arg.split('.').forEach(function (path) {
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
            methodName.split('.').forEach(function (path, pathIndex) {
              if (!method) method = component;
              if (method[path]) method = method[path];else {
                throw new Error('Component doesn\'t have method "' + methodName.split('.').slice(0, pathIndex + 1).join('.') + '"');
              }
            });
          } else {
            if (!component[methodName]) {
              throw new Error('Component doesn\'t have method "' + methodName + '"');
            }
            method = component[methodName];
          }
          method.apply(undefined, _toConsumableArray(customArgs));
        }
      });
    });
  });

  // Set styles scope ID
  var styleEl = void 0;
  if (options.style) {
    styleEl = _ssrWindow.document.createElement('style');
    styleEl.innerHTML = options.style;
  }
  if (options.styleScopeId) {
    el.setAttribute('data-scope', options.styleScopeId);
  }

  // Attach events
  function attachEvents() {
    if (options.on) {
      Object.keys(options.on).forEach(function (eventName) {
        $el.on(_utils2.default.eventNameToColonCase(eventName), options.on[eventName]);
      });
    }
    if (options.once) {
      Object.keys(options.once).forEach(function (eventName) {
        $el.once(_utils2.default.eventNameToColonCase(eventName), options.once[eventName]);
      });
    }
    events.forEach(function (event) {
      (0, _dom2.default)(event.el)[event.once ? 'once' : 'on'](event.name, event.handler);
    });
  }

  function detachEvents() {
    if (options.on) {
      Object.keys(options.on).forEach(function (eventName) {
        $el.off(_utils2.default.eventNameToColonCase(eventName), options.on[eventName]);
      });
    }
    if (options.once) {
      Object.keys(options.once).forEach(function (eventName) {
        $el.off(_utils2.default.eventNameToColonCase(eventName), options.once[eventName]);
      });
    }
    events.forEach(function (event) {
      (0, _dom2.default)(event.el).off(event.name, event.handler);
    });
  }

  attachEvents();

  // Created callback
  if (options.created) options.created();

  // Mount
  component.$mount = function mount(mountMethod) {
    if (options.beforeMount) options.beforeMount();
    if (styleEl) (0, _dom2.default)('head').append(styleEl);
    if (mountMethod) mountMethod(el);
    if (options.mounted) options.mounted();
  };

  // Destroy
  component.$destroy = function destroy() {
    if (options.beforeDestroy) options.beforeDestroy();
    if (styleEl) (0, _dom2.default)(styleEl).remove();
    detachEvents();
    if (options.destroyed) options.destroyed();
    // Delete component instance
    if (el && el.f7Component) {
      el.f7Component = null;
      delete el.f7Component;
    }
    _utils2.default.deleteProps(component);
    component = null;
  };

  // Store component instance
  for (var i = 0; i < tempDom.children.length; i += 1) {
    tempDom.children[i].f7Component = component;
  }

  return component;
};

var Component = {
  parse: function parse(componentString) {
    var callbackName = 'f7_component_callback_' + new Date().getTime();

    // Template
    var template = void 0;
    if (componentString.indexOf('<template>') >= 0) {
      template = componentString.split('<template>').filter(function (item, index) {
        return index > 0;
      }).join('<template>').split('</template>').filter(function (item, index, arr) {
        return index < arr.length - 1;
      }).join('</template>').replace(/{{#raw}}([ \n]*)<template/g, '{{#raw}}<template').replace(/\/template>([ \n]*){{\/raw}}/g, '/template>{{/raw}}').replace(/([ \n])<template/g, '$1{{#raw}}<template').replace(/\/template>([ \n])/g, '/template>{{/raw}}$1');
    }

    // Styles
    var style = void 0;
    var styleScopeId = _utils2.default.now();
    if (componentString.indexOf('<style>') >= 0) {
      style = componentString.split('<style>')[1].split('</style>')[0];
    } else if (componentString.indexOf('<style scoped>') >= 0) {
      style = componentString.split('<style scoped>')[1].split('</style>')[0];
      style = style.split('\n').map(function (line) {
        if (line.indexOf('{') >= 0) {
          if (line.indexOf('{{this}}') >= 0) {
            return line.replace('{{this}}', '[data-scope="' + styleScopeId + '"]');
          }
          return '[data-scope="' + styleScopeId + '"] ' + line.trim();
        }
        return line;
      }).join('\n');
    }

    var scriptContent = void 0;
    if (componentString.indexOf('<script>') >= 0) {
      var scripts = componentString.split('<script>');
      scriptContent = scripts[scripts.length - 1].split('</script>')[0].trim();
    } else {
      scriptContent = 'return {}';
    }
    scriptContent = 'window.' + callbackName + ' = function () {' + scriptContent + '}';

    // Insert Script El
    var scriptEl = _ssrWindow.document.createElement('script');
    scriptEl.innerHTML = scriptContent;
    (0, _dom2.default)('head').append(scriptEl);

    var component = _ssrWindow.window[callbackName]();

    // Remove Script El
    (0, _dom2.default)(scriptEl).remove();

    if (!component.template && !component.render) {
      component.template = template;
    }
    if (style) {
      component.style = style;
      component.styleScopeId = styleScopeId;
    }
    return component;
  },
  create: function create(c) {
    var extendContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return new Framework7Component(c, extendContext);
  }
};
exports.default = Component;