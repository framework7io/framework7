import $ from 'dom7';
import t7 from 'template7';
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
      template:
        '<li>' +
          '<div class="item-content">' +
            '<div class="item-inner">' +
              '<div class="item-title">{{this}}</div>' +
            '</div>' +
          '</div>' +
        '</li>',
    };

    // Extend defaults with modules params
    vl.useInstanceModulesParams(defaults);

    vl.params = Utils.extend(defaults, params);

    vl.listBlock = $(listBlock);
    vl.items = vl.params.items;
    if (vl.params.showFilteredItemsOnly) {
      vl.filteredItems = [];
    }
    if (vl.params.template && !vl.params.renderItem) {
      if (typeof vl.params.template === 'string') vl.template = t7.compile(vl.params.template);
      else if (typeof vl.params.template === 'function') vl.template = vl.params.template;
    }
    vl.pageContent = vl.listBlock.parents('.page-content');

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
    vl.ul = vl.params.ul ? $(vl.params.ul) : vl.listBlock.children('ul');
    if (vl.ul.length === 0) {
      vl.listBlock.append('<ul></ul>');
      vl.ul = vl.listBlock.children('ul');
    }

    Utils.extend(vl, {
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
    vl.useInstanceModules();

    return vl;
  }
  setListSize() {
    const vl = this;
    const items = vl.filteredItems || vl.items;
    vl.pageHeight = vl.pageContent[0].offsetHeight;
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

    if (vl.updatableScroll) {
      vl.ul.css({ height: `${vl.listHeight}px` });
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
      vl.pageContent[0].scrollTop = 0;
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
  destroy() {
    let vl = this;
    Utils.deleteProps(vl);
    vl = null;
  }
}

export default VirtualList;
