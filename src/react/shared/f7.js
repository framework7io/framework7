/* eslint-disable import/no-mutable-exports */
import { extend } from './utils';

let Framework7Class;
let f7;
let f7events;

const f7routers = {
  views: [],
  tabs: [],
  modals: null,
};

const f7initEventsAndClass = (F7Class) => {
  Framework7Class = F7Class;
  f7events = new F7Class.Events();
};

const f7init = (rootEl, params = {}, routes) => {
  const f7Params = extend({}, params, {
    root: rootEl,
  });
  if (routes && routes.length && !f7Params.routes) f7Params.routes = routes;

  const instance = new Framework7Class(f7Params);
  f7 = instance;
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
  if (f7) callback(f7);
  else {
    f7events.once('ready', callback);
  }
};

const theme = {};

export { f7, theme, f7ready, f7events, f7init, f7routers, f7initEventsAndClass };
