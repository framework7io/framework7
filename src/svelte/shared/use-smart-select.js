// eslint-disable-next-line
import { onMount, onDestroy } from 'svelte';
import { f7ready, app } from './f7.js';
import { extend } from './utils.js';

export const useSmartSelect = (props, setInstance, getEl) => {
  let f7SmartSelect;
  onMount(() => {
    f7ready(() => {
      if (props.smartSelect) {
        const ssParams = extend({ el: getEl() }, props.smartSelectParams || {});
        f7SmartSelect = app.f7.smartSelect.create(ssParams);
        setInstance(f7SmartSelect);
      }
    });
  });
  onDestroy(() => {
    if (f7SmartSelect && f7SmartSelect.destroy) {
      f7SmartSelect.destroy();
    }
    f7SmartSelect = null;
    setInstance(f7SmartSelect);
  });
};
