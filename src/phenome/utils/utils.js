const Utils = {
  text(text) {
    if (typeof text === 'undefined' || text === null) return '';
    return text;
  },
  noUndefinedProps(obj) {
    const o = {};
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] !== 'undefined') o[key] = obj[key];
    });
    return o;
  },
  isTrueProp(val) {
    return val === true || val === '';
  },
  isStringProp(val) {
    return typeof val === 'string' && val !== '';
  },
  isObject(o) {
    return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
  },
  now() {
    return Date.now();
  },
  extend(...args) {
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
            } else if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
              to[nextKey] = {};
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  },
  flattenArray(...args) {
    const arr = [];
    args.forEach((arg) => {
      if (Array.isArray(arg)) arr.push(...Utils.flattenArray(...arg));
      else arr.push(arg);
    });
    return arr;
  },
  classNames(...args) {
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
  },
  bindMethods(context, methods = []) {
    for (let i = 0; i < methods.length; i += 1) {
      if (context[methods[i]]) context[methods[i]] = context[methods[i]].bind(context);
    }
  },
};
export default Utils;
