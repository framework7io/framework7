import { onMounted, onBeforeUnmount } from 'vue';
import { f7, f7ready } from './f7';

export const useTab = (elRef, props, emit) => {
  const onTabShow = (el) => {
    if (elRef.value !== el) return;
    emit(props, 'tabShow', el);
  };
  const onTabHide = (el) => {
    if (elRef.value !== el) return;
    emit(props, 'tabHide', el);
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
