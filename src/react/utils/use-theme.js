import { useState } from 'react';
import { f7, f7ready, theme } from './f7';

export const useTheme = () => {
  const [t, setTheme] = useState(f7 ? theme : null);
  if (!f7) {
    f7ready(() => {
      setTheme(theme);
    });
  }
  return t;
};
