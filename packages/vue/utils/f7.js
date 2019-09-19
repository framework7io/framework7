import Utils from './utils';

// eslint-disable-next-line
let f7Instance;

const f7 = {
  instance: null,
  Framework7: null,
  events: null,
  init(rootEl, params = {}, routes) {
    const { events, Framework7 } = f7;
    const f7Params = Utils.extend({}, params, {
      root: rootEl,
    });
    if (routes && routes.length && !f7Params.routes) f7Params.routes = routes;

    const instance = new Framework7(f7Params);
    f7Instance = instance;
    if (instance.initialized) {
      f7.instance = instance;
      f7Instance = instance;
      events.emit('ready', f7.instance);
    } else {
      instance.on('init', () => {
        f7.instance = instance;
        f7Instance = instance;
        events.emit('ready', f7.instance);
      });
    }
  },
  ready(callback) {
    if (!callback) return;
    if (f7.instance) callback(f7.instance);
    else {
      f7.events.once('ready', callback);
    }
  },
  routers: {
    views: [],
    tabs: [],
    modals: null,
  },
};
export { f7Instance };
export default f7;
