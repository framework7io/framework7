import $ from 'dom7';

function clearPreviousHistory() {
  const router = this;
  const app = router.app;
  const separateNavbar = router.separateNavbar;
  const url = router.history[router.history.length - 1];

  const $currentPageEl = $(router.currentPageEl);

  const $pagesToRemove = router.$el
    .children('.page:not(.stacked)')
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

  router.history = [url];
  router.view.history = [url];
  router.saveHistory();
}

export { clearPreviousHistory }; // eslint-disable-line
