
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

  var VirtualList = (function (Framework7Class$$1) {
    function VirtualList(app, params) {
      if ( params === void 0 ) params = {};

      Framework7Class$$1.call(this, params, [app]);
      var vl = this;

      var defaults = {
        cols: 1,
        height: app.theme === 'md' ? 48 : 44,
        cache: true,
        dynamicHeightBufferSize: 1,
        showFilteredItemsOnly: false,
        renderExternal: undefined,
        setListHeight: true,
        searchByItem: undefined,
        searchAll: undefined,
        itemTemplate: undefined,
        ul: null,
        createUl: true,
        renderItem: function renderItem(item) {
          return ("\n          <li>\n            <div class=\"item-content\">\n              <div class=\"item-inner\">\n                <div class=\"item-title\">" + item + "</div>\n              </div>\n            </div>\n          </li>\n        ").trim();
        },
        on: {},
      };

      // Extend defaults with modules params
      vl.useModulesParams(defaults);

      vl.params = Utils.extend(defaults, params);
      if (vl.params.height === undefined || !vl.params.height) {
        vl.params.height = app.theme === 'md' ? 48 : 44;
      }

      vl.$el = $(params.el);
      vl.el = vl.$el[0];

      if (vl.$el.length === 0) { return undefined; }
      vl.$el[0].f7VirtualList = vl;

      vl.items = vl.params.items;
      if (vl.params.showFilteredItemsOnly) {
        vl.filteredItems = [];
      }
      if (vl.params.itemTemplate) {
        if (typeof vl.params.itemTemplate === 'string') { vl.renderItem = Template7.compile(vl.params.itemTemplate); }
        else if (typeof vl.params.itemTemplate === 'function') { vl.renderItem = vl.params.itemTemplate; }
      } else if (vl.params.renderItem) {
        vl.renderItem = vl.params.renderItem;
      }
      vl.$pageContentEl = vl.$el.parents('.page-content');
      vl.pageContentEl = vl.$pageContentEl[0];

      // Bad scroll
      if (typeof vl.params.updatableScroll !== 'undefined') {
        vl.updatableScroll = vl.params.updatableScroll;
      } else {
        vl.updatableScroll = true;
        if (Device.ios && Device.osVersion.split('.')[0] < 8) {
          vl.updatableScroll = false;
        }
      }

      // Append <ul>
      var ul = vl.params.ul;
      vl.$ul = ul ? $(vl.params.ul) : vl.$el.children('ul');
      if (vl.$ul.length === 0 && vl.params.createUl) {
        vl.$el.append('<ul></ul>');
        vl.$ul = vl.$el.children('ul');
      }
      vl.ul = vl.$ul[0];

      var $itemsWrapEl;
      if (!vl.ul && !vl.params.createUl) { $itemsWrapEl = vl.$el; }
      else { $itemsWrapEl = vl.$ul; }

      Utils.extend(vl, {
        $itemsWrapEl: $itemsWrapEl,
        itemsWrapEl: $itemsWrapEl[0],
        // DOM cached items
        domCache: {},
        displayDomCache: {},
        // Temporary DOM Element
        tempDomElement: doc.createElement('ul'),
        // Last repain position
        lastRepaintY: null,
        // Fragment
        fragment: doc.createDocumentFragment(),
        // Props
        pageHeight: undefined,
        rowsPerScreen: undefined,
        rowsBefore: undefined,
        rowsAfter: undefined,
        rowsToRender: undefined,
        maxBufferHeight: 0,
        listHeight: undefined,
        dynamicHeight: typeof vl.params.height === 'function',
      });

      // Install Modules
      vl.useModules();

      // Attach events
      var handleScrollBound = vl.handleScroll.bind(vl);
      var handleResizeBound = vl.handleResize.bind(vl);
      var $pageEl;
      var $tabEl;
      var $panelEl;
      var $popupEl;
      vl.attachEvents = function attachEvents() {
        $pageEl = vl.$el.parents('.page').eq(0);
        $tabEl = vl.$el.parents('.tab').eq(0);
        $panelEl = vl.$el.parents('.panel').eq(0);
        $popupEl = vl.$el.parents('.popup').eq(0);

        vl.$pageContentEl.on('scroll', handleScrollBound);
        if ($pageEl) { $pageEl.on('page:reinit', handleResizeBound); }
        if ($tabEl) { $tabEl.on('tab:show', handleResizeBound); }
        if ($panelEl) { $panelEl.on('panel:open', handleResizeBound); }
        if ($popupEl) { $popupEl.on('popup:open', handleResizeBound); }
        app.on('resize', handleResizeBound);
      };
      vl.detachEvents = function attachEvents() {
        vl.$pageContentEl.off('scroll', handleScrollBound);
        if ($pageEl) { $pageEl.off('page:reinit', handleResizeBound); }
        if ($tabEl) { $tabEl.off('tab:show', handleResizeBound); }
        if ($panelEl) { $panelEl.off('panel:open', handleResizeBound); }
        if ($popupEl) { $popupEl.off('popup:open', handleResizeBound); }
        app.off('resize', handleResizeBound);
      };
      // Init
      vl.init();

      return vl;
    }

    if ( Framework7Class$$1 ) VirtualList.__proto__ = Framework7Class$$1;
    VirtualList.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    VirtualList.prototype.constructor = VirtualList;

    VirtualList.prototype.setListSize = function setListSize () {
      var vl = this;
      var items = vl.filteredItems || vl.items;
      vl.pageHeight = vl.$pageContentEl[0].offsetHeight;
      if (vl.dynamicHeight) {
        vl.listHeight = 0;
        vl.heights = [];
        for (var i = 0; i < items.length; i += 1) {
          var itemHeight = vl.params.height(items[i]);
          vl.listHeight += itemHeight;
          vl.heights.push(itemHeight);
        }
      } else {
        vl.listHeight = Math.ceil(items.length / vl.params.cols) * vl.params.height;
        vl.rowsPerScreen = Math.ceil(vl.pageHeight / vl.params.height);
        vl.rowsBefore = vl.params.rowsBefore || vl.rowsPerScreen * 2;
        vl.rowsAfter = vl.params.rowsAfter || vl.rowsPerScreen;
        vl.rowsToRender = (vl.rowsPerScreen + vl.rowsBefore + vl.rowsAfter);
        vl.maxBufferHeight = (vl.rowsBefore / 2) * vl.params.height;
      }

      if (vl.updatableScroll || vl.params.setListHeight) {
        vl.$itemsWrapEl.css({ height: ((vl.listHeight) + "px") });
      }
    };

    VirtualList.prototype.render = function render (force, forceScrollTop) {
      var vl = this;
      if (force) { vl.lastRepaintY = null; }

      var scrollTop = -(vl.$el[0].getBoundingClientRect().top - vl.$pageContentEl[0].getBoundingClientRect().top);

      if (typeof forceScrollTop !== 'undefined') { scrollTop = forceScrollTop; }
      if (vl.lastRepaintY === null || Math.abs(scrollTop - vl.lastRepaintY) > vl.maxBufferHeight || (!vl.updatableScroll && (vl.$pageContentEl[0].scrollTop + vl.pageHeight >= vl.$pageContentEl[0].scrollHeight))) {
        vl.lastRepaintY = scrollTop;
      } else {
        return;
      }

      var items = vl.filteredItems || vl.items;
      var fromIndex;
      var toIndex;
      var heightBeforeFirstItem = 0;
      var heightBeforeLastItem = 0;
      if (vl.dynamicHeight) {
        var itemTop = 0;
        var itemHeight;
        vl.maxBufferHeight = vl.pageHeight;

        for (var j = 0; j < vl.heights.length; j += 1) {
          itemHeight = vl.heights[j];
          if (typeof fromIndex === 'undefined') {
            if (itemTop + itemHeight >= scrollTop - (vl.pageHeight * 2 * vl.params.dynamicHeightBufferSize)) { fromIndex = j; }
            else { heightBeforeFirstItem += itemHeight; }
          }

          if (typeof toIndex === 'undefined') {
            if (itemTop + itemHeight >= scrollTop + (vl.pageHeight * 2 * vl.params.dynamicHeightBufferSize) || j === vl.heights.length - 1) { toIndex = j + 1; }
            heightBeforeLastItem += itemHeight;
          }
          itemTop += itemHeight;
        }
        toIndex = Math.min(toIndex, items.length);
      } else {
        fromIndex = (parseInt(scrollTop / vl.params.height, 10) - vl.rowsBefore) * vl.params.cols;
        if (fromIndex < 0) {
          fromIndex = 0;
        }
        toIndex = Math.min(fromIndex + (vl.rowsToRender * vl.params.cols), items.length);
      }

      var topPosition;
      var renderExternalItems = [];
      vl.reachEnd = false;
      var i;
      for (i = fromIndex; i < toIndex; i += 1) {
        var itemEl = (void 0);
        // Define real item index
        var index = vl.items.indexOf(items[i]);

        if (i === fromIndex) { vl.currentFromIndex = index; }
        if (i === toIndex - 1) { vl.currentToIndex = index; }
        if (vl.filteredItems) {
          if (vl.items[index] === vl.filteredItems[vl.filteredItems.length - 1]) { vl.reachEnd = true; }
        } else if (index === vl.items.length - 1) { vl.reachEnd = true; }

        // Find items
        if (vl.params.renderExternal) {
          renderExternalItems.push(items[i]);
        } else if (vl.domCache[index]) {
          itemEl = vl.domCache[index];
          itemEl.f7VirtualListIndex = index;
        } else {
          if (vl.renderItem) {
            vl.tempDomElement.innerHTML = vl.renderItem(items[i], index).trim();
          } else {
            vl.tempDomElement.innerHTML = items[i].toString().trim();
          }
          itemEl = vl.tempDomElement.childNodes[0];
          if (vl.params.cache) { vl.domCache[index] = itemEl; }
          itemEl.f7VirtualListIndex = index;
        }

        // Set item top position
        if (i === fromIndex) {
          if (vl.dynamicHeight) {
            topPosition = heightBeforeFirstItem;
          } else {
            topPosition = ((i * vl.params.height) / vl.params.cols);
          }
        }
        if (!vl.params.renderExternal) {
          itemEl.style.top = topPosition + "px";

          // Before item insert
          vl.emit('local::itemBeforeInsert vlItemBeforeInsert', vl, itemEl, items[i]);

          // Append item to fragment
          vl.fragment.appendChild(itemEl);
        }
      }

      // Update list height with not updatable scroll
      if (!vl.updatableScroll) {
        if (vl.dynamicHeight) {
          vl.itemsWrapEl.style.height = heightBeforeLastItem + "px";
        } else {
          vl.itemsWrapEl.style.height = ((i * vl.params.height) / vl.params.cols) + "px";
        }
      }

      // Update list html
      if (vl.params.renderExternal) {
        if (items && items.length === 0) {
          vl.reachEnd = true;
        }
      } else {
        vl.emit('local::beforeClear vlBeforeClear', vl, vl.fragment);
        vl.itemsWrapEl.innerHTML = '';

        vl.emit('local::itemsBeforeInsert vlItemsBeforeInsert', vl, vl.fragment);

        if (items && items.length === 0) {
          vl.reachEnd = true;
          if (vl.params.emptyTemplate) { vl.itemsWrapEl.innerHTML = vl.params.emptyTemplate; }
        } else {
          vl.itemsWrapEl.appendChild(vl.fragment);
        }

        vl.emit('local::itemsAfterInsert vlItemsAfterInsert', vl, vl.fragment);
      }

      if (typeof forceScrollTop !== 'undefined' && force) {
        vl.$pageContentEl.scrollTop(forceScrollTop, 0);
      }
      if (vl.params.renderExternal) {
        vl.params.renderExternal(vl, {
          fromIndex: fromIndex,
          toIndex: toIndex,
          listHeight: vl.listHeight,
          topPosition: topPosition,
          items: renderExternalItems,
        });
      }
    };

    // Filter
    VirtualList.prototype.filterItems = function filterItems (indexes, resetScrollTop) {
      if ( resetScrollTop === void 0 ) resetScrollTop = true;

      var vl = this;
      vl.filteredItems = [];
      for (var i = 0; i < indexes.length; i += 1) {
        vl.filteredItems.push(vl.items[indexes[i]]);
      }
      if (resetScrollTop) {
        vl.$pageContentEl[0].scrollTop = 0;
      }
      vl.update();
    };

    VirtualList.prototype.resetFilter = function resetFilter () {
      var vl = this;
      if (vl.params.showFilteredItemsOnly) {
        vl.filteredItems = [];
      } else {
        vl.filteredItems = null;
        delete vl.filteredItems;
      }
      vl.update();
    };

    VirtualList.prototype.scrollToItem = function scrollToItem (index) {
      var vl = this;
      if (index > vl.items.length) { return false; }
      var itemTop = 0;
      if (vl.dynamicHeight) {
        for (var i = 0; i < index; i += 1) {
          itemTop += vl.heights[i];
        }
      } else {
        itemTop = index * vl.params.height;
      }
      var listTop = vl.$el[0].offsetTop;
      vl.render(true, (listTop + itemTop) - parseInt(vl.$pageContentEl.css('padding-top'), 10));
      return true;
    };

    VirtualList.prototype.handleScroll = function handleScroll () {
      var vl = this;
      vl.render();
    };

    // Handle resize event
    VirtualList.prototype.isVisible = function isVisible () {
      var vl = this;
      return !!(vl.el.offsetWidth || vl.el.offsetHeight || vl.el.getClientRects().length);
    };

    VirtualList.prototype.handleResize = function handleResize () {
      var vl = this;
      if (vl.isVisible()) {
        vl.setListSize();
        vl.render(true);
      }
    };

    // Append
    VirtualList.prototype.appendItems = function appendItems (items) {
      var vl = this;
      for (var i = 0; i < items.length; i += 1) {
        vl.items.push(items[i]);
      }
      vl.update();
    };

    VirtualList.prototype.appendItem = function appendItem (item) {
      var vl = this;
      vl.appendItems([item]);
    };

    // Replace
    VirtualList.prototype.replaceAllItems = function replaceAllItems (items) {
      var vl = this;
      vl.items = items;
      delete vl.filteredItems;
      vl.domCache = {};
      vl.update();
    };

    VirtualList.prototype.replaceItem = function replaceItem (index, item) {
      var vl = this;
      vl.items[index] = item;
      if (vl.params.cache) { delete vl.domCache[index]; }
      vl.update();
    };

    // Prepend
    VirtualList.prototype.prependItems = function prependItems (items) {
      var vl = this;
      for (var i = items.length - 1; i >= 0; i -= 1) {
        vl.items.unshift(items[i]);
      }
      if (vl.params.cache) {
        var newCache = {};
        Object.keys(vl.domCache).forEach(function (cached) {
          newCache[parseInt(cached, 10) + items.length] = vl.domCache[cached];
        });
        vl.domCache = newCache;
      }
      vl.update();
    };

    VirtualList.prototype.prependItem = function prependItem (item) {
      var vl = this;
      vl.prependItems([item]);
    };

    // Move
    VirtualList.prototype.moveItem = function moveItem (from, to) {
      var vl = this;
      var fromIndex = from;
      var toIndex = to;
      if (fromIndex === toIndex) { return; }
      // remove item from array
      var item = vl.items.splice(fromIndex, 1)[0];
      if (toIndex >= vl.items.length) {
        // Add item to the end
        vl.items.push(item);
        toIndex = vl.items.length - 1;
      } else {
      // Add item to new index
        vl.items.splice(toIndex, 0, item);
      }
      // Update cache
      if (vl.params.cache) {
        var newCache = {};
        Object.keys(vl.domCache).forEach(function (cached) {
          var cachedIndex = parseInt(cached, 10);
          var leftIndex = fromIndex < toIndex ? fromIndex : toIndex;
          var rightIndex = fromIndex < toIndex ? toIndex : fromIndex;
          var indexShift = fromIndex < toIndex ? -1 : 1;
          if (cachedIndex < leftIndex || cachedIndex > rightIndex) { newCache[cachedIndex] = vl.domCache[cachedIndex]; }
          if (cachedIndex === leftIndex) { newCache[rightIndex] = vl.domCache[cachedIndex]; }
          if (cachedIndex > leftIndex && cachedIndex <= rightIndex) { newCache[cachedIndex + indexShift] = vl.domCache[cachedIndex]; }
        });
        vl.domCache = newCache;
      }
      vl.update();
    };

    // Insert before
    VirtualList.prototype.insertItemBefore = function insertItemBefore (index, item) {
      var vl = this;
      if (index === 0) {
        vl.prependItem(item);
        return;
      }
      if (index >= vl.items.length) {
        vl.appendItem(item);
        return;
      }
      vl.items.splice(index, 0, item);
      // Update cache
      if (vl.params.cache) {
        var newCache = {};
        Object.keys(vl.domCache).forEach(function (cached) {
          var cachedIndex = parseInt(cached, 10);
          if (cachedIndex >= index) {
            newCache[cachedIndex + 1] = vl.domCache[cachedIndex];
          }
        });
        vl.domCache = newCache;
      }
      vl.update();
    };

    // Delete
    VirtualList.prototype.deleteItems = function deleteItems (indexes) {
      var vl = this;
      var prevIndex;
      var indexShift = 0;
      var loop = function ( i ) {
        var index = indexes[i];
        if (typeof prevIndex !== 'undefined') {
          if (index > prevIndex) {
            indexShift = -i;
          }
        }
        index += indexShift;
        prevIndex = indexes[i];
        // Delete item
        var deletedItem = vl.items.splice(index, 1)[0];

        // Delete from filtered
        if (vl.filteredItems && vl.filteredItems.indexOf(deletedItem) >= 0) {
          vl.filteredItems.splice(vl.filteredItems.indexOf(deletedItem), 1);
        }
        // Update cache
        if (vl.params.cache) {
          var newCache = {};
          Object.keys(vl.domCache).forEach(function (cached) {
            var cachedIndex = parseInt(cached, 10);
            if (cachedIndex === index) {
              delete vl.domCache[index];
            } else if (parseInt(cached, 10) > index) {
              newCache[cachedIndex - 1] = vl.domCache[cached];
            } else {
              newCache[cachedIndex] = vl.domCache[cached];
            }
          });
          vl.domCache = newCache;
        }
      };

      for (var i = 0; i < indexes.length; i += 1) loop( i );
      vl.update();
    };

    VirtualList.prototype.deleteAllItems = function deleteAllItems () {
      var vl = this;
      vl.items = [];
      delete vl.filteredItems;
      if (vl.params.cache) { vl.domCache = {}; }
      vl.update();
    };

    VirtualList.prototype.deleteItem = function deleteItem (index) {
      var vl = this;
      vl.deleteItems([index]);
    };

    // Clear cache
    VirtualList.prototype.clearCache = function clearCache () {
      var vl = this;
      vl.domCache = {};
    };

    // Update Virtual List
    VirtualList.prototype.update = function update (deleteCache) {
      var vl = this;
      if (deleteCache && vl.params.cache) {
        vl.domCache = {};
      }
      vl.setListSize();
      vl.render(true);
    };

    VirtualList.prototype.init = function init () {
      var vl = this;
      vl.attachEvents();
      vl.setListSize();
      vl.render();
    };

    VirtualList.prototype.destroy = function destroy () {
      var vl = this;
      vl.detachEvents();
      vl.$el[0].f7VirtualList = null;
      delete vl.$el[0].f7VirtualList;
      Utils.deleteProps(vl);
      vl = null;
    };

    return VirtualList;
  }(Framework7Class));

  var virtualList = {
    name: 'virtualList',
    static: {
      VirtualList: VirtualList,
    },
    create: function create() {
      var app = this;
      app.virtualList = ConstructorMethods({
        defaultSelector: '.virtual-list',
        constructor: VirtualList,
        app: app,
        domProp: 'f7VirtualList',
      });
    },
  };

  return virtualList;
}
framework7ComponentLoader.componentName = 'virtualList';

