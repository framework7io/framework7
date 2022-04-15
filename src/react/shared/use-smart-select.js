import { useEffect } from 'react';
import { f7ready, f7 } from './f7.js';
import { extend } from './utils.js';

export const useSmartSelect = (smartSelect, smartSelectParams, f7SmartSelect, getEl) => {
  const onMount = () => {
    f7ready(() => {
      if (smartSelect) {
        const ssParams = extend({ el: getEl() }, smartSelectParams || {});
        f7SmartSelect.current = f7.smartSelect.create(ssParams);
      }
    });
  };
  const onDestroy = () => {
    if (f7SmartSelect.current && f7SmartSelect.current.destroy) {
      f7SmartSelect.current.destroy();
    }
    f7SmartSelect.current = null;
  };
  useEffect(() => {
    onMount();
    return onDestroy;
  }, []);
};
