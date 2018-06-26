'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearPreviousHistory = undefined;

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function clearPreviousHistory() {
  var router = this;
  var app = router.app;
  var separateNavbar = router.separateNavbar;
  var url = router.history[router.history.length - 1];

  var $currentPageEl = (0, _dom2.default)(router.currentPageEl);

  var $pagesToRemove = router.$el.children('.page:not(.stacked)').filter(function (index, pageInView) {
    return pageInView !== $currentPageEl[0];
  });

  $pagesToRemove.each(function (index, pageEl) {
    var $oldPageEl = (0, _dom2.default)(pageEl);
    var $oldNavbarInnerEl = (0, _dom2.default)(app.navbar.getElByPage($oldPageEl));
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

exports.clearPreviousHistory = clearPreviousHistory; // eslint-disable-line