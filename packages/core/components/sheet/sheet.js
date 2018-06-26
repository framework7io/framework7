'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _sheetClass = require('./sheet-class');

var _sheetClass2 = _interopRequireDefault(_sheetClass);

var _modalMethods = require('../../utils/modal-methods');

var _modalMethods2 = _interopRequireDefault(_modalMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'sheet',
  params: {
    sheet: {
      closeByBackdropClick: true,
      closeByOutsideClick: false
    }
  },
  static: {
    Sheet: _sheetClass2.default
  },
  create: function create() {
    var app = this;
    if (!app.passedParams.sheet || app.passedParams.sheet.backdrop === undefined) {
      app.params.sheet.backdrop = app.theme === 'md';
    }
    app.sheet = _utils2.default.extend({}, (0, _modalMethods2.default)({
      app: app,
      constructor: _sheetClass2.default,
      defaultSelector: '.sheet-modal.modal-in'
    }));
  },

  clicks: {
    '.sheet-open': function openSheet($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      if ((0, _dom2.default)('.sheet-modal.modal-in').length > 0 && data.sheet && (0, _dom2.default)(data.sheet)[0] !== (0, _dom2.default)('.sheet-modal.modal-in')[0]) {
        app.sheet.close('.sheet-modal.modal-in');
      }
      app.sheet.open(data.sheet, data.animate);
    },
    '.sheet-close': function closeSheet($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      app.sheet.close(data.sheet, data.animate);
    }
  }
};