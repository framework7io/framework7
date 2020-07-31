import { useLayoutEffect, useRef } from 'react';

export const watchProp = (value, callback) => {
  const valueRef = useRef(value);

  useLayoutEffect(() => {
    if (value !== valueRef.current && callback) {
      callback(value, valueRef.current);
    }
    valueRef.current = value;
  }, [value]);
};
