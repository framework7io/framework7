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

export function createEmitter(createEventDispatcher, props) {
  const dispatch = createEventDispatcher();
  const emit = (events, argsArray) => {
    if (!events || !events.trim().length || typeof events !== 'string') return;

    events
      .trim()
      .split(' ')
      .forEach((event) => {
        const eventName = (event || '').trim();
        if (!eventName) return;
        const propName = `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;
        dispatch(eventName, argsArray);

        if (typeof props[propName] === 'function') {
          if (!Array.isArray(argsArray)) props[propName](...[argsArray]);
          else props[propName](...(argsArray || []));
        }
      });
  };
  return emit;
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

export function plainText(text) {
  if (typeof text === 'undefined' || text === null) return '';
  return text;
}
