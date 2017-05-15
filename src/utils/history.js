import $ from 'dom7';

const History = {
  queue: [],
  clearQueue() {

  },
  handle(e) {
    const app = this;
    const mainView = app.views.main;
    let state = e.state;
    if (!state && mainView) {
      state = {
        viewIndex: app.views.indexOf(mainView),
        url: mainView.router.history[0],
      };
    }
    if (state.viewIndex < 0) return;
    const view = app.views[state.viewIndex];
    const router = view.router;
    const stateUrl = (state && state.route && state.route.url) || undefined;
    // const stateContent = state && state.content || undefined;
    // const statePageName = state && state.pageName || undefined;
    let animate;

    if (router.params.pushStateNoAnimation === true) animate = false;
    else animate = true;

    if (stateUrl !== router.url) {
      if (router.history.indexOf(stateUrl) >= 0) {
        // Go Back
        if (router.allowPageChange) {
          router.navigateBack(undefined, { animate, pushState: false });
        } else {
          History.queue.push({
            action: 'back',
            view,
          });
        }
      } else {
        // Load Page
        if (router.allowPageChange) {
          router.navigate(stateUrl, { animate, pushState: false });
        } else {
          History.queue.unshift({
            action: 'loadPage',
            stateUrl,
            view,
          });
        }
      }
    }
  },
  push(state, url) {
    window.history.pushState(state, '', url);
  },
  replace(state, url) {
    window.history.replaceState(state, '', url);
  },
  go(index) {
    window.history.go(index);
  },
  back() {
    window.history.back();
  },
  state: window.history.state,
  init(app) {
    $(window).on('popstate', History.handle.bind(app));
  },
};

export default History;
