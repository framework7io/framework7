/* eslint no-use-before-define: "off" */
/* eslint import/no-named-as-default: "off" */
import { window, document } from 'ssr-window';
import h from './snabbdom/h';

const selfClosing = 'area base br col command embed hr img input keygen link menuitem meta param source track wbr'.split(' ');
const propsAttrs = 'hidden value checked disabled readonly selected'.split(' ');
const tempDom = document.createElement('div');

function getHooks(data, app, initial, isRoot) {
  if (!data || !data.attrs || !data.attrs.class) return null;
  const classNames = data.attrs.class;
  const hooks = {};
  const insert = [];
  const destroy = [];
  const update = [];
  const postpatch = [];
  classNames.split(' ').forEach((className) => {
    if (!initial) {
      insert.push(...app.getVnodeHooks('insert', className));
    }
    destroy.push(...app.getVnodeHooks('destroy', className));
    update.push(...app.getVnodeHooks('update', className));
    postpatch.push(...app.getVnodeHooks('postpatch', className));
  });

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
    return null;
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
      update.forEach(f => f(vnode));
    };
  }
  if (postpatch.length) {
    hooks.postpatch = (oldVnode, vnode) => {
      postpatch.forEach(f => f(vnode));
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
      handlerString.split('(')[1].split(')')[0].split(',').forEach((argument) => {
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

function getData(el, context, app, initial, isRoot) {
  const data = {
    context,
  };
  const attributes = el.attributes;
  Array.prototype.forEach.call(attributes, (attr) => {
    const attrName = attr.name;
    const attrValue = attr.value;
    if (propsAttrs.indexOf(attrName) >= 0) {
      if (!data.props) data.props = {};
      data.props[attrName] = attrValue;
    } else if (attrName === 'key') {
      data.key = attrName;
    } else if (attrName.indexOf('@') === 0) {
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
    } else {
      if (!data.attrs) data.attrs = {};
      data.attrs[attrName] = attrValue;

      if (attrName === 'id' && !data.key) {
        data.key = attrValue;
      }
    }
  });
  const hooks = getHooks(data, app, initial, isRoot);
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
    if (child) {
      children.push(child);
    }
  }
  return children;
}

function elementToVNode(el, context, app, initial, isRoot) {
  if (el.nodeType === 1) {
    // element
    const tagName = el.nodeName.toLowerCase();
    return h(
      tagName,
      getData(el, context, app, initial, isRoot),
      selfClosing.indexOf(tagName) >= 0 ? [] : getChildren(el, context, app, initial)
    );
  }
  if (el.nodeType === 3) {
    // text
    return el.textContent;
  }
  return null;
}

export default function (html = '', context, app, initial) {
  // Save to temp dom
  tempDom.innerHTML = html.trim();

  // Parse DOM
  const rootEl = tempDom.childNodes[0];
  const result = elementToVNode(rootEl, context, app, initial, true);

  // Clean
  tempDom.innerHTML = '';

  return result;
}
