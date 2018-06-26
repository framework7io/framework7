'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _searchbarClass = require('./searchbar-class');

var _searchbarClass2 = _interopRequireDefault(_searchbarClass);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'searchbar',
  static: {
    Searchbar: _searchbarClass2.default
  },
  create: function create() {
    var app = this;
    app.searchbar = (0, _constructorMethods2.default)({
      defaultSelector: '.searchbar',
      constructor: _searchbarClass2.default,
      app: app,
      domProp: 'f7Searchbar',
      addMethods: 'clear enable disable toggle search'.split(' ')
    });
  },

  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.searchbar-init').each(function (index, searchbarEl) {
        var $searchbarEl = (0, _dom2.default)(searchbarEl);
        app.searchbar.create(_utils2.default.extend($searchbarEl.dataset(), { el: searchbarEl }));
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      (0, _dom2.default)(tabEl).find('.searchbar-init').each(function (index, searchbarEl) {
        if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
          searchbarEl.f7Searchbar.destroy();
        }
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.searchbar-init').each(function (index, searchbarEl) {
        var $searchbarEl = (0, _dom2.default)(searchbarEl);
        app.searchbar.create(_utils2.default.extend($searchbarEl.dataset(), { el: searchbarEl }));
      });
      if (app.theme === 'ios' && page.view && page.view.router.separateNavbar && page.$navbarEl && page.$navbarEl.length > 0) {
        page.$navbarEl.find('.searchbar-init').each(function (index, searchbarEl) {
          var $searchbarEl = (0, _dom2.default)(searchbarEl);
          app.searchbar.create(_utils2.default.extend($searchbarEl.dataset(), { el: searchbarEl }));
        });
      }
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.searchbar-init').each(function (index, searchbarEl) {
        if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
          searchbarEl.f7Searchbar.destroy();
        }
      });
      if (app.theme === 'ios' && page.view && page.view.router.separateNavbar && page.$navbarEl && page.$navbarEl.length > 0) {
        page.$navbarEl.find('.searchbar-init').each(function (index, searchbarEl) {
          if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
            searchbarEl.f7Searchbar.destroy();
          }
        });
      }
    }
  },
  clicks: {
    '.searchbar-clear': function clear($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      var sb = app.searchbar.get(data.searchbar);
      if (sb) sb.clear();
    },
    '.searchbar-enable': function enable($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      var sb = app.searchbar.get(data.searchbar);
      if (sb) sb.enable(true);
    },
    '.searchbar-disable': function disable($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      var sb = app.searchbar.get(data.searchbar);
      if (sb) sb.disable();
    },
    '.searchbar-toggle': function toggle($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      var sb = app.searchbar.get(data.searchbar);
      if (sb) sb.toggle();
    }
  }
};