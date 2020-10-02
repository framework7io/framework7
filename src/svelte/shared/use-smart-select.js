// eslint-disable-next-line
import { onMount, onDestroy } from 'svelte';
import { f7ready, f7 } from './f7';
import { extend } from './utils';

export const useSmartSelect = (props, setInstance, getEl) => {
  let f7SmartSelect;
  onMount(() => {
    f7ready(() => {
      if (props.smartSelect) {
        const ssParams = extend({ el: getEl() }, props.smartSelectParams || {});
        f7SmartSelect = f7.smartSelect.create(ssParams);
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
