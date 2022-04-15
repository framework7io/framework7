import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.js';
import { f7, f7ready } from './f7.js';
import { emit } from './utils.js';

export const useTab = (elRef, props) => {
  const onTabShow = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'tabShow', el);
  };
  const onTabHide = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'tabHide', el);
  };
  const attachEvents = () => {
    if (!elRef.current) return;
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

  useIsomorphicLayoutEffect(() => {
    attachEvents();
    return detachEvents;
  });
};
