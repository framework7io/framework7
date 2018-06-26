'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _ssrWindow = require('ssr-window');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sortable = {
  init: function init() {
    var app = this;
    var isTouched = void 0;
    var isMoved = void 0;
    var touchStartY = void 0;
    var touchesDiff = void 0;
    var $sortingEl = void 0;
    var $sortingItems = void 0;
    var $sortableContainer = void 0;
    var sortingElHeight = void 0;
    var minTop = void 0;
    var maxTop = void 0;
    var $insertAfterEl = void 0;
    var $insertBeforeEl = void 0;
    var indexFrom = void 0;
    var $pageEl = void 0;
    var $pageContentEl = void 0;
    var pageHeight = void 0;
    var pageOffset = void 0;
    var sortingElOffsetLocal = void 0;
    var sortingElOffsetTop = void 0;
    var initialScrollTop = void 0;

    function handleTouchStart(e) {
      isMoved = false;
      isTouched = true;
      touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      $sortingEl = (0, _dom2.default)(this).parent('li');
      indexFrom = $sortingEl.index();
      $sortableContainer = $sortingEl.parents('.sortable');
      var $listGroup = $sortingEl.parents('.list-group');
      if ($listGroup.length && $listGroup.parents($sortableContainer).length) {
        $sortableContainer = $listGroup;
      }
      $sortingItems = $sortableContainer.children('ul').children('li');
      if (app.panel) app.panel.allowOpen = false;
      if (app.swipeout) app.swipeout.allow = false;
    }
    function handleTouchMove(e) {
      if (!isTouched || !$sortingEl) return;
      var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      if (!isMoved) {
        $pageEl = $sortingEl.parents('.page');
        $pageContentEl = $sortingEl.parents('.page-content');
        var paddingTop = parseInt($pageContentEl.css('padding-top'), 10);
        var paddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
        initialScrollTop = $pageContentEl[0].scrollTop;
        pageOffset = $pageEl.offset().top + paddingTop;
        pageHeight = $pageEl.height() - paddingTop - paddingBottom;
        $sortingEl.addClass('sorting');
        $sortableContainer.addClass('sortable-sorting');
        sortingElOffsetLocal = $sortingEl[0].offsetTop;
        minTop = $sortingEl[0].offsetTop;
        maxTop = $sortingEl.parent().height() - sortingElOffsetLocal - $sortingEl.height();
        sortingElHeight = $sortingEl[0].offsetHeight;
        sortingElOffsetTop = $sortingEl.offset().top;
      }
      isMoved = true;

      e.preventDefault();
      e.f7PreventSwipePanel = true;

      touchesDiff = pageY - touchStartY;

      var translateScrollOffset = $pageContentEl[0].scrollTop - initialScrollTop;
      var translate = Math.min(Math.max(touchesDiff + translateScrollOffset, -minTop), maxTop);
      $sortingEl.transform('translate3d(0,' + translate + 'px,0)');

      var scrollAddition = 44;
      var allowScroll = true;
      if (touchesDiff + translateScrollOffset + scrollAddition < -minTop) {
        allowScroll = false;
      }
      if (touchesDiff + translateScrollOffset - scrollAddition > maxTop) {
        allowScroll = false;
      }

      $insertBeforeEl = undefined;
      $insertAfterEl = undefined;

      var scrollDiff = void 0;
      if (allowScroll) {
        if (sortingElOffsetTop + touchesDiff + sortingElHeight + scrollAddition > pageOffset + pageHeight) {
          // To Bottom
          scrollDiff = sortingElOffsetTop + touchesDiff + sortingElHeight + scrollAddition - (pageOffset + pageHeight);
        }
        if (sortingElOffsetTop + touchesDiff < pageOffset + scrollAddition) {
          // To Top
          scrollDiff = sortingElOffsetTop + touchesDiff - pageOffset - scrollAddition;
        }
        if (scrollDiff) {
          $pageContentEl[0].scrollTop += scrollDiff;
        }
      }

      $sortingItems.each(function (index, el) {
        var $currentEl = (0, _dom2.default)(el);
        if ($currentEl[0] === $sortingEl[0]) return;
        var currentElOffset = $currentEl[0].offsetTop;
        var currentElHeight = $currentEl.height();
        var sortingElOffset = sortingElOffsetLocal + translate;

        if (sortingElOffset >= currentElOffset - currentElHeight / 2 && $sortingEl.index() < $currentEl.index()) {
          $currentEl.transform('translate3d(0, ' + -sortingElHeight + 'px,0)');
          $insertAfterEl = $currentEl;
          $insertBeforeEl = undefined;
        } else if (sortingElOffset <= currentElOffset + currentElHeight / 2 && $sortingEl.index() > $currentEl.index()) {
          $currentEl.transform('translate3d(0, ' + sortingElHeight + 'px,0)');
          $insertAfterEl = undefined;
          if (!$insertBeforeEl) $insertBeforeEl = $currentEl;
        } else {
          $currentEl.transform('translate3d(0, 0%,0)');
        }
      });
    }
    function handleTouchEnd() {
      if (!isTouched || !isMoved) {
        isTouched = false;
        isMoved = false;
        if (isTouched && !isMoved) {
          if (app.panel) app.panel.allowOpen = true;
          if (app.swipeout) app.swipeout.allow = true;
        }
        return;
      }
      if (app.panel) app.panel.allowOpen = true;
      if (app.swipeout) app.swipeout.allow = true;

      $sortingItems.transform('');
      $sortingEl.removeClass('sorting');
      $sortableContainer.removeClass('sortable-sorting');

      var virtualList = void 0;
      var oldIndex = void 0;
      var newIndex = void 0;
      if (app.params.sortable.moveElements) {
        if ($insertAfterEl) {
          $sortingEl.insertAfter($insertAfterEl);
        }
        if ($insertBeforeEl) {
          $sortingEl.insertBefore($insertBeforeEl);
        }
      }

      if (($insertAfterEl || $insertBeforeEl) && $sortableContainer.hasClass('virtual-list')) {
        virtualList = $sortableContainer[0].f7VirtualList;
        oldIndex = $sortingEl[0].f7VirtualListIndex;
        newIndex = $insertBeforeEl ? $insertBeforeEl[0].f7VirtualListIndex : $insertAfterEl[0].f7VirtualListIndex;
        if (virtualList) virtualList.moveItem(oldIndex, newIndex);
      }

      $sortingEl.trigger('sortable:sort', { from: indexFrom, to: $sortingEl.index() });
      app.emit('sortableSort', $sortingEl[0], { from: indexFrom, to: $sortingEl.index() });

      $insertBeforeEl = undefined;
      $insertAfterEl = undefined;
      isTouched = false;
      isMoved = false;
    }

    var activeListener = app.support.passiveListener ? { passive: false, capture: false } : false;

    (0, _dom2.default)(_ssrWindow.document).on(app.touchEvents.start, '.list.sortable .sortable-handler', handleTouchStart, activeListener);
    app.on('touchmove:active', handleTouchMove);
    app.on('touchend:passive', handleTouchEnd);
  },
  enable: function enable() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.list.sortable';

    var app = this;
    var $el = (0, _dom2.default)(el);
    if ($el.length === 0) return;
    $el.addClass('sortable-enabled');
    $el.trigger('sortable:enable');
    app.emit('sortableEnable', $el[0]);
  },
  disable: function disable() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.list.sortable';

    var app = this;
    var $el = (0, _dom2.default)(el);
    if ($el.length === 0) return;
    $el.removeClass('sortable-enabled');
    $el.trigger('sortable:disable');
    app.emit('sortableDisable', $el[0]);
  },
  toggle: function toggle() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.list.sortable';

    var app = this;
    var $el = (0, _dom2.default)(el);
    if ($el.length === 0) return;
    if ($el.hasClass('sortable-enabled')) {
      app.sortable.disable($el);
    } else {
      app.sortable.enable($el);
    }
  }
};
exports.default = {
  name: 'sortable',
  params: {
    sortable: {
      moveElements: true
    }
  },
  create: function create() {
    var app = this;
    _utils2.default.extend(app, {
      sortable: {
        init: Sortable.init.bind(app),
        enable: Sortable.enable.bind(app),
        disable: Sortable.disable.bind(app),
        toggle: Sortable.toggle.bind(app)
      }
    });
  },

  on: {
    init: function init() {
      var app = this;
      if (!app.params.sortable) return;
      app.sortable.init();
    }
  },
  clicks: {
    '.sortable-enable': function enable($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      app.sortable.enable(data.sortable);
    },
    '.sortable-disable': function disable($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      app.sortable.disable(data.sortable);
    },
    '.sortable-toggle': function toggle($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      app.sortable.toggle(data.sortable);
    }
  }
};