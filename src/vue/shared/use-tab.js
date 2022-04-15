import { onMounted, onBeforeUnmount } from 'vue';
import { f7, f7ready } from './f7.js';

export const useTab = (elRef, emit) => {
  const onTabShow = (el) => {
    if (elRef.value !== el) return;
    emit('tab:show', el);
  };
  const onTabHide = (el) => {
    if (elRef.value !== el) return;
    emit('tab:hide', el);
  };
  onMounted(() => {
    if (!elRef.value) return;
    f7ready(() => {
      f7.on('tabShow', onTabShow);
      f7.on('tabHide', onTabHide);
    });
  });
  onBeforeUnmount(() => {
    if (!f7) return;
    f7.off('tabShow', onTabShow);
    f7.off('tabHide', onTabHide);
  });
};
