import { getWindow, getDocument } from 'ssr-window';
import $ from './dom7.js';
import { extend } from './utils.js';

const History = {
  queue: [],
  clearQueue() {
    if (History.queue.length === 0) return;
    const currentQueue = History.queue.shift();
    currentQueue();
  },
  routerQueue: [],
  clearRouterQueue() {
    if (History.routerQueue.length === 0) return;
    const currentQueue = History.routerQueue.pop();
    const { router, stateUrl, action } = currentQueue;

    let animate = router.params.animate;
    if (router.params.browserHistoryAnimate === false) animate = false;

    if (action === 'back') {
      router.back({ animate, browserHistory: false });
    }
    if (action === 'load') {
      router.navigate(stateUrl, { animate, browserHistory: false });
    }
  },
  handle(e) {
    if (History.blockPopstate) return;
    const app = this;
    // const mainView = app.views.main;
    let state = e.state;
    History.previousState = History.state;
    History.state = state;

    History.allowChange = true;
    History.clearQueue();

    state = History.state;
    if (!state) state = {};

    app.views.forEach((view) => {
      const router = view.router;
      let viewState = state[view.id];
      if (!viewState && view.params.browserHistory) {
        viewState = {
          url: view.router.history[0],
        };
      }
      if (!viewState) return;
      const stateUrl = viewState.url || undefined;

      let animate = router.params.animate;
      if (router.params.browserHistoryAnimate === false) animate = false;

      if (stateUrl !== router.url) {
        if (router.history.indexOf(stateUrl) >= 0) {
          // Go Back
          if (router.allowPageChange) {
            router.back({ animate, browserHistory: false });
          } else {
            History.routerQueue.push({
              action: 'back',
              router,
            });
          }
        } else if (router.allowPageChange) {
          // Load page
          router.navigate(stateUrl, { animate, browserHistory: false });
        } else {
          History.routerQueue.unshift({
            action: 'load',
            stateUrl,
            router,
          });
        }
      }
    });
  },
  initViewState(viewId, viewState) {
    const window = getWindow();
    const newState = extend({}, History.state || {}, {
      [viewId]: viewState,
    });
    History.state = newState;
    window.history.replaceState(newState, '');
  },
  push(viewId, viewState, url) {
    const window = getWindow();
    const document = getDocument();
    /* eslint-disable no-param-reassign */
    if (url.substr(-3) === '#!/') {
      url = url.replace('#!/', '');
      if (url === '') {
        url = document.location.href;
        if (url.includes('#!/')) {
          url = document.location.href.split('#!/')[0];
        }
      }
    }
    /* eslint-enable no-param-reassign */
    if (!History.allowChange) {
      History.queue.push(() => {
        History.push(viewId, viewState, url);
      });
      return;
    }
    History.previousState = History.state;
    const newState = extend({}, History.previousState || {}, {
      [viewId]: viewState,
    });
    History.state = newState;
    window.history.pushState(newState, '', url);
  },
  replace(viewId, viewState, url) {
    const window = getWindow();
    if (url.substr(-3) === '#!/') {
      // eslint-disable-next-line
      url = url.replace('#!/', '');
    }
    if (!History.allowChange) {
      History.queue.push(() => {
        History.replace(viewId, viewState, url);
      });
      return;
    }
    History.previousState = History.state;
    const newState = extend({}, History.previousState || {}, {
      [viewId]: viewState,
    });
    History.state = newState;
    window.history.replaceState(newState, '', url);
  },
  go(index) {
    const window = getWindow();
    History.allowChange = false;
    window.history.go(index);
  },
  back() {
    const window = getWindow();
    History.allowChange = false;
    window.history.back();
  },
  allowChange: true,
  previousState: {},
  state: {},
  blockPopstate: true,
  init(app) {
    const window = getWindow();
    const document = getDocument();
    History.state = window.history.state;
    $(window).on('load', () => {
      setTimeout(() => {
        History.blockPopstate = false;
      }, 0);
    });

    if (document.readyState && document.readyState === 'complete') {
      History.blockPopstate = false;
    }

    $(window).on('popstate', History.handle.bind(app));
  },
};

export default History;
