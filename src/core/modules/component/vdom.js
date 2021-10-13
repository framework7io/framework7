/* eslint no-use-before-define: "off" */
/* eslint import/no-named-as-default: "off" */
import h from './snabbdom/h.js';
import customComponents from './custom-components.js';
import { isObject, eventNameToColonCase } from '../../shared/utils.js';

const SELF_CLOSING =
  'area base br col command embed hr img input keygen link menuitem meta param source track wbr'.split(
    ' ',
  );
const PROPS_ATTRS =
  'hidden checked disabled readonly selected autofocus autoplay required multiple value indeterminate routeProps innerHTML'.split(
    ' ',
  );
const BOOLEAN_PROPS =
  'hidden checked disabled readonly selected autofocus autoplay required multiple readOnly indeterminate'.split(
    ' ',
  );

const getTagName = (treeNode) => {
  return typeof treeNode.type === 'function'
    ? treeNode.type.name || 'CustomComponent'
    : treeNode.type;
};

const toCamelCase = (name) => {
  return name
    .split('-')
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word[0].toUpperCase() + word.substr(1);
    })
    .join('');
};
const propsFromAttrs = (...args) => {
  const context = {};
  args.forEach((obj = {}) => {
    Object.keys(obj).forEach((key) => {
      context[toCamelCase(key)] = obj[key];
    });
  });

  return context;
};

const createCustomComponent = ({ f7, treeNode, vnode, data }) => {
  const component =
    typeof treeNode.type === 'function' ? treeNode.type : customComponents[treeNode.type];
  f7.component
    .create(component, propsFromAttrs(data.attrs || {}, data.props || {}), {
      el: vnode.elm,
      children: treeNode.children,
    })
    .then((c) => {
      if (vnode.data && vnode.data.on && c && c.$el) {
        Object.keys(vnode.data.on).forEach((eventName) => {
          c.$el.on(eventName, vnode.data.on[eventName]);
        });
      }
      // eslint-disable-next-line
      vnode.elm.__component__ = c;
    });
};
const updateCustomComponent = (vnode) => {
  // eslint-disable-next-line
  const component = vnode && vnode.elm && vnode.elm.__component__;
  if (!component) return;
  const newProps = propsFromAttrs(vnode.data.attrs || {}, vnode.data.props || {});
  component.children = vnode.data.treeNode.children;
  Object.assign(component.props, newProps);
  component.update();
};
const destroyCustomComponent = (vnode) => {
  // eslint-disable-next-line
  const component = vnode && vnode.elm && vnode.elm.__component__;

  if (component) {
    const { el, $el } = component;
    if (vnode.data && vnode.data.on && $el) {
      Object.keys(vnode.data.on).forEach((eventName) => {
        $el.off(eventName, vnode.data.on[eventName]);
      });
    }
    if (component.destroy) component.destroy();
    if (el && el.parentNode) el.parentNode.removeChild(el);
    delete vnode.elm.__component__; // eslint-disable-line
  }
};

const isCustomComponent = (treeNodeType) => {
  return (
    typeof treeNodeType === 'function' ||
    (treeNodeType && treeNodeType.indexOf('-') > 0 && customComponents[treeNodeType])
  );
};

function getHooks(treeNode, data, f7, initial, isRoot) {
  const hooks = {};
  const insert = [];
  const destroy = [];
  const update = [];
  const postpatch = [];
  let isFakeElement = false;
  let tagName = getTagName(treeNode);
  if (data && data.attrs && data.attrs.component) {
    tagName = data.attrs.component;
    delete data.attrs.component;
    isFakeElement = true;
  }

  const isCustom = isCustomComponent(treeNode.type);

  if (isCustom) {
    insert.push((vnode) => {
      if (vnode.sel !== tagName && !isFakeElement) return;
      createCustomComponent({ f7, treeNode, vnode, data });
    });
    destroy.push((vnode) => {
      destroyCustomComponent(vnode);
    });
    update.push((oldVnode, vnode) => {
      updateCustomComponent(vnode);
    });
  }

  if (!isCustom) {
    if (!data || !data.attrs || !data.attrs.class) return hooks;

    const classNames = data.attrs.class;
    classNames.split(' ').forEach((className) => {
      if (!initial) {
        insert.push(...f7.getVnodeHooks('insert', className));
      }
      destroy.push(...f7.getVnodeHooks('destroy', className));
      update.push(...f7.getVnodeHooks('update', className));
      postpatch.push(...f7.getVnodeHooks('postpatch', className));
    });
  }

  if (isRoot && !initial) {
    postpatch.push((oldVnode, vnode) => {
      const vn = vnode || oldVnode;
      if (!vn) return;
      if (vn.data && vn.data.component) {
        vn.data.component.hook('onUpdated');
      }
    });
  }
  if (
    insert.length === 0 &&
    destroy.length === 0 &&
    update.length === 0 &&
    postpatch.length === 0
  ) {
    return hooks;
  }

  if (insert.length) {
    hooks.insert = (vnode) => {
      insert.forEach((f) => f(vnode));
    };
  }
  if (destroy.length) {
    hooks.destroy = (vnode) => {
      destroy.forEach((f) => f(vnode));
    };
  }
  if (update.length) {
    hooks.update = (oldVnode, vnode) => {
      update.forEach((f) => f(oldVnode, vnode));
    };
  }
  if (postpatch.length) {
    hooks.postpatch = (oldVnode, vnode) => {
      postpatch.forEach((f) => f(oldVnode, vnode));
    };
  }

  return hooks;
}
const getEventHandler = (eventHandler, { stop, prevent, once } = {}) => {
  let fired = false;

  function handler(...args) {
    const e = args[0];
    if (once && fired) return;
    if (stop) e.stopPropagation();
    if (prevent) e.preventDefault();
    fired = true;

    eventHandler(...args);
  }

  return handler;
};

const getData = (treeNode, component, f7, initial, isRoot) => {
  const data = { component, treeNode };
  const tagName = getTagName(treeNode);
  Object.keys(treeNode.props).forEach((attrName) => {
    const attrValue = treeNode.props[attrName];
    if (typeof attrValue === 'undefined') return;
    if (PROPS_ATTRS.indexOf(attrName) >= 0) {
      // Props
      if (!data.props) data.props = {};
      if (attrName === 'readonly') {
        // eslint-disable-next-line
        attrName = 'readOnly';
      }
      if (attrName === 'routeProps') {
        // eslint-disable-next-line
        attrName = 'f7RouteProps';
      }
      if (tagName === 'option' && attrName === 'value') {
        if (!data.attrs) data.attrs = {};
        data.attrs.value = attrValue;
      }
      if (BOOLEAN_PROPS.indexOf(attrName) >= 0) {
        // eslint-disable-next-line
        data.props[attrName] = attrValue === false ? false : true;
      } else {
        data.props[attrName] = attrValue;
      }
    } else if (attrName === 'key') {
      // Key
      data.key = attrValue;
    } else if (
      attrName.indexOf('@') === 0 ||
      (attrName.indexOf('on') === 0 && attrName.length > 2)
    ) {
      // Events
      if (!data.on) data.on = {};
      let eventName =
        attrName.indexOf('@') === 0 ? attrName.substr(1) : eventNameToColonCase(attrName.substr(2));
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
      data.on[eventName] = getEventHandler(attrValue, { stop, prevent, once });
    } else if (attrName === 'style') {
      // Style
      if (typeof attrValue !== 'string') {
        data.style = attrValue;
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

  const hooks = getHooks(treeNode, data, f7, initial, isRoot);

  hooks.prepatch = (oldVnode, vnode) => {
    if (!oldVnode || !vnode) return;
    if (oldVnode && oldVnode.data && oldVnode.data.props) {
      Object.keys(oldVnode.data.props).forEach((key) => {
        if (BOOLEAN_PROPS.indexOf(key) < 0) return;
        if (!vnode.data) vnode.data = {};
        if (!vnode.data.props) vnode.data.props = {};
        if (oldVnode.data.props[key] === true && !(key in vnode.data.props)) {
          vnode.data.props[key] = false;
        }
      });
    }
  };

  data.hook = hooks;

  return data;
};

const getChildren = (treeNode, component, f7, initial) => {
  if (treeNode && treeNode.type && SELF_CLOSING.indexOf(treeNode.type) >= 0) {
    return [];
  }
  const children = [];
  const nodes = treeNode.children;
  for (let i = 0; i < nodes.length; i += 1) {
    const childNode = nodes[i];
    const child = treeNodeToVNode(childNode, component, f7, initial, false);
    if (Array.isArray(child)) {
      children.push(...child);
    } else if (child) {
      children.push(child);
    }
  }
  return children;
};

const getSlots = (treeNode, component, f7, initial) => {
  const slotName = treeNode.props.name || 'default';
  const slotNodes = (component.children || []).filter((childTreeNode) => {
    let childSlotName = 'default';
    if (childTreeNode.props) {
      childSlotName = childTreeNode.props.slot || 'default';
    }
    return childSlotName === slotName;
  });
  if (slotNodes.length === 0) {
    return getChildren(treeNode, component, f7, initial);
  }
  return slotNodes.map((subTreeNode) => treeNodeToVNode(subTreeNode, component, f7, initial));
};

const isTreeNode = (treeNode) => {
  return isObject(treeNode) && 'props' in treeNode && 'type' in treeNode && 'children' in treeNode;
};

const treeNodeToVNode = (treeNode, component, f7, initial, isRoot) => {
  if (!isTreeNode(treeNode)) {
    return String(treeNode);
  }
  if (treeNode.type === 'slot') {
    return getSlots(treeNode, component, f7, initial);
  }
  const data = getData(treeNode, component, f7, initial, isRoot);
  const children = isCustomComponent(treeNode.type)
    ? []
    : getChildren(treeNode, component, f7, initial);

  return h(getTagName(treeNode), data, children);
};

export default function vdom(tree = {}, component, initial) {
  return treeNodeToVNode(tree, component, component.f7, initial, true);
}
