import { f7, f7ready, theme } from './f7';

export const useTheme = (set) => {
  const t = f7 ? theme : null;
  if (!f7) {
    f7ready(() => {
      set(theme);
    });
  }
  return t;
};
