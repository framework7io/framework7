import { useState, useEffect, useRef } from 'react';
import { f7 } from './f7.js';

export const useStore = (...args) => {
  const assignedGetters = useRef({});
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
  const [value, setValue] = useState(obj.value);
  function onUpdated(newValue) {
    setValue(newValue);
  }
  if (!assignedGetters.current[getter]) {
    obj.onUpdated(onUpdated);
    assignedGetters.current[getter] = true;
  }

  useEffect(() => {
    return () => {
      // eslint-disable-next-line
      store.__removeCallback(onUpdated);
    };
  }, []);
  return value;
};
