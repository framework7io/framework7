import $ from '../../shared/dom7.js';
import { extend } from '../../shared/utils.js';
import SmartSelect from './smart-select-class.js';
import ConstructorMethods from '../../shared/constructor-methods.js';

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
      sheetBackdrop: false,
      pageTitle: undefined,
      pageBackLinkText: 'Back',
      popupCloseLinkText: 'Close',
      popupTabletFullscreen: false,
      closeByBackdropClick: true,
      sheetCloseLinkText: 'Done',
      searchbar: false,
      searchbarPlaceholder: 'Search',
      searchbarDisableText: 'Cancel',
      searchbarDisableButton: true,
      searchbarSpellcheck: false,
      closeOnSelect: false,
      virtualList: false,
      virtualListHeight: undefined,
      scrollToSelectedItem: false,
      formColorTheme: undefined,
      navbarColorTheme: undefined,
      routableModals: false,
      url: 'select/',
      inputIconPosition: 'start',
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
    app.smartSelect = extend(
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
      },
    );
  },

  on: {
    tabMounted(tabEl) {
      const app = this;
      $(tabEl)
        .find('.smart-select-init')
        .each((smartSelectEl) => {
          app.smartSelect.create(extend({ el: smartSelectEl }, $(smartSelectEl).dataset()));
        });
    },
    tabBeforeRemove(tabEl) {
      $(tabEl)
        .find('.smart-select-init')
        .each((smartSelectEl) => {
          if (smartSelectEl.f7SmartSelect && smartSelectEl.f7SmartSelect.destroy) {
            smartSelectEl.f7SmartSelect.destroy();
          }
        });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.smart-select-init').each((smartSelectEl) => {
        app.smartSelect.create(extend({ el: smartSelectEl }, $(smartSelectEl).dataset()));
      });
    },
    pageBeforeRemove(page) {
      page.$el.find('.smart-select-init').each((smartSelectEl) => {
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
        const ss = app.smartSelect.create(extend({ el: $clickedEl }, data));
        ss.open();
      }
    },
  },
  vnode: {
    'smart-select-init': {
      insert(vnode) {
        const app = this;
        const smartSelectEl = vnode.elm;
        app.smartSelect.create(extend({ el: smartSelectEl }, $(smartSelectEl).dataset()));
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
