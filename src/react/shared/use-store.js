import { useState } from 'react';
import { f7 } from './f7';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

export const useStore = (...args) => {
  // (store, getter)
  let store = args[0];
  let getter = args[1];
  if (args.length === 1) {
    // (getter)
    store = f7.store;
    getter = args[0];
  }
  const obj = store.getters[getter];
  const [value, setValue] = useState(obj.value);
  obj.onUpdated(setValue);
  useIsomorphicLayoutEffect(() => {
    return () => {
      // eslint-disable-next-line
      store.__removeCallback(setValue);
      // eslint-disable-next-line
      store.__removeCallback(obj.__callback);
    };
  });
  return value;
};
