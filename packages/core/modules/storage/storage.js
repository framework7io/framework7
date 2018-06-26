'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ssrWindow = require('ssr-window');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var keyPrefix = 'f7storage-';
var Storage = {
  get: function get(key) {
    return _utils2.default.promise(function (resolve, reject) {
      try {
        var value = JSON.parse(_ssrWindow.window.localStorage.getItem('' + keyPrefix + key));
        resolve(value);
      } catch (e) {
        reject(e);
      }
    });
  },
  set: function set(key, value) {
    return _utils2.default.promise(function (resolve, reject) {
      try {
        _ssrWindow.window.localStorage.setItem('' + keyPrefix + key, JSON.stringify(value));
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
  remove: function remove(key) {
    return _utils2.default.promise(function (resolve, reject) {
      try {
        _ssrWindow.window.localStorage.removeItem('' + keyPrefix + key);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
  clear: function clear() {},
  length: function length() {},
  keys: function keys() {
    return _utils2.default.promise(function (resolve, reject) {
      try {
        var keys = Object.keys(_ssrWindow.window.localStorage).filter(function (keyName) {
          return keyName.indexOf(keyPrefix) === 0;
        }).map(function (keyName) {
          return keyName.replace(keyPrefix, '');
        });
        resolve(keys);
      } catch (e) {
        reject(e);
      }
    });
  },
  forEach: function forEach(callback) {
    return _utils2.default.promise(function (resolve, reject) {
      try {
        Object.keys(_ssrWindow.window.localStorage).filter(function (keyName) {
          return keyName.indexOf(keyPrefix) === 0;
        }).forEach(function (keyName, index) {
          var key = keyName.replace(keyPrefix, '');
          Storage.get(key).then(function (value) {
            callback(key, value, index);
          });
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
};

exports.default = {
  name: 'storage',
  static: {
    Storage: Storage,
    storage: Storage
  }
};