import { onBeforeUnmount, ref } from 'vue';
import { f7 } from './f7.js';

export const useStore = (...args) => {
  // (store, getter)
  let store = args[0];
  let getter = args[1];
  if (args.length === 1) {
    // (getter)
    store = f7.store;
    getter = args[0];
  }
  // eslint-disable-next-line
  const obj = store._gettersPlain[getter];
  const valueRef = ref(obj.value);
  const callback = (v) => {
    valueRef.value = v;
  };
  obj.onUpdated(callback);
  onBeforeUnmount(() => {
    // eslint-disable-next-line
    store.__removeCallback(callback);
  });
  return valueRef;
};
