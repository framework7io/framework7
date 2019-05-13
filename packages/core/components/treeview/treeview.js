import $ from 'dom7';
import Utils from '../../utils/utils';

const Treeview = {
  open(itemEl) {
    const app = this;
    const $itemEl = $(itemEl).eq(0);
    if (!$itemEl.length) return;
    $itemEl.addClass('treeview-item-opened');
    $itemEl.trigger('treeview:open');
    app.emit('treeviewOpen', $itemEl[0]);
    function done() {
      $itemEl[0].f7TreeviewChildrenLoaded = true;
      $itemEl.find('.treeview-toggle').removeClass('treeview-toggle-hidden');
      $itemEl.find('.treeview-preloader').remove();
    }

    if ($itemEl.hasClass('treeview-load-children') && !$itemEl[0].f7TreeviewChildrenLoaded) {
      $itemEl.trigger('treeview:loadchildren', done);
      app.emit('treeviewLoadChildren', $itemEl[0], done);
      $itemEl.find('.treeview-toggle').addClass('treeview-toggle-hidden');
      $itemEl.find('.treeview-item-root').prepend(`<div class="preloader treeview-preloader">${Utils[`${app.theme}PreloaderContent`]}</div>`);
    }
  },
  close(itemEl) {
    const app = this;
    const $itemEl = $(itemEl).eq(0);
    if (!$itemEl.length) return;
    $itemEl.removeClass('treeview-item-opened');
    $itemEl.trigger('treeview:close');
    app.emit('treeviewClose', $itemEl[0]);
  },
  toggle(itemEl) {
    const app = this;
    const $itemEl = $(itemEl).eq(0);
    if (!$itemEl.length) return;
    const wasOpened = $itemEl.hasClass('treeview-item-opened');
    app.treeview[wasOpened ? 'close' : 'open']($itemEl);
  },
};

export default {
  name: 'treeview',
  create() {
    const app = this;
    Utils.extend(app, {
      treeview: {
        open: Treeview.open.bind(app),
        close: Treeview.close.bind(app),
        toggle: Treeview.toggle.bind(app),
      },
    });
  },
  clicks: {
    '.treeview-toggle': function toggle($clickedEl, clickedData, e) {
      const app = this;
      if ($clickedEl.parents('.treeview-item-toggle').length) return;
      const $treeviewItemEl = $clickedEl.parents('.treeview-item').eq(0);
      if (!$treeviewItemEl.length) return;
      e.preventF7Router = true;
      app.treeview.toggle($treeviewItemEl[0]);
    },
    '.treeview-item-toggle': function toggle($clickedEl, clickedData, e) {
      const app = this;
      const $treeviewItemEl = $clickedEl.closest('.treeview-item').eq(0);
      if (!$treeviewItemEl.length) return;
      e.preventF7Router = true;
      app.treeview.toggle($treeviewItemEl[0]);
    },
  },
};
