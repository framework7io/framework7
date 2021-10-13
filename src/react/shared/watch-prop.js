import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.js';

export const watchProp = (value, callback) => {
  const valueRef = useRef(value);

  useIsomorphicLayoutEffect(() => {
    if (value !== valueRef.current && callback) {
      callback(value, valueRef.current);
    }
    valueRef.current = value;
  }, [value]);
};
