/* eslint-disable import/no-mutable-exports */
// eslint-disable-next-line
import { extend, unsetRouterIds } from './utils.js';

let f7;
const theme = {};

/* eslint-disable no-restricted-globals */
const app =
  typeof window !== 'undefined' && window.Framework7ComponentsApp
    ? window.Framework7ComponentsApp
    : {
        Framework7: undefined,
        f7: undefined,
        f7events: undefined,
        theme: {},
        f7routers: {
          views: [],
          tabs: [],
          modals: null,
        },
      };
if (typeof window !== 'undefined') {
  window.Framework7ComponentsApp = app;
}
/* eslint-enable no-restricted-globals */

app.setInstance = (instance) => {
  f7 = instance;
};

const setTheme = () => {
  if (!app.f7) return;
  app.theme.ios = app.f7.theme === 'ios';
  theme.ios = app.f7.theme === 'ios';
  app.theme.md = app.f7.theme === 'md';
  theme.md = app.f7.theme === 'md';
};

const cleanup = () => {
  unsetRouterIds();
  delete app.theme.ios;
  delete theme.ios;
  delete app.theme.md;
  delete theme.md;
  app.f7routers.views = [];
  app.f7routers.tabs = [];
  app.f7routers.modals = null;
};

const f7initEvents = () => {
  app.f7events = new app.Framework7.Events();
};

const f7init = (rootEl, params = {}, init = true) => {
  const f7Params = extend({}, params, {
    el: rootEl,
    init,
  });
  if (typeof params.store !== 'undefined') f7Params.store = params.store;
  if (!f7Params.routes) f7Params.routes = [];

  if (f7Params.userAgent && (f7Params.theme === 'auto' || !f7Params.theme)) {
    const device = app.Framework7.getDevice({ userAgent: f7Params.userAgent }, true);
    app.theme.ios = !!device.ios;
    app.theme.md = !app.theme.ios;
  }
  // eslint-disable-next-line
  if (app.f7 && typeof window !== 'undefined') return;

  // eslint-disable-next-line
  if (typeof window === 'undefined') cleanup();

  const instance = new app.Framework7(f7Params);
  app.f7 = instance;
  f7 = instance;
  app.setInstance(instance);
  setTheme();

  if (instance.initialized) {
    app.f7 = instance;
    f7 = instance;
    app.setInstance(instance);
    app.f7events.emit('ready', app.f7);
  } else {
    instance.on('init', () => {
      app.f7 = instance;
      f7 = instance;
      app.setInstance(instance);
      app.f7events.emit('ready', app.f7);
    });
  }
};

const f7ready = (callback) => {
  if (!callback) return;
  if (app.f7 && app.f7.initialized) callback(app.f7);
  else {
    app.f7events.once('ready', callback);
  }
};

export { f7, theme, app, f7ready, f7init, f7initEvents, setTheme };
