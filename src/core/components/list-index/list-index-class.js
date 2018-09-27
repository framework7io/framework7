import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class ListIndex extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);
    const index = this;

    const defaults = {
      el: null, // where to render indexes
      listEl: null, // list el to generate indexes
      indexes: 'auto', // or array of indexes
      iosItemHeight: 14,
      mdItemHeight: 14,
      scrollList: true,
      label: false,
      // eslint-disable-next-line
      renderItem(itemContent, itemIndex) {
        return `
          <li>${itemContent}</li>
        `.trim();
      },
      renderSkipPlaceholder() {
        return '<li class="list-index-skip-placeholder"></li>';
      },
      on: {},
    };

    // Extend defaults with modules params
    index.useModulesParams(defaults);

    index.params = Utils.extend(defaults, params);

    let $el;
    let $listEl;
    let $pageContentEl;
    let $ul;

    if (index.params.el) {
      $el = $(index.params.el);
    } else {
      return index;
    }

    if ($el[0].f7ListIndex) {
      return $el[0].f7ListIndex;
    }

    $ul = $el.find('ul');
    if ($ul.length === 0) {
      $ul = $('<ul></ul>');
      $el.append($ul);
    }

    if (index.params.listEl) {
      $listEl = $(index.params.listEl);
    }

    if (index.params.indexes === 'auto' && !$listEl) {
      return index;
    }

    if ($listEl) {
      $pageContentEl = $listEl.parents('.page-content').eq(0);
    } else {
      $pageContentEl = $el.siblings('.page-content').eq(0);
      if ($pageContentEl.length === 0) {
        $pageContentEl = $el.parents('.page').eq(0).find('.page-content').eq(0);
      }
    }

    $el[0].f7ListIndex = index;

    Utils.extend(index, {
      app,
      $el,
      el: $el && $el[0],
      $ul,
      ul: $ul && $ul[0],
      $listEl,
      listEl: $listEl && $listEl[0],
      $pageContentEl,
      pageContentEl: $pageContentEl && $pageContentEl[0],
      indexes: params.indexes,
      height: 0,
      skipRate: 0,
    });

    // Install Modules
    index.useModules();

    // Attach events
    function handleResize() {
      const height = { index };
      index.calcSize();
      if (height !== index.height) {
        index.render();
      }
    }

    function handleClick(e) {
      const $clickedLi = $(e.target).closest('li');
      if (!$clickedLi.length) return;

      let itemIndex = $clickedLi.index();
      if (index.skipRate > 0) {
        const percentage = itemIndex / ($clickedLi.siblings('li').length - 1);
        itemIndex = Math.round((index.indexes.length - 1) * percentage);
      }
      const itemContent = index.indexes[itemIndex];

      index.$el.trigger('listindex:click', itemContent, itemIndex);
      index.emit('local::click listIndexClick', index, itemContent, itemIndex);
      index.$el.trigger('listindex:select', itemContent, itemIndex);
      index.emit('local::select listIndexSelect', index, itemContent, itemIndex);

      if (index.$listEl && index.params.scrollList) {
        index.scrollListToIndex(itemContent, itemIndex);
      }
    }

    const touchesStart = {};
    let isTouched;
    let isMoved;
    let topPoint;
    let bottomPoint;
    let $labelEl;
    let previousIndex = null;
    function handleTouchStart(e) {
      const $children = $ul.children();
      if (!$children.length) return;
      topPoint = $children[0].getBoundingClientRect().top;
      bottomPoint = $children[$children.length - 1].getBoundingClientRect().top + $children[0].offsetHeight;

      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      isTouched = true;
      isMoved = false;
      previousIndex = null;
    }
    function handleTouchMove(e) {
      if (!isTouched) return;
      if (!isMoved && index.params.label) {
        $labelEl = $('<span class="list-index-label"></span>');
        $el.append($labelEl);
      }
      isMoved = true;
      const pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      e.preventDefault();

      let percentage = (pageY - topPoint) / (bottomPoint - topPoint);
      percentage = Math.min(Math.max(percentage, 0), 1);

      const itemIndex = Math.round((index.indexes.length - 1) * percentage);
      const itemContent = index.indexes[itemIndex];


      const ulHeight = bottomPoint - topPoint;
      const bubbleBottom = ((index.height - ulHeight) / 2) + ((1 - percentage) * ulHeight);

      if (itemIndex !== previousIndex) {
        if (index.params.label) {
          $labelEl.html(itemContent).transform(`translateY(-${bubbleBottom}px)`);
        }

        if (index.$listEl && index.params.scrollList) {
          index.scrollListToIndex(itemContent, itemIndex);
        }
      }

      previousIndex = itemIndex;

      index.$el.trigger('listindex:select', index);
      index.emit('local::select listIndexSelect', index, itemContent, itemIndex);
    }
    function handleTouchEnd() {
      if (!isTouched) return;
      isTouched = false;
      isMoved = false;
      if (index.params.label) {
        if ($labelEl) $labelEl.remove();
        $labelEl = undefined;
      }
    }
    const passiveListener = app.support.passiveListener ? { passive: true } : false;
    index.attachEvents = function attachEvents() {
      $el.parents('.tab').on('tab:show', handleResize);
      $el.parents('.page').on('page:reinit', handleResize);
      $el.parents('.panel').on('panel:open', handleResize);
      $el
        .parents('.sheet-modal, .actions-modal, .popup, .popover, .login-screen, .dialog, .toast')
        .on('modal:open', handleResize);
      app.on('resize', handleResize);

      $el.on('click', handleClick);
      $el.on(app.touchEvents.start, handleTouchStart, passiveListener);
      app.on('touchmove:active', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
    };
    index.detachEvents = function attachEvents() {
      $el.parents('.tab').off('tab:show', handleResize);
      $el.parents('.page').off('page:reinit', handleResize);
      $el.parents('.panel').off('panel:open', handleResize);
      $el
        .parents('.sheet-modal, .actions-modal, .popup, .popover, .login-screen, .dialog, .toast')
        .off('modal:open', handleResize);
      app.off('resize', handleResize);

      $el.off('click', handleClick);
      $el.off(app.touchEvents.start, handleTouchStart, passiveListener);
      app.off('touchmove:active', handleTouchMove);
      app.off('touchend:passive', handleTouchEnd);
    };
    // Init
    index.init();

    return index;
  }
  // eslint-disable-next-line
  scrollListToIndex(itemContent, itemIndex) {
    const index = this;
    const { $listEl, $pageContentEl } = index;
    if (!$listEl || !$pageContentEl || $pageContentEl.length === 0) return index;

    let $scrollToEl;
    $listEl.find('.list-group-title, .item-divider').each((elIndex, el) => {
      if ($scrollToEl) return;
      const $el = $(el);
      if ($el.text() === itemContent) {
        $scrollToEl = $el;
      }
    });
    if (!$scrollToEl || $scrollToEl.length === 0) return index;

    const parentTop = $scrollToEl.parent().offset().top;
    const paddingTop = parseInt($pageContentEl.css('padding-top'), 10);
    const scrollTop = $pageContentEl[0].scrollTop;
    const scrollToElTop = $scrollToEl.offset().top;

    if (parentTop <= paddingTop) {
      $pageContentEl.scrollTop((parentTop + scrollTop) - paddingTop);
    } else {
      $pageContentEl.scrollTop((scrollToElTop + scrollTop) - paddingTop);
    }
    return index;
  }

  renderSkipPlaceholder() {
    const index = this;
    return index.params.renderSkipPlaceholder.call(index);
  }

  renderItem(itemContent, itemIndex) {
    const index = this;
    return index.params.renderItem.call(index, itemContent, itemIndex);
  }

  render() {
    const index = this;
    const { $ul, indexes, skipRate } = index;
    let wasSkipped;

    const html = indexes.map((itemContent, itemIndex) => {
      if (itemIndex % skipRate !== 0 && skipRate > 0) {
        wasSkipped = true;
        return '';
      }
      let itemHtml = index.renderItem(itemContent, itemIndex);
      if (wasSkipped) {
        itemHtml = index.renderSkipPlaceholder() + itemHtml;
      }
      wasSkipped = false;
      return itemHtml;
    }).join('');

    $ul.html(html);

    return index;
  }

  calcSize() {
    const index = this;
    const { app, params, el, indexes } = index;
    const height = el.offsetHeight;
    const itemHeight = app.theme === 'ios' ? params.iosItemHeight : params.mdItemHeight;
    const maxItems = Math.floor(height / itemHeight);
    const items = indexes.length;
    let skipRate = 0;
    if (items > maxItems) {
      skipRate = Math.ceil(((items * 2) - 1) / maxItems);
    }

    index.height = height;
    index.skipRate = skipRate;

    return index;
  }

  calcIndexes() {
    const index = this;
    if (index.params.indexes === 'auto') {
      index.indexes = [];

      index.$listEl.find('.list-group-title, .item-divider').each((elIndex, el) => {
        const elContent = $(el).text();
        if (index.indexes.indexOf(elContent) < 0) {
          index.indexes.push(elContent);
        }
      });
    } else {
      index.indexes = index.params.indexes;
    }
    return index;
  }

  update() {
    const index = this;
    index.calcIndexes();
    index.calcSize();
    index.render();

    return index;
  }

  init() {
    const index = this;
    index.calcIndexes();
    index.calcSize();
    index.render();
    index.attachEvents();
  }

  destroy() {
    let index = this;
    index.$el.trigger('listindex:beforedestroy', index);
    index.emit('local::beforeDestroy listIndexBeforeDestroy', index);
    index.detachEvents();
    if (index.$el[0]) {
      index.$el[0].f7ListIndex = null;
      delete index.$el[0].f7ListIndex;
    }
    Utils.deleteProps(index);
    index = null;
  }
}

export default ListIndex;
