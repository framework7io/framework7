'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

var Utils = {
  noUndefinedProps: function noUndefinedProps(obj) {
    var o = {};
    Object.keys(obj).forEach(function (key) {
      if (typeof obj[key] !== 'undefined') o[key] = obj[key];
    });
    return o;
  },
  isTrueProp: function isTrueProp(val) {
    return val === true || val === '';
  },
  isStringProp: function isStringProp(val) {
    return typeof val === 'string' && val !== '';
  },
  isObject: function isObject(o) {
    return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && o !== null && o.constructor && o.constructor === Object;
  },
  now: function now() {
    return Date.now();
  },
  extend: function extend() {
    var deep = true;
    var to = void 0;
    var from = void 0;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (typeof args[0] === 'boolean') {
      deep = args[0];
      to = args[1];

      args.splice(0, 2);
      from = args;
    } else {
      to = args[0];

      args.splice(0, 1);
      from = args;
    }
    for (var i = 0; i < from.length; i += 1) {
      var nextSource = args[i];
      if (nextSource !== undefined && nextSource !== null) {
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
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
  flattenArray: function flattenArray() {
    var arr = [];

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args.forEach(function (arg) {
      if (Array.isArray(arg)) arr.push.apply(arr, _toConsumableArray(Utils.flattenArray.apply(Utils, _toConsumableArray(arg))));else arr.push(arg);
    });
    return arr;
  },
  classNames: function classNames() {
    var classes = [];

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    args.forEach(function (arg) {
      if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg.constructor === Object) {
        Object.keys(arg).forEach(function (key) {
          if (arg[key]) classes.push(key);
        });
      } else if (arg) classes.push(arg);
    });
    return classes.join(' ');
  }
};
exports.default = Utils;