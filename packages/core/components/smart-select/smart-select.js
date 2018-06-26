'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _smartSelectClass = require('./smart-select-class');

var _smartSelectClass2 = _interopRequireDefault(_smartSelectClass);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
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
      searchbarPlaceholder: 'Search',
      searchbarDisableText: 'Cancel',
      closeOnSelect: false,
      virtualList: false,
      virtualListHeight: undefined,
      formColorTheme: undefined,
      navbarColorTheme: undefined,
      routableModals: true,
      url: 'select/',
      /*
        Custom render functions
      */
      renderPage: undefined,
      renderPopup: undefined,
      renderSheet: undefined,
      renderPopover: undefined,
      renderItems: undefined,
      renderItem: undefined,
      renderSearchbar: undefined
    }
  },
  static: {
    SmartSelect: _smartSelectClass2.default
  },
  create: function create() {
    var app = this;
    app.smartSelect = _utils2.default.extend((0, _constructorMethods2.default)({
      defaultSelector: '.smart-select',
      constructor: _smartSelectClass2.default,
      app: app,
      domProp: 'f7SmartSelect'
    }), {
      open: function open(smartSelectEl) {
        var ss = app.smartSelect.get(smartSelectEl);
        if (ss && ss.open) return ss.open();
        return undefined;
      },
      close: function close(smartSelectEl) {
        var ss = app.smartSelect.get(smartSelectEl);
        if (ss && ss.close) return ss.close();
        return undefined;
      }
    });
  },

  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.smart-select-init').each(function (index, smartSelectEl) {
        app.smartSelect.create(_utils2.default.extend({ el: smartSelectEl }, (0, _dom2.default)(smartSelectEl).dataset()));
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      (0, _dom2.default)(tabEl).find('.smart-select-init').each(function (index, smartSelectEl) {
        if (smartSelectEl.f7SmartSelect && smartSelectEl.f7SmartSelect.destroy) {
          smartSelectEl.f7SmartSelect.destroy();
        }
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.smart-select-init').each(function (index, smartSelectEl) {
        app.smartSelect.create(_utils2.default.extend({ el: smartSelectEl }, (0, _dom2.default)(smartSelectEl).dataset()));
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      page.$el.find('.smart-select-init').each(function (index, smartSelectEl) {
        if (smartSelectEl.f7SmartSelect && smartSelectEl.f7SmartSelect.destroy) {
          smartSelectEl.f7SmartSelect.destroy();
        }
      });
    }
  },
  clicks: {
    '.smart-select': function open($clickedEl, data) {
      var app = this;
      if (!$clickedEl[0].f7SmartSelect) {
        var ss = app.smartSelect.create(_utils2.default.extend({ el: $clickedEl }, data));
        ss.open();
      }
    }
  }
};