import { ref } from 'vue';
import { f7, f7ready, theme } from './f7.js';

export const useTheme = () => {
  const t = ref(f7 ? theme : null);
  if (!f7) {
    f7ready(() => {
      t.value = theme;
    });
  }
  return t;
};
