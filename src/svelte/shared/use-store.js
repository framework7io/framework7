// eslint-disable-next-line
import { onDestroy } from 'svelte';
import { f7 } from './f7.js';

export const useStore = (...args) => {
  // (store, getter, callback)
  let store = args[0];
  let getter = args[1];
  let callback = args[2];
  if (args.length === 1) {
    // (getter)
    store = f7.store;
    getter = args[0];
  } else if (args.length === 2 && typeof args[0] === 'string') {
    // (getter, callback)
    store = f7.store;
    getter = args[0];
    callback = args[1];
  }
  // eslint-disable-next-line
  const obj = store._gettersPlain[getter];
  const value = obj.value;
  if (callback) {
    obj.onUpdated(callback);
  }

  onDestroy(() => {
    if (callback) {
      // eslint-disable-next-line
      store.__removeCallback(callback);
    }
  });
  return value;
};
