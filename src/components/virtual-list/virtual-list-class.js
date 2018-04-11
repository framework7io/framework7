import { document } from 'ssr-window';
import $ from 'dom7';
import Template7 from 'template7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';
import Device from '../../utils/device';

class VirtualList extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);
    const vl = this;

    const defaults = {
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
      renderItem(item) {
        return `
          <li>
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title">${item}</div>
              </div>
            </div>
          </li>
        `.trim();
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

    if (vl.$el.length === 0) return undefined;
    vl.$el[0].f7VirtualList = vl;

    vl.items = vl.params.items;
    if (vl.params.showFilteredItemsOnly) {
      vl.filteredItems = [];
    }
    if (vl.params.itemTemplate) {
      if (typeof vl.params.itemTemplate === 'string') vl.renderItem = Template7.compile(vl.params.itemTemplate);
      else if (typeof vl.params.itemTemplate === 'function') vl.renderItem = vl.params.itemTemplate;
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
    const ul = vl.params.ul;
    vl.$ul = ul ? $(vl.params.ul) : vl.$el.children('ul');
    if (vl.$ul.length === 0 && vl.params.createUl) {
      vl.$el.append('<ul></ul>');
      vl.$ul = vl.$el.children('ul');
    }
    vl.ul = vl.$ul[0];

    let $itemsWrapEl;
    if (!vl.ul && !vl.params.createUl) $itemsWrapEl = vl.$el;
    else $itemsWrapEl = vl.$ul;

    Utils.extend(vl, {
      $itemsWrapEl,
      itemsWrapEl: $itemsWrapEl[0],
      // DOM cached items
      domCache: {},
      displayDomCache: {},
      // Temporary DOM Element
      tempDomElement: document.createElement('ul'),
      // Last repain position
      lastRepaintY: null,
      // Fragment
      fragment: document.createDocumentFragment(),
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
    const handleScrollBound = vl.handleScroll.bind(vl);
    const handleResizeBound = vl.handleResize.bind(vl);
    let $pageEl;
    let $tabEl;
    let $panelEl;
    let $popupEl;
    vl.attachEvents = function attachEvents() {
      $pageEl = vl.$el.parents('.page').eq(0);
      $tabEl = vl.$el.parents('.tab').eq(0);
      $panelEl = vl.$el.parents('.panel').eq(0);
      $popupEl = vl.$el.parents('.popup').eq(0);

      vl.$pageContentEl.on('scroll', handleScrollBound);
      if ($pageEl) $pageEl.on('page:reinit', handleResizeBound);
      if ($tabEl) $tabEl.on('tab:show', handleResizeBound);
      if ($panelEl) $panelEl.on('panel:open', handleResizeBound);
      if ($popupEl) $popupEl.on('popup:open', handleResizeBound);
      app.on('resize', handleResizeBound);
    };
    vl.detachEvents = function attachEvents() {
      vl.$pageContentEl.off('scroll', handleScrollBound);
      if ($pageEl) $pageEl.off('page:reinit', handleResizeBound);
      if ($tabEl) $tabEl.off('tab:show', handleResizeBound);
      if ($panelEl) $panelEl.off('panel:open', handleResizeBound);
      if ($popupEl) $popupEl.off('popup:open', handleResizeBound);
      app.off('resize', handleResizeBound);
    };
    // Init
    vl.init();

    return vl;
  }
  setListSize() {
    const vl = this;
    const items = vl.filteredItems || vl.items;
    vl.pageHeight = vl.$pageContentEl[0].offsetHeight;
    if (vl.dynamicHeight) {
      vl.listHeight = 0;
      vl.heights = [];
      for (let i = 0; i < items.length; i += 1) {
        const itemHeight = vl.params.height(items[i]);
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
      vl.$itemsWrapEl.css({ height: `${vl.listHeight}px` });
    }
  }
  render(force, forceScrollTop) {
    const vl = this;
    if (force) vl.lastRepaintY = null;

    let scrollTop = -(vl.$el[0].getBoundingClientRect().top - vl.$pageContentEl[0].getBoundingClientRect().top);

    if (typeof forceScrollTop !== 'undefined') scrollTop = forceScrollTop;
    if (vl.lastRepaintY === null || Math.abs(scrollTop - vl.lastRepaintY) > vl.maxBufferHeight || (!vl.updatableScroll && (vl.$pageContentEl[0].scrollTop + vl.pageHeight >= vl.$pageContentEl[0].scrollHeight))) {
      vl.lastRepaintY = scrollTop;
    } else {
      return;
    }

    const items = vl.filteredItems || vl.items;
    let fromIndex;
    let toIndex;
    let heightBeforeFirstItem = 0;
    let heightBeforeLastItem = 0;
    if (vl.dynamicHeight) {
      let itemTop = 0;
      let itemHeight;
      vl.maxBufferHeight = vl.pageHeight;

      for (let j = 0; j < vl.heights.length; j += 1) {
        itemHeight = vl.heights[j];
        if (typeof fromIndex === 'undefined') {
          if (itemTop + itemHeight >= scrollTop - (vl.pageHeight * 2 * vl.params.dynamicHeightBufferSize)) fromIndex = j;
          else heightBeforeFirstItem += itemHeight;
        }

        if (typeof toIndex === 'undefined') {
          if (itemTop + itemHeight >= scrollTop + (vl.pageHeight * 2 * vl.params.dynamicHeightBufferSize) || j === vl.heights.length - 1) toIndex = j + 1;
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

    let topPosition;
    const renderExternalItems = [];
    vl.reachEnd = false;
    let i;
    for (i = fromIndex; i < toIndex; i += 1) {
      let itemEl;
      // Define real item index
      const index = vl.items.indexOf(items[i]);

      if (i === fromIndex) vl.currentFromIndex = index;
      if (i === toIndex - 1) vl.currentToIndex = index;
      if (vl.filteredItems) {
        if (vl.items[index] === vl.filteredItems[vl.filteredItems.length - 1]) vl.reachEnd = true;
      } else if (index === vl.items.length - 1) vl.reachEnd = true;

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
        if (vl.params.cache) vl.domCache[index] = itemEl;
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
        itemEl.style.top = `${topPosition}px`;

        // Before item insert
        vl.emit('local::itemBeforeInsert vlItemBeforeInsert', vl, itemEl, items[i]);

        // Append item to fragment
        vl.fragment.appendChild(itemEl);
      }
    }

    // Update list height with not updatable scroll
    if (!vl.updatableScroll) {
      if (vl.dynamicHeight) {
        vl.itemsWrapEl.style.height = `${heightBeforeLastItem}px`;
      } else {
        vl.itemsWrapEl.style.height = `${(i * vl.params.height) / vl.params.cols}px`;
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
        if (vl.params.emptyTemplate) vl.itemsWrapEl.innerHTML = vl.params.emptyTemplate;
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
        fromIndex,
        toIndex,
        listHeight: vl.listHeight,
        topPosition,
        items: renderExternalItems,
      });
    }
  }
  // Filter
  filterItems(indexes, resetScrollTop = true) {
    const vl = this;
    vl.filteredItems = [];
    for (let i = 0; i < indexes.length; i += 1) {
      vl.filteredItems.push(vl.items[indexes[i]]);
    }
    if (resetScrollTop) {
      vl.$pageContentEl[0].scrollTop = 0;
    }
    vl.update();
  }
  resetFilter() {
    const vl = this;
    if (vl.params.showFilteredItemsOnly) {
      vl.filteredItems = [];
    } else {
      vl.filteredItems = null;
      delete vl.filteredItems;
    }
    vl.update();
  }
  scrollToItem(index) {
    const vl = this;
    if (index > vl.items.length) return false;
    let itemTop = 0;
    if (vl.dynamicHeight) {
      for (let i = 0; i < index; i += 1) {
        itemTop += vl.heights[i];
      }
    } else {
      itemTop = index * vl.params.height;
    }
    const listTop = vl.$el[0].offsetTop;
    vl.render(true, (listTop + itemTop) - parseInt(vl.$pageContentEl.css('padding-top'), 10));
    return true;
  }
  handleScroll() {
    const vl = this;
    vl.render();
  }
  // Handle resize event
  isVisible() {
    const vl = this;
    return !!(vl.el.offsetWidth || vl.el.offsetHeight || vl.el.getClientRects().length);
  }
  handleResize() {
    const vl = this;
    if (vl.isVisible()) {
      vl.setListSize();
      vl.render(true);
    }
  }
  // Append
  appendItems(items) {
    const vl = this;
    for (let i = 0; i < items.length; i += 1) {
      vl.items.push(items[i]);
    }
    vl.update();
  }
  appendItem(item) {
    const vl = this;
    vl.appendItems([item]);
  }
  // Replace
  replaceAllItems(items) {
    const vl = this;
    vl.items = items;
    delete vl.filteredItems;
    vl.domCache = {};
    vl.update();
  }
  replaceItem(index, item) {
    const vl = this;
    vl.items[index] = item;
    if (vl.params.cache) delete vl.domCache[index];
    vl.update();
  }
  // Prepend
  prependItems(items) {
    const vl = this;
    for (let i = items.length - 1; i >= 0; i -= 1) {
      vl.items.unshift(items[i]);
    }
    if (vl.params.cache) {
      const newCache = {};
      Object.keys(vl.domCache).forEach((cached) => {
        newCache[parseInt(cached, 10) + items.length] = vl.domCache[cached];
      });
      vl.domCache = newCache;
    }
    vl.update();
  }
  prependItem(item) {
    const vl = this;
    vl.prependItems([item]);
  }

  // Move
  moveItem(from, to) {
    const vl = this;
    const fromIndex = from;
    let toIndex = to;
    if (fromIndex === toIndex) return;
    // remove item from array
    const item = vl.items.splice(fromIndex, 1)[0];
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
      const newCache = {};
      Object.keys(vl.domCache).forEach((cached) => {
        const cachedIndex = parseInt(cached, 10);
        const leftIndex = fromIndex < toIndex ? fromIndex : toIndex;
        const rightIndex = fromIndex < toIndex ? toIndex : fromIndex;
        const indexShift = fromIndex < toIndex ? -1 : 1;
        if (cachedIndex < leftIndex || cachedIndex > rightIndex) newCache[cachedIndex] = vl.domCache[cachedIndex];
        if (cachedIndex === leftIndex) newCache[rightIndex] = vl.domCache[cachedIndex];
        if (cachedIndex > leftIndex && cachedIndex <= rightIndex) newCache[cachedIndex + indexShift] = vl.domCache[cachedIndex];
      });
      vl.domCache = newCache;
    }
    vl.update();
  }
  // Insert before
  insertItemBefore(index, item) {
    const vl = this;
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
      const newCache = {};
      Object.keys(vl.domCache).forEach((cached) => {
        const cachedIndex = parseInt(cached, 10);
        if (cachedIndex >= index) {
          newCache[cachedIndex + 1] = vl.domCache[cachedIndex];
        }
      });
      vl.domCache = newCache;
    }
    vl.update();
  }
  // Delete
  deleteItems(indexes) {
    const vl = this;
    let prevIndex;
    let indexShift = 0;
    for (let i = 0; i < indexes.length; i += 1) {
      let index = indexes[i];
      if (typeof prevIndex !== 'undefined') {
        if (index > prevIndex) {
          indexShift = -i;
        }
      }
      index += indexShift;
      prevIndex = indexes[i];
      // Delete item
      const deletedItem = vl.items.splice(index, 1)[0];

      // Delete from filtered
      if (vl.filteredItems && vl.filteredItems.indexOf(deletedItem) >= 0) {
        vl.filteredItems.splice(vl.filteredItems.indexOf(deletedItem), 1);
      }
      // Update cache
      if (vl.params.cache) {
        const newCache = {};
        Object.keys(vl.domCache).forEach((cached) => {
          const cachedIndex = parseInt(cached, 10);
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
    }
    vl.update();
  }
  deleteAllItems() {
    const vl = this;
    vl.items = [];
    delete vl.filteredItems;
    if (vl.params.cache) vl.domCache = {};
    vl.update();
  }
  deleteItem(index) {
    const vl = this;
    vl.deleteItems([index]);
  }
  // Clear cache
  clearCachefunction() {
    const vl = this;
    vl.domCache = {};
  }
  // Update Virtual List
  update(deleteCache) {
    const vl = this;
    if (deleteCache && vl.params.cache) {
      vl.domCache = {};
    }
    vl.setListSize();
    vl.render(true);
  }
  init() {
    const vl = this;
    vl.attachEvents();
    vl.setListSize();
    vl.render();
  }
  destroy() {
    let vl = this;
    vl.detachEvents();
    vl.$el[0].f7VirtualList = null;
    delete vl.$el[0].f7VirtualList;
    Utils.deleteProps(vl);
    vl = null;
  }
}

export default VirtualList;
