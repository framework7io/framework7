'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _dataTableClass = require('./data-table-class');

var _dataTableClass2 = _interopRequireDefault(_dataTableClass);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'dataTable',
  static: {
    DataTable: _dataTableClass2.default
  },
  create: function create() {
    var app = this;
    app.dataTable = (0, _constructorMethods2.default)({
      defaultSelector: '.data-table',
      constructor: _dataTableClass2.default,
      app: app,
      domProp: 'f7DataTable'
    });
  },

  on: {
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.data-table-init').each(function (index, tableEl) {
        app.dataTable.destroy(tableEl);
      });
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.data-table-init').each(function (index, tableEl) {
        app.dataTable.create({ el: tableEl });
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.data-table-init').each(function (index, tableEl) {
        app.dataTable.destroy(tableEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.data-table-init').each(function (index, tableEl) {
        app.dataTable.create({ el: tableEl });
      });
    }
  },
  clicks: {}
};