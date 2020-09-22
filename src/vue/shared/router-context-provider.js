import { provide } from 'vue';

export const RouterContextProvider = {
  name: 'f7-router-context-provider',
  props: {
    f7route: Object,
    f7router: Object,
  },
  setup({ f7route, f7router }, { slots }) {
    provide('f7router', f7router);
    provide('f7route', f7route);
    return () => slots.default();
  },
};
