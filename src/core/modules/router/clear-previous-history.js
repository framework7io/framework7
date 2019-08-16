import $ from 'dom7';
import appRouterCheck from './app-router-check';

function clearPreviousPages(router) {
  appRouterCheck(router, 'clearPreviousPages');
  const app = router.app;
  const dynamicNavbar = router.dynamicNavbar;

  const $pagesToRemove = router.$el
    .children('.page')
    .filter((index, pageInView) => {
      if (router.currentRoute && (router.currentRoute.modal || router.currentRoute.panel)) return true;
      return pageInView !== router.currentPageEl;
    });

  $pagesToRemove.each((index, pageEl) => {
    const $oldPageEl = $(pageEl);
    const $oldNavbarEl = $(app.navbar.getElByPage($oldPageEl));
    if (router.params.stackPages && router.initialPages.indexOf($oldPageEl[0]) >= 0) {
      $oldPageEl.addClass('stacked');
      if (dynamicNavbar) {
        $oldNavbarEl.addClass('stacked');
      }
    } else {
      // Page remove event
      router.pageCallback('beforeRemove', $oldPageEl, $oldNavbarEl, 'previous', undefined, {});
      router.removePage($oldPageEl);
      if (dynamicNavbar && $oldNavbarEl.length) {
        router.removeNavbar($oldNavbarEl);
      }
    }
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
