import $ from 'dom7';
import Utils from '../../utils/utils';

const Sortable = {
  init() {
    const app = this;
    let isTouched;
    let isMoved;
    let touchStartY;
    let touchesDiff;
    let $sortingEl;
    let $sortingItems;
    let $sortableContainer;
    let sortingElHeight;
    let minTop;
    let maxTop;
    let $insertAfterEl;
    let $insertBeforeEl;
    let indexFrom;
    let $pageEl;
    let $pageContentEl;
    let pageHeight;
    let pageOffset;
    let sortingElOffsetLocal;
    let sortingElOffsetTop;
    let initialScrollTop;

    function handleTouchStart(e) {
      isMoved = false;
      isTouched = true;
      touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      $sortingEl = $(this).parent('li');
      indexFrom = $sortingEl.index();
      $sortableContainer = $sortingEl.parents('.sortable');
      $sortingItems = $sortableContainer.children('ul').children('li');
      if (app.panel) app.panel.allowOpen = false;
      if (app.swipeout) app.swipeout.allow = false;
    }
    function handleTouchMove(e) {
      if (!isTouched || !$sortingEl) return;
      const pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      if (!isMoved) {
        $pageEl = $sortingEl.parents('.page');
        $pageContentEl = $sortingEl.parents('.page-content');
        const paddingTop = parseInt($pageContentEl.css('padding-top'), 10);
        const paddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
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

      const translateScrollOffset = $pageContentEl[0].scrollTop - initialScrollTop;
      const translate = Math.min(Math.max(touchesDiff + translateScrollOffset, -minTop), maxTop);
      $sortingEl.transform(`translate3d(0,${translate}px,0)`);

      const scrollAddition = 44;
      let allowScroll = true;
      if ((touchesDiff + translateScrollOffset) + scrollAddition < -minTop) {
        allowScroll = false;
      }
      if ((touchesDiff + translateScrollOffset) - scrollAddition > maxTop) {
        allowScroll = false;
      }

      $insertBeforeEl = undefined;
      $insertAfterEl = undefined;

      let scrollDiff;
      if (allowScroll) {
        if (sortingElOffsetTop + touchesDiff + sortingElHeight + scrollAddition > pageOffset + pageHeight) {
          // To Bottom
          scrollDiff = (sortingElOffsetTop + touchesDiff + sortingElHeight + scrollAddition) - (pageOffset + pageHeight);
        }
        if (sortingElOffsetTop + touchesDiff < pageOffset + scrollAddition) {
          // To Top
          scrollDiff = (sortingElOffsetTop + touchesDiff) - pageOffset - scrollAddition;
        }
        if (scrollDiff) {
          $pageContentEl[0].scrollTop += scrollDiff;
        }
      }

      $sortingItems.each((index, el) => {
        const $currentEl = $(el);
        if ($currentEl[0] === $sortingEl[0]) return;
        const currentElOffset = $currentEl[0].offsetTop;
        const currentElHeight = $currentEl.height();
        const sortingElOffset = sortingElOffsetLocal + translate;

        if ((sortingElOffset >= currentElOffset - (currentElHeight / 2)) && $sortingEl.index() < $currentEl.index()) {
          $currentEl.transform(`translate3d(0, ${-sortingElHeight}px,0)`);
          $insertAfterEl = $currentEl;
          $insertBeforeEl = undefined;
        } else if ((sortingElOffset <= currentElOffset + (currentElHeight / 2)) && $sortingEl.index() > $currentEl.index()) {
          $currentEl.transform(`translate3d(0, ${sortingElHeight}px,0)`);
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

      let virtualList;
      let oldIndex;
      let newIndex;
      if ($insertAfterEl) {
        $sortingEl.insertAfter($insertAfterEl);
      }
      if ($insertBeforeEl) {
        $sortingEl.insertBefore($insertBeforeEl);
      }

      $sortingEl.trigger('sortable:sort', { from: indexFrom, to: $sortingEl.index() });
      app.emit('sortableSort', $sortingEl[0], { from: indexFrom, to: $sortingEl.index() });

      if (($insertAfterEl || $insertBeforeEl) && $sortableContainer.hasClass('virtual-list')) {
        virtualList = $sortableContainer[0].f7VirtualList;
        oldIndex = $sortingEl[0].f7VirtualListIndex;
        newIndex = $insertBeforeEl ? $insertBeforeEl[0].f7VirtualListIndex : $insertAfterEl[0].f7VirtualListIndex;
        if (virtualList) virtualList.moveItem(oldIndex, newIndex);
      }
      $insertBeforeEl = undefined;
      $insertAfterEl = undefined;
      isTouched = false;
      isMoved = false;
    }

    const activeListener = app.support.passiveListener ? { passive: false, capture: false } : false;

    $(document).on(app.touchEvents.start, '.list.sortable .sortable-handler', handleTouchStart, activeListener);
    app.on('touchmove:active', handleTouchMove);
    app.on('touchend:passive', handleTouchEnd);
  },
  enable(el = '.list.sortable') {
    const app = this;
    const $el = $(el);
    if ($el.length === 0) return;
    $el.addClass('sortable-enabled');
    $el.trigger('sortable:enable');
    app.emit('sortableEnable', $el[0]);
  },
  disable(el = '.list.sortable') {
    const app = this;
    const $el = $(el);
    if ($el.length === 0) return;
    $el.removeClass('sortable-enabled');
    $el.trigger('sortable:disable');
    app.emit('sortableDisable', $el[0]);
  },
  toggle(el = '.list.sortable') {
    const app = this;
    const $el = $(el);
    if ($el.length === 0) return;
    if ($el.hasClass('sortable-enabled')) {
      app.sortable.disable($el);
    } else {
      app.sortable.enable($el);
    }
  },
};
export default {
  name: 'sortable',
  params: {
    sortable: true,
  },
  create() {
    const app = this;
    Utils.extend(app, {
      sortable: {
        init: Sortable.init.bind(app),
        enable: Sortable.enable.bind(app),
        disable: Sortable.disable.bind(app),
        toggle: Sortable.toggle.bind(app),
      },
    });
  },
  on: {
    init() {
      const app = this;
      if (app.params.sortable) app.sortable.init();
    },
  },
  clicks: {
    '.sortable-enable': function enable($clickedEl, data = {}) {
      const app = this;
      app.sortable.enable(data.sortable);
    },
    '.sortable-disable': function disable($clickedEl, data = {}) {
      const app = this;
      app.sortable.disable(data.sortable);
    },
    '.sortable-toggle': function toggle($clickedEl, data = {}) {
      const app = this;
      app.sortable.toggle(data.sortable);
    },
  },
};
