import $ from 'dom7';
import appRouterCheck from './app-router-check';

function clearPreviousPages() {
  const router = this;
  appRouterCheck(router, 'clearPreviousPages');
  const app = router.app;
  const separateNavbar = router.separateNavbar;

  const $currentPageEl = $(router.currentPageEl);

  const $pagesToRemove = router.$el
    .children('.page')
    .filter((index, pageInView) => pageInView !== $currentPageEl[0]);

  $pagesToRemove.each((index, pageEl) => {
    const $oldPageEl = $(pageEl);
    const $oldNavbarInnerEl = $(app.navbar.getElByPage($oldPageEl));
    if (router.params.stackPages && router.initialPages.indexOf($oldPageEl[0]) >= 0) {
      $oldPageEl.addClass('stacked');
      if (separateNavbar) {
        $oldNavbarInnerEl.addClass('stacked');
      }
    } else {
      // Page remove event
      router.pageCallback('beforeRemove', $oldPageEl, $oldNavbarInnerEl, 'previous', undefined, {});
      router.removePage($oldPageEl);
      if (separateNavbar && $oldNavbarInnerEl.length) {
        router.removeNavbar($oldNavbarInnerEl);
      }
    }
  });
}

function clearPreviousHistory() {
  const router = this;
  appRouterCheck(router, 'clearPreviousHistory');
  const url = router.history[router.history.length - 1];

  router.clearPreviousPages();

  router.history = [url];
  router.view.history = [url];
  router.saveHistory();
}

export { clearPreviousHistory, clearPreviousPages }; // eslint-disable-line
