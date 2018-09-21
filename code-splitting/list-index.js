
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

  var ListIndex = (function (Framework7Class$$1) {
    function ListIndex(app, params) {
      if ( params === void 0 ) params = {};

      Framework7Class$$1.call(this, params, [app]);
      var index = this;

      var defaults = {
        el: null, // where to render indexes
        listEl: null, // list el to generate indexes
        indexes: 'auto', // or array of indexes
        iosItemHeight: 14,
        mdItemHeight: 14,
        scrollList: true,
        label: false,
        // eslint-disable-next-line
        renderItem: function renderItem(itemContent, itemIndex) {
          return ("\n          <li>" + itemContent + "</li>\n        ").trim();
        },
        renderSkipPlaceholder: function renderSkipPlaceholder() {
          return '<li class="list-index-skip-placeholder"></li>';
        },
        on: {},
      };

      // Extend defaults with modules params
      index.useModulesParams(defaults);

      index.params = Utils.extend(defaults, params);

      var $el;
      var $listEl;
      var $pageContentEl;
      var $ul;

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
        app: app,
        $el: $el,
        el: $el && $el[0],
        $ul: $ul,
        ul: $ul && $ul[0],
        $listEl: $listEl,
        listEl: $listEl && $listEl[0],
        $pageContentEl: $pageContentEl,
        pageContentEl: $pageContentEl && $pageContentEl[0],
        indexes: params.indexes,
        height: 0,
        skipRate: 0,
      });

      // Install Modules
      index.useModules();

      // Attach events
      function handleResize() {
        var height = { index: index };
        index.calcSize();
        if (height !== index.height) {
          index.render();
        }
      }

      function handleClick(e) {
        var $clickedLi = $(e.target).closest('li');
        if (!$clickedLi.length) { return; }

        var itemIndex = $clickedLi.index();
        if (index.skipRate > 0) {
          var percentage = itemIndex / ($clickedLi.siblings('li').length - 1);
          itemIndex = Math.round((index.indexes.length - 1) * percentage);
        }
        var itemContent = index.indexes[itemIndex];

        index.$el.trigger('listindex:click', itemContent, itemIndex);
        index.emit('local::click listIndexClick', index, itemContent, itemIndex);
        index.$el.trigger('listindex:select', itemContent, itemIndex);
        index.emit('local::select listIndexSelect', index, itemContent, itemIndex);

        if (index.$listEl && index.params.scrollList) {
          index.scrollListToIndex(itemContent, itemIndex);
        }
      }

      var touchesStart = {};
      var isTouched;
      var isMoved;
      var topPoint;
      var bottomPoint;
      var $labelEl;
      var previousIndex = null;
      function handleTouchStart(e) {
        var $children = $ul.children();
        if (!$children.length) { return; }
        topPoint = $children[0].getBoundingClientRect().top;
        bottomPoint = $children[$children.length - 1].getBoundingClientRect().top + $children[0].offsetHeight;

        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        isTouched = true;
        isMoved = false;
        previousIndex = null;
      }
      function handleTouchMove(e) {
        if (!isTouched) { return; }
        if (!isMoved && index.params.label) {
          $labelEl = $('<span class="list-index-label"></span>');
          $el.append($labelEl);
        }
        isMoved = true;
        var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        e.preventDefault();

        var percentage = (pageY - topPoint) / (bottomPoint - topPoint);
        percentage = Math.min(Math.max(percentage, 0), 1);

        var itemIndex = Math.round((index.indexes.length - 1) * percentage);
        var itemContent = index.indexes[itemIndex];


        var ulHeight = bottomPoint - topPoint;
        var bubbleBottom = ((index.height - ulHeight) / 2) + ((1 - percentage) * ulHeight);

        if (itemIndex !== previousIndex) {
          if (index.params.label) {
            $labelEl.html(itemContent).transform(("translateY(-" + bubbleBottom + "px)"));
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
        if (!isTouched) { return; }
        isTouched = false;
        isMoved = false;
        if (index.params.label) {
          if ($labelEl) { $labelEl.remove(); }
          $labelEl = undefined;
        }
      }
      var passiveListener = app.support.passiveListener ? { passive: true } : false;
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

    if ( Framework7Class$$1 ) ListIndex.__proto__ = Framework7Class$$1;
    ListIndex.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    ListIndex.prototype.constructor = ListIndex;
    // eslint-disable-next-line
    ListIndex.prototype.scrollListToIndex = function scrollListToIndex (itemContent, itemIndex) {
      var index = this;
      var $listEl = index.$listEl;
      var $pageContentEl = index.$pageContentEl;
      if (!$listEl || !$pageContentEl || $pageContentEl.length === 0) { return index; }

      var $scrollToEl;
      $listEl.find('.list-group-title, .item-divider').each(function (elIndex, el) {
        if ($scrollToEl) { return; }
        var $el = $(el);
        if ($el.text() === itemContent) {
          $scrollToEl = $el;
        }
      });
      if (!$scrollToEl || $scrollToEl.length === 0) { return index; }

      var parentTop = $scrollToEl.parent().offset().top;
      var paddingTop = parseInt($pageContentEl.css('padding-top'), 10);
      var scrollTop = $pageContentEl[0].scrollTop;
      var scrollToElTop = $scrollToEl.offset().top;

      if (parentTop <= paddingTop) {
        $pageContentEl.scrollTop((parentTop + scrollTop) - paddingTop);
      } else {
        $pageContentEl.scrollTop((scrollToElTop + scrollTop) - paddingTop);
      }
      return index;
    };

    ListIndex.prototype.renderSkipPlaceholder = function renderSkipPlaceholder () {
      var index = this;
      return index.params.renderSkipPlaceholder.call(index);
    };

    ListIndex.prototype.renderItem = function renderItem (itemContent, itemIndex) {
      var index = this;
      return index.params.renderItem.call(index, itemContent, itemIndex);
    };

    ListIndex.prototype.render = function render () {
      var index = this;
      var $ul = index.$ul;
      var indexes = index.indexes;
      var skipRate = index.skipRate;
      var wasSkipped;

      var html = indexes.map(function (itemContent, itemIndex) {
        if (itemIndex % skipRate !== 0 && skipRate > 0) {
          wasSkipped = true;
          return '';
        }
        var itemHtml = index.renderItem(itemContent, itemIndex);
        if (wasSkipped) {
          itemHtml = index.renderSkipPlaceholder() + itemHtml;
        }
        wasSkipped = false;
        return itemHtml;
      }).join('');

      $ul.html(html);

      return index;
    };

    ListIndex.prototype.calcSize = function calcSize () {
      var index = this;
      var app = index.app;
      var params = index.params;
      var el = index.el;
      var indexes = index.indexes;
      var height = el.offsetHeight;
      var itemHeight = app.theme === 'ios' ? params.iosItemHeight : params.mdItemHeight;
      var maxItems = Math.floor(height / itemHeight);
      var items = indexes.length;
      var skipRate = 0;
      if (items > maxItems) {
        skipRate = Math.ceil(((items * 2) - 1) / maxItems);
      }

      index.height = height;
      index.skipRate = skipRate;

      return index;
    };

    ListIndex.prototype.calcIndexes = function calcIndexes () {
      var index = this;
      if (index.params.indexes === 'auto') {
        index.indexes = [];

        index.$listEl.find('.list-group-title, .item-divider').each(function (elIndex, el) {
          var elContent = $(el).text();
          if (index.indexes.indexOf(elContent) < 0) {
            index.indexes.push(elContent);
          }
        });
      } else {
        index.indexes = index.params.indexes;
      }
      return index;
    };

    ListIndex.prototype.update = function update () {
      var index = this;
      index.calcIndexes();
      index.calcSize();
      index.render();

      return index;
    };

    ListIndex.prototype.init = function init () {
      var index = this;
      index.calcIndexes();
      index.calcSize();
      index.render();
      index.attachEvents();
    };

    ListIndex.prototype.destroy = function destroy () {
      var index = this;
      index.$el.trigger('listindex:beforedestroy', index);
      index.emit('local::beforeDestroy listIndexBeforeDestroy', index);
      index.detachEvents();
      if (index.$el[0]) {
        index.$el[0].f7ListIndex = null;
        delete index.$el[0].f7ListIndex;
      }
      Utils.deleteProps(index);
      index = null;
    };

    return ListIndex;
  }(Framework7Class));

  var listIndex = {
    name: 'listIndex',
    static: {
      ListIndex: ListIndex,
    },
    create: function create() {
      var app = this;
      app.listIndex = ConstructorMethods({
        defaultSelector: '.list-index',
        constructor: ListIndex,
        app: app,
        domProp: 'f7ListIndex',
      });
    },
    on: {
      tabMounted: function tabMounted(tabEl) {
        var app = this;
        $(tabEl).find('.list-index-init').each(function (index, listIndexEl) {
          var params = Utils.extend($(listIndexEl).dataset(), { el: listIndexEl });
          app.listIndex.create(params);
        });
      },
      tabBeforeRemove: function tabBeforeRemove(tabEl) {
        $(tabEl).find('.list-index-init').each(function (index, listIndexEl) {
          if (listIndexEl.f7ListIndex) { listIndexEl.f7ListIndex.destroy(); }
        });
      },
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.list-index-init').each(function (index, listIndexEl) {
          var params = Utils.extend($(listIndexEl).dataset(), { el: listIndexEl });
          app.listIndex.create(params);
        });
      },
      pageBeforeRemove: function pageBeforeRemove(page) {
        page.$el.find('.list-index-init').each(function (index, listIndexEl) {
          if (listIndexEl.f7ListIndex) { listIndexEl.f7ListIndex.destroy(); }
        });
      },
    },
    vnode: {
      'list-index-init': {
        insert: function insert(vnode) {
          var app = this;
          var listIndexEl = vnode.elm;
          var params = Utils.extend($(listIndexEl).dataset(), { el: listIndexEl });
          app.listIndex.create(params);
        },
        destroy: function destroy(vnode) {
          var listIndexEl = vnode.elm;
          if (listIndexEl.f7ListIndex) { listIndexEl.f7ListIndex.destroy(); }
        },
      },
    },
  };

  return listIndex;
}
framework7ComponentLoader.componentName = 'listIndex';

