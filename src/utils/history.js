import $ from 'dom7';

const History = {
  queue: [],
  closeModal(modalType) {
    let modalClassName = modalType;
    if (modalType === 'sheet' || modalType === 'actions') {
      modalClassName = `${modalType}-modal`;
    }
    if (modalType === 'loginScreen') {
      modalClassName = 'login-screen';
    }
    const modalEl = $(`.${modalClassName}.modal-in`)[0];
    if (modalEl && modalEl.f7Modal) {
      modalEl.f7Modal.closeByHistory = true;
      modalEl.f7Modal.close();
    }
  },
  clearQueue() {
    if (History.queue.length === 0) return;
    const currentQueue = History.queue.pop();
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
    if (History.previousState && History.previousState.modal) {
      History.closeModal(History.previousState.modal);
      return;
    }
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
          History.queue.push({
            action: 'back',
            router,
          });
        }
      } else if (router.allowPageChange) {
        // Load page
        router.navigate(stateUrl, { animate, pushState: false });
      } else {
        History.queue.unshift({
          action: 'load',
          stateUrl,
          router,
        });
      }
    }
  },
  push(state, url) {
    History.previousState = History.state;
    History.state = state;
    window.history.pushState(state, '', url);
  },
  replace(state, url) {
    History.previousState = History.state;
    History.state = state;
    window.history.replaceState(state, '', url);
  },
  go(index) {
    window.history.go(index);
  },
  back() {
    window.history.back();
  },
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
