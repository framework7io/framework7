/* eslint-disable no-underscore-dangle */
import { extend } from '../../shared/utils.js';

function createStore(storeParams = {}) {
  const store = {
    __store: true,
  };
  const originalState = { ...(storeParams.state || {}) };
  const actions = { ...(storeParams.actions || {}) };
  const getters = { ...(storeParams.getters || {}) };
  const state = extend({}, originalState);

  let propsQueue = [];
  const gettersDependencies = {};
  const gettersCallbacks = {};

  Object.keys(getters).forEach((getterKey) => {
    gettersDependencies[getterKey] = [];
    gettersCallbacks[getterKey] = [];
  });

  const getGetterValue = (getterKey) => {
    return getters[getterKey]({ state: store.state });
  };

  const addGetterDependencies = (getterKey, deps) => {
    if (!gettersDependencies[getterKey]) gettersDependencies[getterKey] = [];
    deps.forEach((dep) => {
      if (gettersDependencies[getterKey].indexOf(dep) < 0) {
        gettersDependencies[getterKey].push(dep);
      }
    });
  };

  const addGetterCallback = (getterKey, callback) => {
    if (!gettersCallbacks[getterKey]) gettersCallbacks[getterKey] = [];
    gettersCallbacks[getterKey].push(callback);
  };

  const runGetterCallbacks = (stateKey) => {
    const keys = Object.keys(gettersDependencies).filter((getterKey) => {
      return gettersDependencies[getterKey].indexOf(stateKey) >= 0;
    });
    keys.forEach((getterKey) => {
      if (!gettersCallbacks[getterKey] || !gettersCallbacks[getterKey].length) return;
      gettersCallbacks[getterKey].forEach((callback) => {
        callback(getGetterValue(getterKey));
      });
    });
  };

  const removeGetterCallback = (callback) => {
    Object.keys(gettersCallbacks).forEach((stateKey) => {
      const callbacks = gettersCallbacks[stateKey];

      if (callbacks.indexOf(callback) >= 0) {
        callbacks.splice(callbacks.indexOf(callback), 1);
      }
    });
  };

  // eslint-disable-next-line
  store.__removeCallback = (callback) => {
    removeGetterCallback(callback);
  };

  const getterValue = (getterKey, addCallback = true) => {
    if (getterKey === 'constructor') return undefined;
    propsQueue = [];
    const value = getGetterValue(getterKey);
    addGetterDependencies(getterKey, propsQueue);
    const onUpdated = (callback) => {
      addGetterCallback(getterKey, callback);
    };

    const obj = {
      value,
      onUpdated,
    };

    if (!addCallback) {
      return obj;
    }

    const callback = (v) => {
      obj.value = v;
    };

    obj.__callback = callback;
    addGetterCallback(getterKey, callback);
    // eslint-disable-next-line
    return obj;
  };

  store.state = new Proxy(state, {
    set: (target, prop, value) => {
      target[prop] = value;
      runGetterCallbacks(prop);
      return true;
    },
    get: (target, prop) => {
      propsQueue.push(prop);
      return target[prop];
    },
  });

  store.getters = new Proxy(getters, {
    set: () => false,
    get: (target, prop) => {
      if (!target[prop]) {
        return undefined;
      }
      return getterValue(prop, true);
    },
  });

  store._gettersPlain = new Proxy(getters, {
    set: () => false,
    get: (target, prop) => {
      if (!target[prop]) {
        return undefined;
      }
      return getterValue(prop, false);
    },
  });

  store.dispatch = (actionName, data) => {
    return new Promise((resolve, reject) => {
      if (!actions[actionName]) {
        reject();
        throw new Error(`Framework7: Store action "${actionName}" is not found`);
      }
      const result = actions[actionName]({ state: store.state, dispatch: store.dispatch }, data);
      resolve(result);
    });
  };

  return store;
}

export default createStore;
