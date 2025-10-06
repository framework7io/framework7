import $ from '../../shared/dom7.js';
import appRouterCheck from './app-router-check.js';

function clearPreviousPages(router) {
  appRouterCheck(router, 'clearPreviousPages');

  const $pagesToRemove = router.$el.children('.page').filter((pageInView) => {
    if (router.currentRoute && (router.currentRoute.modal || router.currentRoute.panel))
      return true;
    return pageInView !== router.currentPageEl;
  });

  $pagesToRemove.each((pageEl) => {
    const $oldPageEl = $(pageEl);
    // Page remove event
    router.pageCallback('beforeRemove', $oldPageEl, 'previous', undefined, {});
    router.removePage($oldPageEl);
  });
}

function clearPreviousHistory() {
  const router = this;
  appRouterCheck(router, 'clearPreviousHistory');
  const url = router.history[router.history.length - 1];

  clearPreviousPages(router);

  router.history = [url];
  router.view.history = [url];
  router.saveHistory();
}

export { clearPreviousHistory }; // eslint-disable-line
