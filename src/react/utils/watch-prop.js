import { useEffect, useRef } from 'react';

export const watchProp = (value, callback) => {
  const valueRef = useRef(value);

  useEffect(() => {
    if (value !== valueRef.current && callback) {
      callback(value, valueRef.current);
    }
    valueRef.current = value;
  }, [value]);
};
