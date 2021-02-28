export function noUndefinedProps(obj) {
  const o = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') o[key] = obj[key];
  });
  return o;
}
export function isStringProp(val) {
  return typeof val === 'string' && val !== '';
}
export function isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
}
export function now() {
  return Date.now();
}
export function extend(...args) {
  let deep = true;
  let to;
  let from;
  if (typeof args[0] === 'boolean') {
    [deep, to] = args;
    args.splice(0, 2);
    from = args;
  } else {
    [to] = args;
    args.splice(0, 1);
    from = args;
  }
  for (let i = 0; i < from.length; i += 1) {
    const nextSource = args[i];
    if (nextSource !== undefined && nextSource !== null) {
      const keysArray = Object.keys(Object(nextSource));
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          if (!deep) {
            to[nextKey] = nextSource[nextKey];
          } else if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            extend(to[nextKey], nextSource[nextKey]);
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            extend(to[nextKey], nextSource[nextKey]);
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
export function flattenArray(...args) {
  const arr = [];
  args.forEach((arg) => {
    if (Array.isArray(arg)) arr.push(...flattenArray(...arg));
    else arr.push(arg);
  });
  return arr;
}
export function classNames(...args) {
  const classes = [];
  args.forEach((arg) => {
    if (typeof arg === 'object' && arg.constructor === Object) {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) classes.push(key);
      });
    } else if (arg) classes.push(arg);
  });
  const uniqueClasses = [];
  classes.forEach((c) => {
    if (uniqueClasses.indexOf(c) < 0) uniqueClasses.push(c);
  });
  return uniqueClasses.join(' ');
}
export function getSlots(props = {}) {
  const slots = {};
  if (!props) return slots;
  const children = props.children;

  if (!children || children.length === 0) {
    return slots;
  }

  function addChildToSlot(name, child) {
    if (!slots[name]) slots[name] = [];
    slots[name].push(child);
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (!child) return;
      const slotName = (child.props && child.props.slot) || 'default';
      addChildToSlot(slotName, child);
    });
  } else {
    let slotName = 'default';
    if (children.props && children.props.slot) slotName = children.props.slot;
    addChildToSlot(slotName, children);
  }

  return slots;
}

export function emit(props, events, ...args) {
  if (!events || !events.trim().length || typeof events !== 'string') return;

  events
    .trim()
    .split(' ')
    .forEach((event) => {
      let eventName = (event || '').trim();
      if (!eventName) return;
      eventName = eventName.charAt(0).toUpperCase() + eventName.slice(1);

      const propName = `on${eventName}`;

      if (props[propName]) props[propName](...args);
    });
}

export function getExtraAttrs(props = {}) {
  const extraAttrs = {};
  Object.keys(props).forEach((key) => {
    if (key.indexOf('data-') === 0 || key.indexOf('aria-') === 0 || key === 'role') {
      extraAttrs[key] = props[key];
    }
  });
  return extraAttrs;
}

let routerIdCounter = 0;
let routerComponentIdCounter = 0;

export function unsetRouterIds() {
  routerIdCounter = 0;
  routerComponentIdCounter = 0;
}

export function getRouterId() {
  routerIdCounter += 1;
  return `${now()}_${routerIdCounter}`;
}

export function getComponentId() {
  routerComponentIdCounter += 1;
  return `${now()}_${routerComponentIdCounter}`;
}
