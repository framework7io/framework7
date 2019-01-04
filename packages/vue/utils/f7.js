import Utils from './utils';
import events from './events';

const f7 = {
  instance: null,
  Framework7: null,
  init(rootEl, params = {}, routes) {
    const f7Params = Utils.extend({}, params, {
      root: rootEl,
    });
    if (routes && routes.length && !f7Params.routes) f7Params.routes = routes;

    f7.instance = new f7.Framework7(f7Params);
    if (f7.instance.initialized) {
      events.emit('ready', f7.instance);
    } else {
      f7.instance.on('init', () => {
        events.emit('ready', f7.instance);
      });
    }
  },
  ready(callback) {
    if (!callback) return;
    if (f7.instance) callback(f7.instance);
    else {
      events.once('ready', callback);
    }
  },
  routers: {
    views: [],
    tabs: [],
    modals: null,
  },
};

export default f7;
