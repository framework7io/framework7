/* eslint-disable import/no-mutable-exports */
import Framework7 from 'framework7';
import { extend } from './utils';

let f7;
let f7events;

const f7routers = {
  views: [],
  tabs: [],
  modals: null,
};

const f7initEvents = () => {
  f7events = new Framework7.Events();
};

const f7init = (rootEl, params = {}) => {
  const f7Params = extend({}, params, {
    root: rootEl,
  });
  if (!f7Params.routes) f7Params.routes = [];

  const instance = new Framework7(f7Params);
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

export { f7, theme, f7ready, f7events, f7init, f7routers, f7initEvents };
