/* eslint-disable import/no-mutable-exports */
import Framework7 from 'framework7/lite';
import { extend, unsetRouterIds } from './utils.js';

let f7;
let f7events;

const theme = {};

const f7routers = {
  views: [],
  tabs: [],
  modals: null,
};

const setTheme = () => {
  if (!f7) return;
  theme.ios = f7.theme === 'ios';
  theme.md = f7.theme === 'md';
};

const cleanup = () => {
  unsetRouterIds();
  delete theme.ios;
  delete theme.md;
  f7routers.views = [];
  f7routers.tabs = [];
  f7routers.modals = null;
};

const f7initEvents = () => {
  f7events = new Framework7.Events();
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
    theme.ios = !!device.ios;
    theme.md = !theme.ios;
  }
  // eslint-disable-next-line
  if (f7 && typeof window !== 'undefined') return;
  // eslint-disable-next-line
  if (typeof window === 'undefined') cleanup();

  const instance = new Framework7(f7Params);
  f7 = instance;
  setTheme();

  if (instance.initialized) {
    f7 = instance;
    f7events.emit('ready', f7);
  } else {
    instance.on('init', () => {
      f7 = instance;
      f7events.emit('ready', f7);
    });
  }
};

const f7ready = (callback) => {
  if (!callback) return;
  if (f7 && f7.initialized) callback(f7);
  else {
    f7events.once('ready', callback);
  }
};

export { f7, theme, f7ready, f7events, f7init, f7routers, f7initEvents, setTheme };
