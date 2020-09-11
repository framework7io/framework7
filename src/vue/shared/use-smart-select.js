import { onMounted, onBeforeUnmount } from 'vue';
import { f7ready, f7 } from './f7';
import { extend } from './utils';

export const useSmartSelect = (props, f7SmartSelect, getEl) => {
  onMounted(() => {
    f7ready(() => {
      if (props.smartSelect) {
        const ssParams = extend({ el: getEl() }, props.smartSelectParams || {});
        f7SmartSelect.value = f7.smartSelect.create(ssParams);
      }
    });
  });
  onBeforeUnmount(() => {
    if (f7SmartSelect.value && f7SmartSelect.value.destroy) {
      f7SmartSelect.value.destroy();
    }
    f7SmartSelect.value = null;
  });
};
