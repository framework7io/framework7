import { onMounted, onBeforeUnmount } from 'vue';
import { f7ready, f7 } from './f7.js';
import { extend } from './utils.js';

export const useSmartSelect = (props, setInstance, getEl) => {
  let f7SmartSelect;
  onMounted(() => {
    f7ready(() => {
      if (props.smartSelect) {
        const ssParams = extend({ el: getEl() }, props.smartSelectParams || {});
        f7SmartSelect = f7.smartSelect.create(ssParams);
        setInstance(f7SmartSelect);
      }
    });
  });
  onBeforeUnmount(() => {
    if (f7SmartSelect && f7SmartSelect.destroy) {
      f7SmartSelect.destroy();
    }
    f7SmartSelect = null;
    setInstance(f7SmartSelect);
  });
};
