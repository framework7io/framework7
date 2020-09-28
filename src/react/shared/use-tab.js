import { useEffect } from 'react';
import { f7, f7ready } from './f7';
import { emit } from './utils';

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

  useEffect(() => {
    attachEvents();
    return detachEvents;
  });
};
