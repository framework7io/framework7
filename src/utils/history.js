import $ from 'dom7';

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
    const router = currentQueue.router;

    let animate = router.params.animate;
    if (router.params.pushStateAnimate === false) animate = false;

    if (currentQueue.action === 'back') {
      router.back({ animate, pushState: false });
    }
    if (currentQueue.action === 'load') {
      router.navigate(currentQueue.stateUrl, { animate, pushState: false });
    }
  },
  handle(e) {
    if (History.blockPopstate) return;
    const app = this;
    const mainView = app.views.main;
    let state = e.state;
    History.previousState = History.state;
    History.state = state;

    History.allowChange = true;
    History.clearQueue();

    state = History.state;

    if (!state && mainView) {
      state = {
        viewIndex: mainView.index,
        url: mainView.router.history[0],
      };
    }
    if (state.viewIndex < 0) return;
    const view = app.views[state.viewIndex];
    const router = view.router;
    const stateUrl = (state && state.url) || undefined;

    let animate = router.params.animate;
    if (router.params.pushStateAnimate === false) animate = false;

    if (stateUrl !== router.url) {
      if (router.history.indexOf(stateUrl) >= 0) {
        // Go Back
        if (router.allowPageChange) {
          router.back({ animate, pushState: false });
        } else {
          History.routerQueue.push({
            action: 'back',
            router,
          });
        }
      } else if (router.allowPageChange) {
        // Load page
        router.navigate(stateUrl, { animate, pushState: false });
      } else {
        History.routerQueue.unshift({
          action: 'load',
          stateUrl,
          router,
        });
      }
    }
  },
  push(state, url) {
    if (!History.allowChange) {
      History.queue.push(() => {
        History.push(state, url);
      });
      return;
    }
    History.previousState = History.state;
    History.state = state;
    window.history.pushState(state, '', url);
  },
  replace(state, url) {
    if (!History.allowChange) {
      History.queue.push(() => {
        History.replace(state, url);
      });
      return;
    }
    History.previousState = History.state;
    History.state = state;
    window.history.replaceState(state, '', url);
  },
  go(index) {
    History.allowChange = false;
    window.history.go(index);
  },
  back() {
    History.allowChange = false;
    window.history.back();
  },
  allowChange: true,
  previousState: {},
  state: window.history.state,
  blockPopstate: true,
  init(app) {
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
