import { extend } from '../../shared/utils';

function createStore(storeParams = {}) {
  const store = {
    __store: true,
  };
  const originalState = { ...(storeParams.state || {}) };
  const actions = { ...(storeParams.actions || {}) };
  const getters = { ...(storeParams.getters || {}) };
  const state = extend({}, originalState);

  let propsQueue = [];
  const propsCallbacks = {};

  const addPropCallback = (onUpdated) => {
    propsQueue.forEach((prop) => {
      if (!propsCallbacks[prop]) propsCallbacks[prop] = [];
      propsCallbacks[prop].push(onUpdated);
    });
  };

  const runPropCallback = (prop, value) => {
    if (!propsCallbacks[prop] || !propsCallbacks[prop].length) return;
    propsCallbacks[prop].forEach((callback) => {
      callback(value);
    });
  };

  const removePropCallback = (callback) => {
    Object.keys(propsCallbacks).forEach((key) => {
      const callbacks = propsCallbacks[key];
      if (callbacks.indexOf(callback) >= 0) {
        callbacks.splice(callbacks.indexOf(callback), 1);
      }
    });
  };

  // eslint-disable-next-line
  store.__removeWatcher = (callback) => {
    removePropCallback(callback);
  };

  store.state = new Proxy(state, {
    set: (target, prop, value) => {
      target[prop] = value;
      runPropCallback(prop, value);
      return true;
    },
    get: (target, prop) => {
      propsQueue.push(prop);
      return target[prop];
    },
  });

  store.get = (key, onUpdated) => {
    propsQueue = [];
    const value = getters[key]({ state: store.state });
    if (onUpdated) addPropCallback(onUpdated);
    return value;
  };

  store.action = (actionName, data) => {
    return new Promise((resolve, reject) => {
      if (!actions[actionName]) {
        reject();
        throw new Error(`Framework7: Store action "${actionName}" is not found`);
      }
      const result = actions[actionName](
        { state: store.state, action: store.action, get: store.get },
        data,
      );
      resolve(result);
    });
  };

  return store;
}

export default createStore;
