import $ from 'dom7';
import Utils from '../../utils/utils';
import SmartSelect from './smart-select-class';

export default {
  name: 'smartSelect',
  params: {
    smartSelect: {
      el: undefined,
      valueEl: undefined,
      openIn: 'page', // or 'popup' or 'sheet' or 'popover'
      pageTitle: undefined,
      pageBackLinkText: 'Back',
      popupCloseLinkText: 'Close',
      sheetCloseLinkText: 'Done',
      searchbar: false,
      searchbarPlaceholder: 'Search...',
      searchbarCancelText: 'Search...',
      closeOnSelect: false,
      virtualList: false,
      virtualListHeight: undefined,
      formColorTheme: undefined,
      navbarColorTheme: undefined,
      routableModals: true,
      /*
        Custom render functions:
        function (smartSelect, items)
        must return HTML string
      */
      renderPage: undefined,
      renderPopup: undefined,
      renderSheet: undefined,
      renderPopover: undefined,
      /*
        Custom render functions:
        function (smartSelect, items)
        must return HTML string
      */
      renderItems: undefined,
      /*
        Custom render functions:
        function (smartSelect, item)
        must return HTML string
      */
      renderItem: undefined,
    },
  },
  static: {
    SmartSelect,
  },
  create() {
    const app = this;
    Utils.extend(app, {
      smartSelect: {
        create(params) {
          return new SmartSelect(app, params);
        },
        open(smartSelectEl) {
          const ss = app.smartSelect.get(smartSelectEl);
          if (ss && ss.open) return ss.open();
          return undefined;
        },
        close(smartSelectEl) {
          const ss = app.smartSelect.get(smartSelectEl);
          if (ss && ss.close) return ss.close();
          return undefined;
        },
        get(smartSelectEl) {
          const $smartSelectEl = $(smartSelectEl);
          if (!$smartSelectEl.length) return undefined;
          return $smartSelectEl[0].f7SmartSelect;
        },
      },
    });
  },

  on: {
    tabMounted(tabEl) {
      const app = this;
      $(tabEl).find('.smart-select-init').each((index, smartSelectEl) => {
        app.smartSelect.create(Utils.extend({ el: smartSelectEl }, $(smartSelectEl).dataset()));
      });
    },
    tabBeforeRemove(tabEl) {
      $(tabEl).find('.smart-select-init').each((index, smartSelectEl) => {
        if (smartSelectEl.f7SmartSelect && smartSelectEl[0].f7SmartSelect.destroy) {
          smartSelectEl.f7SmartSelect.destroy();
        }
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.smart-select-init').each((index, smartSelectEl) => {
        app.smartSelect.create(Utils.extend({ el: smartSelectEl }, $(smartSelectEl).dataset()));
      });
    },
    pageBeforeRemove(page) {
      page.$el.find('.smart-select-init').each((index, smartSelectEl) => {
        if (smartSelectEl.f7SmartSelect && smartSelectEl.f7SmartSelect.destroy) {
          smartSelectEl.f7SmartSelect.destroy();
        }
      });
    },
  },
  clicks: {
    '.smart-select': function open($clickedEl, data) {
      const app = this;
      if (!$clickedEl[0].f7SmartSelect) {
        const ss = app.smartSelect.create(Utils.extend({ el: $clickedEl }, data));
        ss.open();
      }
    },
  },
};
