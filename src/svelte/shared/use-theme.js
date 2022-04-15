import { f7ready, app } from './f7.js';

export const useTheme = (set) => {
  const t = app.f7 ? app.theme : null;
  if (!app.f7) {
    f7ready(() => {
      set(app.theme);
    });
  }
  return t;
};
