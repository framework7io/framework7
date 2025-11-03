// eslint-disable-next-line
import { onMount, onDestroy } from 'svelte';
import { f7, f7ready } from './f7.js';

export const useTab = (getEl, restProps = {}) => {
  const onTabShow = (el) => {
    if (getEl() !== el) return;
    restProps.onTabShow?.(el);
  };
  const onTabHide = (el) => {
    if (getEl() !== el) return;
    restProps.onTabHide?.(el);
  };
  const attachEvents = () => {
    if (!getEl()) return;
    f7ready(() => {
      f7.on('tabShow', onTabShow);
      f7.on('tabHide', onTabHide);
    });
  };
  const detachEvents = () => {
    if (!f7) return;
    f7.off('tabShow', onTabShow);
    f7.off('tabHide', onTabHide);
  };

  onMount(() => {
    attachEvents();
  });
  onDestroy(() => {
    detachEvents();
  });
};
