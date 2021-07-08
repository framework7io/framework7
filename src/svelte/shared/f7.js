/* eslint-disable import/no-mutable-exports */
// eslint-disable-next-line
import Framework7 from 'framework7/lite';
import { extend, unsetRouterIds } from './utils';

let f7;
const theme = {};

// eslint-disable-next-line
if (!Framework7.__app__) {
  // eslint-disable-next-line
  Framework7.__app__ = {
    f7: undefined,
    f7events: undefined,
    theme: {},
    f7routers: {
      views: [],
      tabs: [],
      modals: null,
    },
  };
}

const { __app__: app } = Framework7;

app.setInstance = (instance) => {
  f7 = instance;
};

const setTheme = () => {
  if (!app.f7) return;
  app.theme.ios = app.f7.theme === 'ios';
  theme.ios = app.f7.theme === 'ios';
  app.theme.md = app.f7.theme === 'md';
  theme.md = app.f7.theme === 'md';
  app.theme.aurora = app.f7.theme === 'aurora';
  theme.aurora = app.f7.theme === 'aurora';
};

const cleanup = () => {
  unsetRouterIds();
  delete app.theme.ios;
  delete theme.ios;
  delete app.theme.md;
  delete theme.md;
  delete app.theme.aurora;
  delete theme.aurora;
  app.f7routers.views = [];
  app.f7routers.tabs = [];
  app.f7routers.modals = null;
};

const f7initEvents = () => {
  app.f7events = new Framework7.Events();
};

const f7init = (rootEl, params = {}, init = true) => {
  const f7Params = extend({}, params, {
    el: rootEl,
    init,
  });
  if (typeof params.store !== 'undefined') f7Params.store = params.store;
  if (!f7Params.routes) f7Params.routes = [];

  if (f7Params.userAgent && (f7Params.theme === 'auto' || !f7Params.theme)) {
    const device = Framework7.getDevice({ userAgent: f7Params.userAgent }, true);
    app.theme.ios = !!device.ios;
    app.theme.aurora = device.desktop && device.electron;
    app.theme.md = !app.theme.ios && !app.theme.aurora;
  }
  // eslint-disable-next-line
  if (app.f7 && typeof window !== 'undefined') return;

  // eslint-disable-next-line
  if (typeof window === 'undefined') cleanup();

  const instance = new Framework7(f7Params);
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
