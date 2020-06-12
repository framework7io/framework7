import $ from 'dom7';
import Utils from '../../utils/utils';
import SmartSelect from './smart-select-class';
import ConstructorMethods from '../../utils/constructor-methods';

export default {
  name: 'smartSelect',
  params: {
    smartSelect: {
      el: undefined,
      valueEl: undefined,
      setValueText: true,
      formatValueText: null,
      openIn: 'page', // or 'popup' or 'sheet' or 'popover'
      popupPush: false,
      popupSwipeToClose: undefined, // defaults to app
      sheetPush: false,
      sheetSwipeToClose: undefined, // defaults to app
      pageTitle: undefined,
      pageBackLinkText: 'Back',
      popupCloseLinkText: 'Close',
      popupTabletFullscreen: false,
      sheetCloseLinkText: 'Done',
      searchbar: false,
      searchbarPlaceholder: 'Search',
      searchbarDisableText: 'Cancel',
      searchbarDisableButton: undefined,
      closeOnSelect: false,
      virtualList: false,
      virtualListHeight: undefined,
      scrollToSelectedItem: false,
      formColorTheme: undefined,
      navbarColorTheme: undefined,
      routableModals: true,
      url: 'select/',
      cssClass: '',
      /*
        Custom render functions
      */
      renderPage: undefined,
      renderPopup: undefined,
      renderSheet: undefined,
      renderPopover: undefined,
      renderItems: undefined,
      renderItem: undefined,
      renderSearchbar: undefined,
    },
  },
  static: {
    SmartSelect,
  },
  create() {
    const app = this;
    app.smartSelect = Utils.extend(
      ConstructorMethods({
        defaultSelector: '.smart-select',
        constructor: SmartSelect,
        app,
        domProp: 'f7SmartSelect',
      }),
      {
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
      }
    );
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
        if (smartSelectEl.f7SmartSelect && smartSelectEl.f7SmartSelect.destroy) {
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
  vnode: {
    'smart-select-init': {
      insert(vnode) {
        const app = this;
        const smartSelectEl = vnode.elm;
        app.smartSelect.create(Utils.extend({ el: smartSelectEl }, $(smartSelectEl).dataset()));
      },
      destroy(vnode) {
        const smartSelectEl = vnode.elm;
        if (smartSelectEl.f7SmartSelect && smartSelectEl.f7SmartSelect.destroy) {
          smartSelectEl.f7SmartSelect.destroy();
        }
      },
    },
  },
};
