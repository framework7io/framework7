/* eslint no-use-before-define: "off" */
/* eslint import/no-named-as-default: "off" */
import { window, document } from 'ssr-window';
import h from './snabbdom/h';
import customComponents from './custom-components';

const selfClosing = 'area base br col command embed hr img input keygen link menuitem meta param source track wbr'.split(' ');
const propsAttrs = 'hidden checked disabled readonly selected autocomplete autofocus autoplay required multiple value indeterminate'.split(' ');
const booleanProps = 'hidden checked disabled readonly selected autocomplete autofocus autoplay required multiple readOnly indeterminate'.split(' ');
const tempDom = document.createElement('div');

function toCamelCase(name) {
  return name
    .split('-')
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word[0].toUpperCase() + word.substr(1);
    })
    .join('');
}
function contextFromAttrs(...args) {
  const context = {};
  args.forEach((obj = {}) => {
    Object.keys(obj).forEach((key) => {
      context[toCamelCase(key)] = obj[key];
    });
  });

  return context;
}

function createCustomComponent({ app, vnode, tagName, data }) {
  app.component.create(
    Object.assign({ el: vnode.elm }, customComponents[tagName]),
    {
      $props: contextFromAttrs(data.attrs || {}, data.props || {}),
    },
    vnode.children,
  ).then((c) => {
    if (vnode.data && vnode.data.on && c && c.$el) {
      Object.keys(vnode.data.on).forEach((eventName) => {
        c.$el.on(eventName, vnode.data.on[eventName]);
      });
    }
    // eslint-disable-next-line
    vnode.elm.__component__ = c;
  });
}
function updateCustomComponent(vnode) {
  // eslint-disable-next-line
  const component = vnode && vnode.elm && vnode.elm.__component__;
  if (!component) return;
  const newProps = contextFromAttrs(vnode.data.attrs || {}, vnode.data.props || {});
  component.$children = vnode.children;
  Object.assign(component.$props, newProps);
  component.$update();
}
function destroyCustomComponent(vnode) {
  // eslint-disable-next-line
  const component = vnode && vnode.elm && vnode.elm.__component__;

  if (component) {
    const { el, $el } = component;
    if (vnode.data && vnode.data.on && $el) {
      Object.keys(vnode.data.on).forEach((eventName) => {
        $el.off(eventName, vnode.data.on[eventName]);
      });
    }
    if (component.$destroy) component.$destroy();
    if (el && el.parentNode) el.parentNode.removeChild(el);
    delete vnode.elm.__component__; // eslint-disable-line
  }
}

function getHooks(data, app, initial, isRoot, tagName) {
  const hooks = {};
  const insert = [];
  const destroy = [];
  const update = [];
  const postpatch = [];
  const isCustomComponent = tagName && tagName.indexOf('-') > 0 && customComponents[tagName];

  if (isCustomComponent) {
    insert.push((vnode) => {
      if (vnode.sel !== tagName) return;
      createCustomComponent({ app, vnode, tagName, data });
    });
    destroy.push((vnode) => {
      destroyCustomComponent(vnode);
    });
    update.push((oldVnode, vnode) => {
      updateCustomComponent(vnode);
    });
  }

  if (!isCustomComponent) {
    if (!data || !data.attrs || !data.attrs.class) return hooks;

    const classNames = data.attrs.class;
    classNames.split(' ').forEach((className) => {
      if (!initial) {
        insert.push(...app.getVnodeHooks('insert', className));
      }
      destroy.push(...app.getVnodeHooks('destroy', className));
      update.push(...app.getVnodeHooks('update', className));
      postpatch.push(...app.getVnodeHooks('postpatch', className));
    });
  }

  if (isRoot && !initial) {
    postpatch.push((oldVnode, vnode) => {
      const vn = vnode || oldVnode;
      if (!vn) return;
      if (vn.data && vn.data.context && vn.data.context.$options.updated) {
        vn.data.context.$options.updated();
      }
    });
  }
  if (insert.length === 0 && destroy.length === 0 && update.length === 0 && postpatch.length === 0) {
    return hooks;
  }

  if (insert.length) {
    hooks.insert = (vnode) => {
      insert.forEach(f => f(vnode));
    };
  }
  if (destroy.length) {
    hooks.destroy = (vnode) => {
      destroy.forEach(f => f(vnode));
    };
  }
  if (update.length) {
    hooks.update = (oldVnode, vnode) => {
      update.forEach(f => f(oldVnode, vnode));
    };
  }
  if (postpatch.length) {
    hooks.postpatch = (oldVnode, vnode) => {
      postpatch.forEach(f => f(oldVnode, vnode));
    };
  }

  return hooks;
}
function getEventHandler(handlerString, context, { stop, prevent, once } = {}) {
  let fired = false;
  let methodName;
  let method;
  let customArgs = [];
  let needMethodBind = true;

  if (handlerString.indexOf('(') < 0) {
    methodName = handlerString;
  } else {
    methodName = handlerString.split('(')[0];
  }
  if (methodName.indexOf('.') >= 0) {
    methodName.split('.').forEach((path, pathIndex) => {
      if (pathIndex === 0 && path === 'this') return;
      if (pathIndex === 0 && path === 'window') {
        // eslint-disable-next-line
        method = window;
        needMethodBind = false;
        return;
      }
      if (!method) method = context;
      if (method[path]) method = method[path];
      else {
        throw new Error(`Framework7: Component doesn't have method "${methodName.split('.').slice(0, pathIndex + 1).join('.')}"`);
      }
    });
  } else {
    if (!context[methodName]) {
      throw new Error(`Framework7: Component doesn't have method "${methodName}"`);
    }
    method = context[methodName];
  }
  if (needMethodBind) {
    method = method.bind(context);
  }

  function handler(...args) {
    const e = args[0];
    if (once && fired) return;
    if (stop) e.stopPropagation();
    if (prevent) e.preventDefault();
    fired = true;

    if (handlerString.indexOf('(') < 0) {
      customArgs = args;
    } else {
      const handlerArguments = handlerString
        .split('(')[1]
        .split(')')[0]
        .replace(/'[^']*'|"[^"]*"/g, a => a.replace(/,/g, '<_comma_>'))
        .split(',')
        .map(a => a.replace(/<_comma_>/g, ','));
      handlerArguments.forEach((argument) => {
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

    method(...customArgs);
  }

  return handler;
}

function getData(el, context, app, initial, isRoot, tagName) {
  const data = { context };
  const attributes = el.attributes;
  Array.prototype.forEach.call(attributes, (attr) => {
    let attrName = attr.name;
    const attrValue = attr.value;
    if (propsAttrs.indexOf(attrName) >= 0) {
      // Props
      if (!data.props) data.props = {};
      if (attrName === 'readonly') {
        attrName = 'readOnly';
      }
      if (booleanProps.indexOf(attrName) >= 0) {
        // eslint-disable-next-line
        data.props[attrName] = attrValue === false ? false : true;
      } else {
        data.props[attrName] = attrValue;
      }
    } else if (attrName === 'key') {
      // Key
      data.key = attrValue;
    } else if (attrName.indexOf('@') === 0) {
      // Events
      if (!data.on) data.on = {};
      let eventName = attrName.substr(1);
      let stop = false;
      let prevent = false;
      let once = false;
      if (eventName.indexOf('.') >= 0) {
        eventName.split('.').forEach((eventNamePart, eventNameIndex) => {
          if (eventNameIndex === 0) eventName = eventNamePart;
          else {
            if (eventNamePart === 'stop') stop = true;
            if (eventNamePart === 'prevent') prevent = true;
            if (eventNamePart === 'once') once = true;
          }
        });
      }
      data.on[eventName] = getEventHandler(attrValue, context, { stop, prevent, once });
    } else if (attrName === 'style') {
      // Style
      if (attrValue.indexOf('{') >= 0 && attrValue.indexOf('}') >= 0) {
        try {
          data.style = JSON.parse(attrValue);
        } catch (e) {
          if (!data.attrs) data.attrs = {};
          data.attrs.style = attrValue;
        }
      } else {
        if (!data.attrs) data.attrs = {};
        data.attrs.style = attrValue;
      }
    } else {
      // Rest of attribures
      if (!data.attrs) data.attrs = {};
      data.attrs[attrName] = attrValue;

      // ID -> Key
      if (attrName === 'id' && !data.key && !isRoot) {
        data.key = attrValue;
      }
    }
  });
  const hooks = getHooks(data, app, initial, isRoot, tagName);
  hooks.prepatch = (oldVnode, vnode) => {
    if (!oldVnode || !vnode) return;
    if (oldVnode && oldVnode.data && oldVnode.data.props) {
      Object.keys(oldVnode.data.props).forEach((key) => {
        if (booleanProps.indexOf(key) < 0) return;
        if (!vnode.data) vnode.data = {};
        if (!vnode.data.props) vnode.data.props = {};
        if (oldVnode.data.props[key] === true && !(key in vnode.data.props)) {
          vnode.data.props[key] = false;
        }
      });
    }
  };
  if (hooks) {
    data.hook = hooks;
  }
  return data;
}

function getChildren(el, context, app, initial) {
  const children = [];
  const nodes = el.childNodes;
  for (let i = 0; i < nodes.length; i += 1) {
    const childNode = nodes[i];
    const child = elementToVNode(childNode, context, app, initial);
    if (Array.isArray(child)) {
      children.push(...child);
    } else if (child) {
      children.push(child);
    }
  }
  return children;
}

function getSlots(slotEl, context, app, initial) {
  const slotName = slotEl.getAttribute('name') || 'default';
  const slots = (context.$children || [])
    .filter((childEl) => {
      let childSlotName = 'default';
      if (childEl.data) {
        childSlotName = (childEl.data.attrs && childEl.data.attrs.slot) || 'default';
      }
      return childSlotName === slotName;
    });
  if (slots.length === 0) {
    return getChildren(slotEl, context, app, initial);
  }
  return slots;
}

function elementToVNode(el, context, app, initial, isRoot) {
  if (el.nodeType === 3) {
    // text
    return el.textContent;
  }
  if (el.nodeType !== 1) return null;
  // element (statement adds inline SVG compatibility)
  const tagName = (el instanceof window.SVGElement) ? el.nodeName : el.nodeName.toLowerCase();
  if (tagName === 'slot') {
    return getSlots(el, context, app, initial);
  }
  return h(
    tagName,
    getData(el, context, app, initial, isRoot, tagName),
    selfClosing.indexOf(tagName) >= 0 ? [] : getChildren(el, context, app, initial)
  );
}

export default function (html = '', context, initial) {
  // Save to temp dom
  tempDom.innerHTML = html.trim();

  // Parse DOM
  let rootEl;
  for (let i = 0; i < tempDom.childNodes.length; i += 1) {
    if (!rootEl && tempDom.childNodes[i].nodeType === 1) {
      rootEl = tempDom.childNodes[i];
    }
  }
  const result = elementToVNode(rootEl, context, context.$app, initial, true);

  // Clean
  tempDom.innerHTML = '';

  return result;
}
