import { window } from 'ssr-window';

const keyPrefix = 'f7storage-';
const Storage = {
  get(key) {
    return new Promise((resolve, reject) => {
      try {
        const value = JSON.parse(window.localStorage.getItem(`${keyPrefix}${key}`));
        resolve(value);
      } catch (e) {
        reject(e);
      }
    });
  },
  set(key, value) {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.setItem(`${keyPrefix}${key}`, JSON.stringify(value));
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
  remove(key) {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.removeItem(`${keyPrefix}${key}`);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
  clear() {

  },
  length() {

  },
  keys() {
    return new Promise((resolve, reject) => {
      try {
        const keys = Object.keys(window.localStorage)
          .filter(keyName => keyName.indexOf(keyPrefix) === 0)
          .map(keyName => keyName.replace(keyPrefix, ''));
        resolve(keys);
      } catch (e) {
        reject(e);
      }
    });
  },
  forEach(callback) {
    return new Promise((resolve, reject) => {
      try {
        Object.keys(window.localStorage)
          .filter(keyName => keyName.indexOf(keyPrefix) === 0)
          .forEach((keyName, index) => {
            const key = keyName.replace(keyPrefix, '');
            Storage.get(key).then((value) => {
              callback(key, value, index);
            });
          });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default {
  name: 'storage',
  static: {
    Storage,
    storage: Storage,
  },
};
